const express = require('express');
const {
    getAllUsers,
    deleteUser,
    getAllProducts,
    deleteProduct,
    getStats
} = require('../controller/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/users', isAuthenticated, isAdmin, getAllUsers);
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);

router.get('/products', isAuthenticated, isAdmin, getAllProducts);
router.delete('/products/:id', isAuthenticated, isAdmin, deleteProduct);

router.get('/stats', isAuthenticated, isAdmin, getStats);

module.exports = router;
