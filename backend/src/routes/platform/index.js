const router = require('express').Router();
const authRoutes = require('./auth');
const deploymentRoutes = require('./deployments');
const buildRoutes = require('./builds');
const uploadRoutes = require('./upload');
const paymentRoutes = require('./payment');
const authMiddleware = require('../../middleware/auth');

// Auth (public — no JWT needed)
router.use('/auth', authRoutes);

// Protected platform routes
router.use('/deployments', authMiddleware, deploymentRoutes);
router.use('/builds', authMiddleware, buildRoutes);
router.use('/upload', uploadRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;
