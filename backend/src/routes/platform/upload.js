const router = require('express').Router();
const uploadController = require('../../controllers/platform/upload');
const uploadMiddleware = require('../../middleware/upload');
const authMiddleware = require('../../middleware/auth');

// POST /api/platform/upload/image
// This allows users to upload images from their device within the builder
router.post('/image', authMiddleware, uploadMiddleware.single('file'), uploadController.uploadImage);

module.exports = router;
