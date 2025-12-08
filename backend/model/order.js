const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for guest orders
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail', required: true },
            quantity: { type: Number, required: true, min: 1 },
            seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Placed'
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

    // Payment Information
    paymentMethod: {
        type: String,
        enum: ['COD', 'Card', 'UPI', 'NetBanking', 'ONLINE'],
        default: 'COD'
    },
    paymentOrderId: { type: String }, // Razorpay order ID
    paymentAmount: { type: Number },
    paymentDetails: {
        paymentId: { type: String },
        orderId: { type: String },
        signature: { type: String },
        method: { type: String }
    },

    // Refund Information
    refundDetails: {
        refundId: { type: String },
        amount: { type: Number },
        processedAt: { type: Date },
        status: { type: String, enum: ['pending', 'processed', 'failed'], default: 'pending' }
    },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
        phone: String
    }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
