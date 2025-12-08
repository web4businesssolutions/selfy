const User = require('../model/User');
const Product = require('../model/product');
const Order = require('../model/order');

// Get all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

// Delete user
exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
};

// Get all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
};

// Delete product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};

// Get dashboard stats
exports.getStats = async (req, res) => {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
        users: usersCount,
        products: productsCount,
        orders: ordersCount,
        revenue: totalRevenue[0]?.total || 0
    });
};
