import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('token');

    // 🟡 Calculate total quantity for icon
    const cartCount = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);

    // 🟢 Load cart from localStorage or server
    useEffect(() => {
        const loadCart = async () => {
            if (token) {
                try {
                    // Try to load from server for authenticated users
                    const res = await axios.get(`${API_BASE_URL}/api/cart`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const serverItems = Array.isArray(res.data?.items)
                        ? res.data.items.filter(i => i?.quantity > 0)
                        : [];
                    setCartItems(serverItems);
                } catch (err) {
                    console.error('Error loading server cart - falling back to guest cart:', err);
                    // Fall back to guest cart if server fails, so products still show
                    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
                    setCartItems(guestCart);
                }
            } else {
                // Load from localStorage for guests
                const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
                setCartItems(guestCart);
            }
        };

        loadCart();
    }, [token]);

    // 🔄 Sync guest cart to server when user logs in
    useEffect(() => {
        const syncGuestCartOnLogin = async () => {
            const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            if (token && guestCart.length > 0) {
                try {
                    for (const item of guestCart) {
                        await axios.post(
                            `${API_BASE_URL}/api/cart/add`,
                            { productId: item.product._id, quantity: item.quantity },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    }
                    // Clear guest cart and load server cart
                    localStorage.removeItem('guestCart');
                    // Load server cart
                    const res = await axios.get(`${API_BASE_URL}/api/cart`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const validItems = Array.isArray(res.data?.items)
                        ? res.data.items.filter(i => i?.quantity > 0)
                        : [];
                    setCartItems(validItems);
                } catch (err) {
                    console.error('Error syncing guest cart:', err);
                }
            }
        };

        syncGuestCartOnLogin();
    }, [token]);

    // Helper functions for guest cart management
    const mergeCartItems = (guestCart, serverCart) => {
        const merged = [...serverCart];
        guestCart.forEach(guestItem => {
            const existingIndex = merged.findIndex(item =>
                item.product?._id === guestItem.product?._id ||
                item._id === guestItem._id
            );
            if (existingIndex === -1) {
                merged.push(guestItem);
            } else {
                // Keep the higher quantity
                merged[existingIndex].quantity = Math.max(
                    merged[existingIndex].quantity,
                    guestItem.quantity
                );
            }
        });
        return merged;
    };

    const syncGuestCartToServer = async (guestCart) => {
        if (!token || guestCart.length === 0) return;

        try {
            for (const item of guestCart) {
                await axios.post(
                    `${API_BASE_URL}/api/cart/add`,
                    { productId: item.product._id, quantity: item.quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
        } catch (err) {
            console.error('Error syncing guest cart to server:', err);
        }
    };

    const updateGuestCart = (newItems) => {
        setCartItems(newItems);
        localStorage.setItem('guestCart', JSON.stringify(newItems));
    };

    // ➕ Add to cart
    const addToCart = async (product) => {
        if (!token) {
            // Handle guest cart locally
            const currentCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const existingIndex = currentCart.findIndex(item =>
                item.product?._id === product._id
            );

            if (existingIndex > -1) {
                currentCart[existingIndex].quantity += 1;
            } else {
                currentCart.push({ product, quantity: 1 });
            }

            updateGuestCart(currentCart);
            return;
        }

        // Handle authenticated cart
        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/cart/add`,
                { productId: product._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const validItems = Array.isArray(res.data?.items)
                ? res.data.items.filter(i => i?.quantity > 0)
                : [];
            setCartItems(validItems);
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    // 🔁 Update quantity
    const updateQuantity = async (productId, quantity) => {
        if (!token) {
            // Handle guest cart locally
            const currentCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const existingIndex = currentCart.findIndex(item =>
                item.product?._id === productId
            );

            if (existingIndex > -1) {
                if (quantity > 0) {
                    currentCart[existingIndex].quantity = quantity;
                } else {
                    currentCart.splice(existingIndex, 1);
                }
            }

            updateGuestCart(currentCart);
            return;
        }

        // Handle authenticated cart
        try {
            const res = await axios.put(
                `${API_BASE_URL}/api/cart/update`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const validItems = Array.isArray(res.data?.items)
                ? res.data.items.filter(i => i?.quantity > 0)
                : [];
            setCartItems(validItems);
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    // ❌ Remove
    const removeFromCart = async (productId) => {
        if (!token) {
            // Handle guest cart locally
            const currentCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const filteredCart = currentCart.filter(item =>
                item.product?._id !== productId
            );
            updateGuestCart(filteredCart);
            return;
        }

        // Handle authenticated cart
        try {
            const res = await axios.delete(
                `${API_BASE_URL}/api/cart/remove/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const validItems = Array.isArray(res.data?.items)
                ? res.data.items.filter(i => i?.quantity > 0)
                : [];
            setCartItems(validItems);
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('guestCart');
    };

    return (
        <CartContext.Provider
            value={{ cartItems, cartCount, addToCart, updateQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
