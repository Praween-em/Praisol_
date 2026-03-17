const rateLimit = require('express-rate-limit');

/** General rate limiter for all routes */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

/** Strict limiter for OTP send routes (SMS cost protection) */
const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  keyGenerator: (req) => req.body?.phone || req.ip,
  message: { success: false, message: 'Too many OTP requests. Please wait 10 minutes.' },
});

/** Brute-force protection for admin OTP verify and password login */
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 attempts per IP per 15 min
  keyGenerator: (req) => req.body?.phone || req.ip,
  message: { success: false, message: 'Too many login attempts. Try again in 15 minutes.' },
  skipSuccessfulRequests: true, // only count failed attempts
});

/** Rate limiter for public form submissions — prevents spam bots */
const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { success: false, message: 'Too many submissions. Please wait a minute.' },
});

/** Rate limiter for public orders — prevents order flooding */
const orderLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { success: false, message: 'Too many orders placed. Please slow down.' },
});

module.exports = { rateLimiter, otpRateLimiter, authRateLimiter, formSubmissionLimiter, orderLimiter };
