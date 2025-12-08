const Order = require('../model/order');
const Cart = require('../model/cart');
const PDFDocument = require('pdfkit');
const User = require('../model/User');
// const Product = require('../model/product');

// Place an order (from cart or guest)
exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { customer, address, paymentMethod, items, subtotal: sentSubtotal } = req.body;

        let orderItems = [];
        let subtotal = 0;

        if (userId) {
            // Authenticated user - use server cart
            const cart = await Cart.findOne({ user: userId }).populate('items.product');
            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ error: 'Cart is empty' });
            }
            orderItems = cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
                seller: item.product.seller
            }));
            subtotal = cart.items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
            // Clear authenticated user's cart
            await Cart.deleteOne({ user: userId });
        } else {
            // Guest user - use sent items (only for COD)
            if (paymentMethod !== 'COD') {
                return res.status(400).json({ error: 'Guests can only place COD orders' });
            }
            if (!items || items.length === 0) {
                return res.status(400).json({ error: 'Cart is empty' });
            }
            // For Guest orders, use items as sent
            orderItems = items.map(item => ({
                product: item.product,
                quantity: item.quantity,
                seller: item.seller // Assume sent correctly
            }));
            subtotal = sentSubtotal || 0; // Use sent subtotal for guest
        }

        const gstAmount = subtotal * 0.18; // 18% GST
        const isFreeDelivery = subtotal > 500;
        const deliveryCharge = isFreeDelivery ? 0 : 49;
        const totalAmount = subtotal + gstAmount + deliveryCharge;

        const shippingAddress = {
            fullName: customer?.name || 'N/A',
            address: `${address?.street}, ${address?.city}, ${address?.state} - ${address?.pincode}`,
            city: address?.city || 'N/A',
            postalCode: address?.pincode || 'N/A',
            country: address?.country || 'India',
            phone: customer?.phone || 'N/A'
        };

        const orderData = {
            items: orderItems,
            totalAmount,
            paymentMethod: paymentMethod || 'COD',
            shippingAddress
        };

        if (userId) {
            orderData.user = userId;
        }

        const order = await Order.create(orderData);

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Customer: Get my orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Seller: Get orders containing their products
exports.getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ 'items.seller': req.user.id }).populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// exports.getSellerOrders = async (req, res) => {
//     try {
//         const sellerId = req.user.id;

//         const orders = await Order.find({ 'items.seller': sellerId })
//             .populate('user', 'name email') // optional
//             .populate('items.product', 'name price images'); // ✅ fixed fields

//         const sellerOrders = orders.map(order => {
//             const sellerItems = order.items.filter(item => item.seller.toString() === sellerId);
//             return {
//                 ...order.toObject(),
//                 items: sellerItems
//             };
//         });

//         res.json(sellerOrders);
//     } catch (error) {
//         console.error("❌ Get Seller Orders Error:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// };


// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product user');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get invoice details for frontend display
exports.getInvoiceDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('items.product', 'name price brandName')
            .populate('items.seller', 'name email');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if user owns this order
        if (order.user._id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json(order);
    } catch (error) {
        console.error('Invoice details fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch invoice details' });
    }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const validStatuses = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        const { status } = req.body;

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generate invoice PDF
exports.generateInvoice = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('items.product', 'name price brandName')
            .populate('items.seller', 'name email');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if user owns this order
        if (order.user._id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const doc = new PDFDocument({ margin: 50 });

        // Set response headers for PDF download
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', `attachment; filename=Invoice-${order._id.slice(-8)}.pdf`);

        // Pipe PDF to response
        doc.pipe(res);

        // Company Header
        doc.fontSize(20).text('BeautySnap', { align: 'center' });
        doc.fontSize(12).text('Your Beauty, Your Way', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text('INVOICE', { align: 'center', underline: true });
        doc.moveDown(2);

        // Invoice Details
        doc.fontSize(10);
        doc.text(`Invoice Number: INV-${order._id.slice(-8)}`, { align: 'right' });
        doc.text(`Order Date & Time: ${new Date(order.createdAt).toLocaleString()}`, { align: 'right' });
        doc.moveDown();

        // Customer Details
        doc.fontSize(12).text('Bill To:', { underline: true });
        doc.fontSize(10);
        doc.text(`Name: ${order.user.name}`);
        doc.text(`Email: ${order.user.email}`);
        if (order.shippingAddress) {
            doc.text(`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`);
            doc.text(`Phone: ${order.shippingAddress.phone}`);
        }
        doc.moveDown();

        // Order Details
        doc.fontSize(12).text('Order Details:', { underline: true });
        doc.fontSize(10);
        doc.text(`Order ID: ${order._id}`);
        doc.text(`Payment Method: ${order.paymentMethod}`);
        doc.text(`Status: ${order.status}`);
        doc.moveDown();

        // Items Table Header
        const tableTop = doc.y;
        doc.font('Helvetica-Bold');
        doc.fontSize(9);
        doc.text('Product & Seller', 50, tableTop);
        doc.text('Qty', 300, tableTop);
        doc.text('Price', 400, tableTop);
        doc.text('Total', 480, tableTop);
        doc.moveDown();

        // Table rows
        doc.font('Helvetica');
        let yPosition = doc.y;
        let subtotal = 0;

        order.items.forEach((item) => {
            if (item.product) {
                const itemTotal = item.product.price * item.quantity;
                subtotal += itemTotal;

                // Product name and seller
                let productText = item.product.name.slice(0, 35);
                if (item.seller) {
                    productText += `\nSeller: ${item.seller.name} (${item.seller.email})`;
                }

                doc.fontSize(8);
                doc.text(productText, 50, yPosition, { width: 240, lineGap: 2 });
                doc.fontSize(9);
                doc.text(item.quantity.toString(), 300, yPosition);
                doc.text(`₹${item.product.price}`, 400, yPosition);
                doc.text(`₹${itemTotal.toFixed(2)}`, 480, yPosition);

                // Increase row height to accommodate seller info
                yPosition += item.seller ? 35 : 20;
            }
        });

        doc.moveDown(2);

        // Totals
        const gstRate = 0.18;
        const gstAmount = subtotal * gstRate;
        const deliveryCharge = 49;
        const total = subtotal + gstAmount + deliveryCharge;

        doc.font('Helvetica-Bold');
        doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, { align: 'right' });
        doc.text(`GST (18%): ₹${gstAmount.toFixed(2)}`, { align: 'right' });
        doc.text(`Delivery Charges: ₹${deliveryCharge}`, { align: 'right' });
        doc.text(`Total Amount: ₹${total.toFixed(2)}`, { align: 'right' });

        doc.moveDown(2);
        doc.font('Helvetica');
        doc.fontSize(8);
        doc.text('Thank you for shopping with BeautySnap!', { align: 'center' });
        doc.text('For any queries, contact us at support@beautysnap.com', { align: 'center' });

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate invoice' });
    }
};
