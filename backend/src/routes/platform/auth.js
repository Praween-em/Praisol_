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
    const { phone, otp, name } = req.body;
    if (!phone || !otp) return badRequest(res, 'Phone and OTP are required');

    const valid = await verifyOTP(phone, otp);
    if (!valid) return badRequest(res, 'Invalid or expired OTP');

    // Find or create platform user
    const existing = await pool.query(
      `SELECT id, name, phone, is_verified FROM platform_users WHERE phone = $1`,
      [phone]
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
        [phone, name || null]
      );
      user = result.rows[0];
    }

    const tokens = generateTokens({ id: user.id, phone: user.phone, type: 'platform' });
    ok(res, { user, ...tokens });
  } catch (e) { next(e); }
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

module.exports = router;
