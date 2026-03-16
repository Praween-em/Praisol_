const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/payment');
const { authMiddleware } = require('../../middleware/auth');

// Optional: Apply authMiddleware if only logged-in users can initiate payments
// For testing, we might allow it without strict auth initially or use a mock user
router.post('/create-order', paymentController.createOrder);
router.post('/verify', paymentController.verifyPayment);

module.exports = router;
