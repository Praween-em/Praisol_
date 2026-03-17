const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { getTenantDB } = require('../../db/tenant');
const { generateTokens, verifyRefreshToken } = require('../../services/jwt');
const { sendOTP, verifyOTP } = require('../../services/otp');
const { ok, badRequest, unauthorized } = require('../../utils/response');
const { otpRateLimiter, authRateLimiter } = require('../../middleware/rateLimit');

// POST /api/admin/auth/send-otp — OTP login for site admin
router.post('/send-otp', otpRateLimiter, async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone || !/^\d{10}$/.test(phone))
      return badRequest(res, 'Valid 10-digit phone required');
    await sendOTP(phone);
    ok(res, { message: 'OTP sent' });
  } catch (e) { next(e); }
});

// POST /api/admin/auth/verify-otp
router.post('/verify-otp', authRateLimiter, async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return badRequest(res, 'Phone and OTP required');

    const valid = await verifyOTP(phone, otp);
    if (!valid) return badRequest(res, 'Invalid or expired OTP');

    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT id, name, phone FROM admin_users WHERE phone = $1 AND is_active = TRUE`,
      [phone]
    );
    if (!rows[0]) return unauthorized(res, 'Admin account not found for this site');

    const tokens = generateTokens({
      id: rows[0].id,
      phone: rows[0].phone,
      type: 'admin',
      schemaName: req.schemaName,
      tenantId: req.tenant.id,
    });
    ok(res, { user: rows[0], ...tokens });
  } catch (e) { next(e); }
});

// POST /api/admin/auth/login — password-based login
router.post('/login', authRateLimiter, async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) return badRequest(res, 'Phone and password required');

    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT id, name, phone, password_hash FROM admin_users WHERE phone = $1 AND is_active = TRUE`,
      [phone]
    );
    if (!rows[0]) return unauthorized(res, 'Invalid credentials');

    const valid = await bcrypt.compare(password, rows[0].password_hash);
    if (!valid) return unauthorized(res, 'Invalid credentials');

    const tokens = generateTokens({
      id: rows[0].id,
      phone: rows[0].phone,
      type: 'admin',
      schemaName: req.schemaName,
      tenantId: req.tenant.id,
    });
    ok(res, { user: { id: rows[0].id, name: rows[0].name, phone: rows[0].phone }, ...tokens });
  } catch (e) { next(e); }
});

// POST /api/admin/auth/refresh
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return badRequest(res, 'Refresh token required');
    let payload;
    try { payload = verifyRefreshToken(refreshToken); }
    catch { return unauthorized(res, 'Invalid or expired refresh token'); }
    const tokens = generateTokens({ ...payload });
    ok(res, tokens);
  } catch (e) { next(e); }
});

module.exports = router;
