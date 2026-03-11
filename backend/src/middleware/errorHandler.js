/**
 * Global error handler middleware.
 * Catches all errors passed via next(err) in controllers.
 */
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  // Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: err.details?.[0]?.message || 'Validation error',
    });
  }

  // PostgreSQL errors
  if (err.code) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, message: 'Duplicate entry — this record already exists.' });
    }
    if (err.code === '23503') {
      return res.status(400).json({ success: false, message: 'Referenced record not found.' });
    }
  }

  // Default
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
  });
}

module.exports = { errorHandler };
