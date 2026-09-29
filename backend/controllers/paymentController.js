// @desc    Create Checkout Session (Stripe/Razorpay integration placeholder)
// @route   POST /api/payment/create-checkout-session
// @access  Private
const createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!['PREMIUM', 'PRO'].includes(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    // Check if Stripe / payment provider credentials exist
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      // Payment provider not configured yet. Return clear architecture payload.
      return res.status(501).json({
        success: false,
        code: 'PAYMENT_GATEWAY_NOT_CONFIGURED',
        message: 'Payment gateway integration pending configuration. In development mode, set STRIPE_SECRET_KEY in backend .env to enable active checkout sessions.',
        supportedPlans: {
          PREMIUM: { priceId: 'price_premium_monthly', amount: 14.99, currency: 'USD' },
          PRO: { priceId: 'price_pro_monthly', amount: 29.99, currency: 'USD' }
        }
      });
    }

    // Real Stripe initialization when configured
    const stripe = require('stripe')(stripeKey);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `HireReady AI ${plan} Plan`,
              description: plan === 'PREMIUM' ? 'Unlimited resume analyses, cover letters & PDF exports' : 'Pro tier with Job Application Tracker & custom versions'
            },
            unit_amount: plan === 'PREMIUM' ? 1499 : 2999,
            recurring: { interval: 'month' }
          },
          quantity: 1
        }
      ],
      client_reference_id: String(req.user._id || req.user.id),
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/pricing?payment=cancelled`
    });

    return res.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url
    });
  } catch (error) {
    console.error('[Payment Checkout Error]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Payment Webhook Receiver
// @route   POST /api/payment/webhook
// @access  Public (Signature Verified)
const handleWebhook = async (req, res) => {
  // Webhook listener placeholder for Stripe events
  return res.json({ received: true });
};

module.exports = {
  createCheckoutSession,
  handleWebhook
};
