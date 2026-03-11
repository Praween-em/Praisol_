const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || '15m';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || '30d';

/**
 * Generate access + refresh token pair.
 * @param {object} payload - e.g. { id, phone, type: 'platform'|'admin', schemaName }
 */
function generateTokens(payload) {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
  return { accessToken, refreshToken };
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };
