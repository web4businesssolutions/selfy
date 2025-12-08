const Product = require('../model/product');
const Category = require('../model/Category');

// ✅ Create Product (Protected)
exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            images,
            category,
            brand
        } = req.body;

        const sellerId = req.user._id; // <-- Ensure you have middleware to set `req.user`

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            images,
            category,
            brand,
            seller: sellerId
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: "Failed to create product" });
    }
};

// ✅ Get All Products (Public)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name')
            .populate('seller', 'name email');
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get products' });
    }
};

// ✅ Get Product by ID (Public)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('seller', 'name email');
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// ✅ Get Seller's Products (Protected)
exports.getSellerProducts = async (req, res) => {
    try {
        console.log("✅ Entered getSellerProducts");
        console.log("➡️ req.user:", req.user);

        if (!req.user || !req.user._id || req.user.role !== 'seller') {
            console.warn("⚠️ Unauthorized access: req.user is missing or not a seller");
            return res.status(403).json({ error: "Access denied: Seller only" });
        }

        const sellerId = req.user._id;

        const products = await Product.find({ seller: sellerId }).populate({
            path: 'category',
            select: 'name',
            strictPopulate: false,
        });

        console.log(`✅ Found ${products.length} products for seller ID: ${sellerId}`);
        return res.status(200).json({ success: true, products });

    } catch (err) {
        console.error("❌ Error in getSellerProducts:", err);
        return res.status(500).json({ error: "Server error", details: err.message });
    }
};


// ✅ Update Product (Protected)
exports.updateProduct = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.images = [req.file.filename];
        }

        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, seller: req.user._id },
            updateData,
            { new: true }
        );

        if (!product) return res.status(404).json({ error: 'Product not found or unauthorized' });

        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// ✅ Delete Product (Protected)
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findOneAndDelete({ _id: req.params.id, seller: req.user._id });
        if (!deleted) return res.status(404).json({ error: 'Product not found or unauthorized' });
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// ✅ Get Products by Category Slug (Public)
exports.getProductsByCategorySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const category = await Category.findOne({ slug });
        if (!category) return res.status(404).json({ error: 'Category not found' });

        const products = await Product.find({ category: category._id })
            .populate('category', 'name')
            .populate('seller', 'name');

        res.status(200).json({ success: true, products });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};
