const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createProduct,
    getAllProducts,
    getProductById,
    getSellerProducts,
    updateProduct,
    deleteProduct,
    getProductsByCategorySlug
} = require('../controller/productController');

const { isAuthenticated, isSeller } = require('../middleware/auth');

// Public
router.get('/all-products', getAllProducts);
// router.get('/:id', getProductById);
router.get('/category/:slug', getProductsByCategorySlug);

// Protected
router.get('/my-products', isAuthenticated, isSeller, getSellerProducts);
router.get('/:id', getProductById);
router.post('/create', isAuthenticated, isSeller, upload.single('image'), createProduct);
router.put('/update/:id', isAuthenticated, isSeller, upload.single('image'), updateProduct);
router.delete('/delete/:id', isAuthenticated, isSeller, deleteProduct);

module.exports = router;
