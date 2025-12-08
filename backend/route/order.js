const express = require('express');
const {
    placeOrder,
    getMyOrders,
    getSellerOrders,
    getAllOrders,
    updateOrderStatus,
    generateInvoice,
    getInvoiceDetails
} = require('../controller/orderController');
const {
    createPaymentOrder,
    verifyPayment,
    getPaymentStatus,
    refundPayment
} = require('../controller/paymentController');
const { isAuthenticated, isSeller, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Order routes
router.get('/seller', isAuthenticated, isSeller, getSellerOrders);
router.post('/place', placeOrder); // Allow guest orders
router.get('/my', isAuthenticated, getMyOrders);
router.get('/invoice/:id', isAuthenticated, generateInvoice);
router.get('/invoice-details/:id', isAuthenticated, getInvoiceDetails);

// Payment routes
router.post('/create-payment', isAuthenticated, createPaymentOrder);
router.post('/verify-payment', isAuthenticated, verifyPayment);
router.get('/payment-status/:orderId', isAuthenticated, getPaymentStatus);
router.post('/refund', isAuthenticated, isSeller, refundPayment); // Sellers can process refunds for their items

router.get('/admin', isAuthenticated, isAdmin, getAllOrders);
router.put('/admin/update/:id', isAuthenticated, isSeller, updateOrderStatus);

module.exports = router;
