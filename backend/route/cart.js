const express = require('express');
const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} = require('../controller/cartController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/add', isAuthenticated,   addToCart);
router.get('/', isAuthenticated, getCart);
router.put('/update', isAuthenticated, updateCart);
router.delete('/remove/:productId', isAuthenticated, removeFromCart);

module.exports = router;
