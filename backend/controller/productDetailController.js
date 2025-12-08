const ProductDetail = require('../model/productDtails');

// Create Product with seller reference
exports.createProductDetail = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const body = req.body;

    const image = req.files.find(f => f.fieldname === 'image')?.path;
    const images = req.files.filter(f => f.fieldname === 'images').map(f => f.path);

    const product = new ProductDetail({
      ...body,
      seller: sellerId,
      image: image || '',
      images: images,
      bulletPoints: body.bulletPoints?.split(',') || [],
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all products for users
exports.getAllProductUser = async (req, res) => {
  try {
    const products = await ProductDetail.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all products for a specific seller
exports.getAllProductDetails = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await ProductDetail.find({ seller: sellerId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single product
exports.getSingleProductDetail = async (req, res) => {
  try {
    const product = await ProductDetail.findById(req.params.id).populate('seller', 'name email');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete product
exports.deleteProductDetail = async (req, res) => {
  try {
    await ProductDetail.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
exports.updateProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await ProductDetail.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const image = req.files.find(f => f.fieldname === 'image')?.path;
    const images = req.files.filter(f => f.fieldname === 'images').map(f => f.path);

    const updatedFields = {
      ...body,
      image: image || product.image,
      images: images.length > 0 ? images : product.images,
      bulletPoints: body.bulletPoints ? body.bulletPoints.split(',') : product.bulletPoints,
    };

    const updatedProduct = await ProductDetail.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
