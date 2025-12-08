// const Cart = require('../model/cart');

// // Add item to cart
// exports.addToCart = async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user.id;

//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//         cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
//     } else {
//         const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);
//         if (itemIndex > -1) {
//             cart.items[itemIndex].quantity += quantity;
//         } else {
//             cart.items.push({ product: productId, quantity });
//         }
//     }

//     await cart.save();
//     res.status(200).json(cart);
// };

// // Get cart
// exports.getCart = async (req, res) => {
//     const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
//     res.status(200).json(cart || { items: [] });
// };

// // Update quantity
// exports.updateCart = async (req, res) => {
//     const { productId, quantity } = req.body;
//     const cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);
//     if (itemIndex > -1) {
//         cart.items[itemIndex].quantity = quantity;
//         await cart.save();
//         res.json(cart);
//     } else {
//         res.status(404).json({ error: "Product not in cart" });
//     }
// };

// // Remove from cart
// exports.removeFromCart = async (req, res) => {
//     const { productId } = req.params;
//     const cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     cart.items = cart.items.filter(p => p.product.toString() !== productId);
//     await cart.save();
//     res.json(cart);
// };






// const Cart = require('../model/cart');

// // Add item to cart
// exports.addToCart = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         const userId = req.user.id;

//         if (!productId || !quantity) {
//             return res.status(400).json({ error: 'Product ID and quantity are required' });
//         }

//         let cart = await Cart.findOne({ user: userId });

//         if (!cart) {
//             cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
//         } else {
//             const itemIndex = cart.items.findIndex(p => p.product?.toString() === productId);
//             if (itemIndex > -1) {
//                 cart.items[itemIndex].quantity += quantity;
//             } else {
//                 cart.items.push({ product: productId, quantity });
//             }
//         }

//         await cart.save();
//         const populatedCart = await Cart.findById(cart._id).populate('items.product');
//         res.status(200).json(populatedCart);
//     } catch (err) {
//         console.error('Add to cart error:', err);
//         res.status(500).json({ error: 'Server error while adding to cart' });
//     }
// };

// // Get cart
// exports.getCart = async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
//         res.status(200).json(cart || { items: [] });
//     } catch (err) {
//         console.error('Get cart error:', err);
//         res.status(500).json({ error: 'Server error while fetching cart' });
//     }
// };

// // Update quantity
// exports.updateCart = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         const cart = await Cart.findOne({ user: req.user.id });

//         if (!cart) return res.status(404).json({ error: 'Cart not found' });

//         const itemIndex = cart.items.findIndex(p => p.product?.toString() === productId);
//         if (itemIndex > -1) {
//             cart.items[itemIndex].quantity = quantity;
//             await cart.save();
//             const populatedCart = await Cart.findById(cart._id).populate('items.product');
//             res.json(populatedCart);
//         } else {
//             res.status(404).json({ error: 'Product not in cart' });
//         }
//     } catch (err) {
//         console.error('Update cart error:', err);
//         res.status(500).json({ error: 'Server error while updating cart' });
//     }
// };

// // Remove from cart
// exports.removeFromCart = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const cart = await Cart.findOne({ user: req.user.id });

//         if (!cart) return res.status(404).json({ error: 'Cart not found' });

//         cart.items = cart.items.filter(p => p.product?.toString() !== productId);
//         await cart.save();


//         const populatedCart = await Cart.findById(cart._id).populate('items.product');
//         res.json(populatedCart);
//     } catch (err) {
//         console.error('Remove from cart error:', err);
//         res.status(500).json({ error: 'Server error while removing from cart' });
//     }
// };





























const Cart = require('../model/cart');

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        if (!productId || !quantity) {
            return res.status(400).json({ error: 'Product ID and quantity are required' });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(p => p.product?.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate('items.product');
        res.status(200).json(populatedCart);
    } catch (err) {
        console.error('Add to cart error:', err);
        res.status(500).json({ error: 'Server error while adding to cart' });
    }
};

// Get cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error('Get cart error:', err);
        res.status(500).json({ error: 'Server error while fetching cart' });
    }
};

// Update quantity
exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        const itemIndex = cart.items.findIndex(p => p.product?.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            const populatedCart = await Cart.findById(cart._id).populate('items.product');
            res.json(populatedCart || { items: [] });
        } else {
            res.status(404).json({ error: 'Product not in cart' });
        }
    } catch (err) {
        console.error('Update cart error:', err);
        res.status(500).json({ error: 'Server error while updating cart' });
    }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.items = cart.items.filter(p => p.product?.toString() !== productId);
        await cart.save();

        const populatedCart = await Cart.findById(cart._id).populate('items.product');
        res.json(populatedCart || { items: [] });
    } catch (err) {
        console.error('Remove from cart error:', err);
        res.status(500).json({ error: 'Server error while removing from cart' });
    }
};
