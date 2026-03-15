const router = require('express').Router();
const { otpRateLimiter } = require('../../middleware/rateLimit');
const { sendOTP, verifyOTP } = require('../../services/otp');
const { generateTokens, verifyRefreshToken } = require('../../services/jwt');
const { pool } = require('../../db');
const { ok, badRequest, unauthorized } = require('../../utils/response');

// POST /api/platform/auth/send-otp
router.post('/send-otp', otpRateLimiter, async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone || !/^\d{10}$/.test(phone))
      return badRequest(res, 'Valid 10-digit phone number required');

    await sendOTP(phone);
    ok(res, { message: 'OTP sent successfully' });
  } catch (e) { next(e); }
});

// POST /api/platform/auth/verify-otp
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { phone: reqPhone, otp, token, name } = req.body;
    let verifiedIdentifier;

    if (token) {
      // Logged in via MSG91 Hello Widget
      const tokenString = typeof token === 'object' ? token.message : token;
      
      try {
        const verificationData = await require('../../services/otp').verifyWidgetToken(tokenString);
        const mobile = verificationData.mobile;
        // MSG91 mobile comes with country code, e.g. "919876543210"
        verifiedIdentifier = mobile.startsWith('91') ? mobile.slice(2) : mobile;
      } catch (err) {
        console.error('MSG91 Verification Failed:', err.message);
        return res.status(401).json({ success: false, message: err.message });
      }
    } else if (reqPhone && otp) {
      // Legacy / Fallback OTP verification
      const valid = await verifyOTP(reqPhone, otp);
      if (!valid) return badRequest(res, 'Invalid or expired OTP');
      verifiedIdentifier = reqPhone;
    } else {
      return badRequest(res, 'Verification token or Phone/OTP required');
    }

    // Find or create platform user
    const existing = await pool.query(
      `SELECT id, name, phone, is_verified FROM platform_users WHERE phone = $1`,
      [verifiedIdentifier]
    );

    let user;
    if (existing.rows.length > 0) {
      user = existing.rows[0];
      await pool.query(
        `UPDATE platform_users SET is_verified = TRUE, updated_at = NOW() WHERE id = $1`,
        [user.id]
      );
    } else {
      const result = await pool.query(
        `INSERT INTO platform_users (phone, name, is_verified) VALUES ($1, $2, TRUE) RETURNING id, name, phone`,
        [verifiedIdentifier, name || null]
      );
      user = result.rows[0];
    }

    const tokens = generateTokens({ id: user.id, phone: user.phone, type: 'platform' });
    ok(res, { user, ...tokens });
  } catch (e) { 
    console.error('Verify Token Error:', e.message);
    next(e); 
  }
});

// POST /api/platform/auth/refresh
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return badRequest(res, 'Refresh token required');

    let payload;
    try { payload = verifyRefreshToken(refreshToken); }
    catch { return unauthorized(res, 'Invalid or expired refresh token'); }

    const tokens = generateTokens({ id: payload.id, phone: payload.phone, type: payload.type });
    ok(res, tokens);
  } catch (e) { next(e); }
});

// GET /api/platform/auth/me
router.get('/me', require('../../middleware/auth'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, phone, email, avatar_url, created_at FROM platform_users WHERE id = $1`,
      [req.user.id]
    );
    if (!rows[0]) return require('../../utils/response').notFound(res, 'User not found');
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// PUT /api/platform/auth/me — update profile (name, email)
router.put('/me', require('../../middleware/auth'), async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name?.trim()) return badRequest(res, 'Name is required');

    const { rows } = await pool.query(
      `UPDATE platform_users
       SET name = $1, email = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING id, name, phone, email, avatar_url, created_at`,
      [name.trim(), email?.trim() || null, req.user.id]
    );
    if (!rows[0]) return require('../../utils/response').notFound(res, 'User not found');
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

module.exports = router;
