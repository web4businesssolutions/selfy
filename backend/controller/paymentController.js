const Razorpay = require('razorpay');
const Order = require('../model/order');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ 1. Create Payment Order
exports.createPaymentOrder = async (req, res) => {
    try {
        const { amount, orderId } = req.body;

        // Validate order belongs to user
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Amount in paise (multiply by 100)
            currency: 'INR',
            receipt: `order_${orderId}`,
            payment_capture: 1, // Auto capture
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Save payment details to order if needed
        await Order.findByIdAndUpdate(orderId, {
            'paymentOrderId': razorpayOrder.id,
            'paymentAmount': amount
        });

        res.json({
            success: true,
            order: razorpayOrder,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error('Payment order creation error:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
};

// ✅ 2. Verify Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        // Create signature for verification
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        // Verify signature
        if (razorpay_signature === expectedSign) {
            // Update order status to paid
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
                paidAt: new Date(),
                status: 'Processing', // Move from Placed to Processing
                'paymentDetails': {
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    signature: razorpay_signature,
                    method: 'Razorpay'
                }
            });

            res.json({
                success: true,
                message: 'Payment verified successfully',
                paymentId: razorpay_payment_id
            });
        } else {
            // Payment verification failed
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ error: 'Payment verification failed' });
    }
};

// ✅ 3. Get Payment Status
exports.getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).select('isPaid paidAt paymentDetails status');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if user owns this order
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json({
            success: true,
            isPaid: order.isPaid,
            paidAt: order.paidAt,
            paymentDetails: order.paymentDetails,
            orderStatus: order.status
        });

    } catch (error) {
        console.error('Get payment status error:', error);
        res.status(500).json({ error: 'Failed to get payment status' });
    }
};

// ✅ 4. Refund Payment (Admin/Seller only)
exports.refundPayment = async (req, res) => {
    try {
        const { orderId, refundAmount } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if payment exists and is paid
        if (!order.isPaid) {
            return res.status(400).json({ error: 'Order is not paid' });
        }

        // Find the sale (this order's items for this seller)
        const sellerRefundItems = order.items.filter(item =>
            item.seller.toString() === req.user.id
        );

        if (sellerRefundItems.length === 0) {
            return res.status(403).json({ error: 'No items found for this seller' });
        }

        // Create refund via Razorpay
        const refundOptions = {
            payment_id: order.paymentDetails.paymentId,
            amount: refundAmount * 100, // Amount in paise
        };

        const refund = await razorpay.payments.refund(refundOptions.payment_id, refundOptions);

        // Update order with refund details
        await Order.findByIdAndUpdate(orderId, {
            'refundDetails': {
                refundId: refund.id,
                amount: refundAmount,
                processedAt: new Date(),
                status: 'processed'
            }
        });

        res.json({
            success: true,
            refund: refund,
            message: 'Refund processed successfully'
        });

    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({ error: 'Refund processing failed' });
    }
};
