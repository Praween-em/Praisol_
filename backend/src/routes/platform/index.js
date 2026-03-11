const router = require('express').Router();
const authRoutes = require('./auth');
const deploymentRoutes = require('./deployments');
const buildRoutes = require('./builds');
const authMiddleware = require('../../middleware/auth');

// Auth (public — no JWT needed)
router.use('/auth', authRoutes);

// Protected platform routes
router.use('/deployments', authMiddleware, deploymentRoutes);
router.use('/builds', authMiddleware, buildRoutes);

module.exports = router;
