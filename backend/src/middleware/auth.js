const { verifyAccessToken } = require('../services/jwt');
const { unauthorized } = require('../utils/response');

/**
 * Verifies Bearer JWT token on every protected route.
 * Attaches decoded payload to req.user.
 */
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return unauthorized(res);

  try {
    const token = header.split(' ')[1];
    req.user = verifyAccessToken(token);
    next();
  } catch {
    unauthorized(res, 'Token expired or invalid');
  }
}

module.exports = authMiddleware;
