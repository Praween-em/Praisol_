const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Should be in .env
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

/**
 * Create a new Razorpay order
 * POST /api/platform/payment/create-order
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount, planId } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt: `receipt_plan_${planId || 'test'}_${Date.now()}`,
      notes: {
        userId: req.user?.id || 'guest',
        planId: planId || 'test'
      }
    };

    const order = await razorpay.orders.create(options);
    
    console.log(`[Payment] Order created: ${order.id} for amount ${amount}`);
    
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      }
    });
  } catch (error) {
    console.error('[Payment] Create Order Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Verify Razorpay payment signature
 * POST /api/platform/payment/verify
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // payment is successful
      console.log(`[Payment] Signature verified for order: ${razorpay_order_id}`);
      
      // TODO: Update user subscription in database here
      
      res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      console.warn(`[Payment] Signature mismatch for order: ${razorpay_order_id}`);
      res.status(400).json({ success: false, message: 'Signature verification failed' });
    }
  } catch (error) {
    console.error('[Payment] Verify Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
