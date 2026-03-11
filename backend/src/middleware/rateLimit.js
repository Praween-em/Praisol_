const rateLimit = require('express-rate-limit');

/** General rate limiter for all routes */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

/** Strict limiter for OTP / auth routes */
const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  keyGenerator: (req) => req.body?.phone || req.ip,
  message: { success: false, message: 'Too many OTP requests. Please wait 10 minutes.' },
});

module.exports = { rateLimiter, otpRateLimiter };
