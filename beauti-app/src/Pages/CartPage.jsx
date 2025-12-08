import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
    FiShoppingCart,
    FiBox,
    FiTag,
    FiTrash2,
    FiHash,
    FiCreditCard,
    FiTruck,
    FiCheckCircle
} from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../constants';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const GST_RATE = 0.18;

    const subtotal = cartItems.reduce((acc, item) => {
        if (!item.product) return acc;
        return acc + item.product.price * item.quantity;
    }, 0);

    const gstAmount = subtotal * GST_RATE;
    const isFreeDelivery = subtotal > 500;
    const DELIVERY_CHARGE = isFreeDelivery ? 0 : 49;
    const total = subtotal + gstAmount + DELIVERY_CHARGE;

    if (!cartItems.length) {
        return (
            <div className="text-center mt-20 text-lg text-gray-600">
                <FiShoppingCart className="mx-auto text-5xl mb-2" />
                <p>Your cart is empty 😢</p>
                <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
                    Go Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <FiShoppingCart /> Shopping Cart
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="md:col-span-2 space-y-4">
                    {cartItems.map(({ product, quantity }) => (
                        product && (
                            <div key={product._id} className="flex gap-4 border rounded-lg p-3 shadow-sm bg-white">
                                <img
                                    src={`${API_BASE_URL}${product.images[0]}`}
                                    alt={product.name}
                                    className="w-20 h-20 object-contain border rounded"
                                    onError={(e) => {
                                        e.target.src = '/images/product-1.png';
                                    }}
                                />
                                <div className="flex-1">
                                    <h2 className="text-base font-semibold text-gray-800 flex items-center gap-1">
                                        <FiBox /> {product.category}
                                    </h2>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <FiTag /> Brand: {product.brandName}
                                    </p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <FiCreditCard /> ₹{product.price} x {quantity}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="number"
                                            min={1}
                                            value={quantity}
                                            onChange={(e) => {
                                                const newQty = parseInt(e.target.value);
                                                if (newQty > 0) {
                                                    updateQuantity(product._id, newQty);
                                                } else {
                                                    toast.error('Quantity must be at least 1');
                                                }
                                            }}
                                            className="w-16 text-sm px-2 py-1 border rounded"
                                        />
                                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                            <FiHash /> ₹{product.price * quantity}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        removeFromCart(product._id);
                                        toast.error(`${product.name} removed from cart`);
                                    }}
                                    className="text-red-500 hover:text-red-600"
                                    title="Remove"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        )
                    ))}
                </div>

                {/* Order Summary */}
                <div className="border rounded-lg shadow-md bg-white p-5 h-fit sticky top-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <FiCheckCircle /> Order Summary
                    </h3>
                    <div className="flex justify-between text-sm mb-2 text-gray-600">
                        <span className="flex items-center gap-1"><FiCreditCard /> Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2 text-gray-600">
                        <span>Tax (GST 18%)</span>
                        <span>₹{gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2 text-gray-600">
                        <span className="flex items-center gap-1"><FiTruck /> Delivery</span>
                        <span>₹{DELIVERY_CHARGE}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t pt-3 mt-3 text-gray-800">
                        <span className="flex items-center gap-1"><FiCheckCircle /> Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <Link
                        to="/order"
                        className="w-full mt-4 bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition-all text-center flex items-center justify-center gap-2"
                    >
                        <FiCheckCircle /> Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
