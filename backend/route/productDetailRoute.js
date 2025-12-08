const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createProductDetail, getAllProductDetails, deleteProductDetail, updateProductDetail, getSingleProductDetail, getAllProductUser } = require('../controller/productDetailController');
const { isAuthenticated } = require('../middleware/auth');


router.post('/createdetail', isAuthenticated, upload.any(), createProductDetail);
router.get('/alldetails', getAllProductUser); 
router.get('/myproducts', isAuthenticated, getAllProductDetails);
router.get('/singledetail/:id', getSingleProductDetail);
router.delete('/delete/:id', deleteProductDetail);
router.put('/update/:id', upload.any(), updateProductDetail);

module.exports = router;
