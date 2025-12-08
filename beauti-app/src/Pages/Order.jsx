import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import PaymentComponent from '../Component/PaymentComponent';
import { API_BASE_URL } from '../constants';
import {    FiShoppingCart,
    FiBox,
    FiTag,
    FiHash,
    FiCreditCard,
    FiTruck,
    FiCheckCircle,
    FiLock,
    FiX,
    FiMinus,
    FiUser,
    FiMapPin,
    FiPhone,
    FiMail,
    FiCreditCard as CreditCardIcon
} from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
    const { cartItems, clearCart, removeFromCart, updateQuantity } = useCart();
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const GST_RATE = 0.18; // 18% GST

    // Form states
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
    });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    // Allow guest checkout - authentication checked at payment time
    // useEffect(() => {
    //     if (cartItems.length > 0 && !token) {
    //         toast.warn('Please login to proceed with checkout');
    //         navigate('/login');
    //     }
    // }, [cartItems, token, navigate]);

    const subtotal = cartItems.reduce((acc, item) => {
        if (!item.product) return acc;
        return acc + item.product.price * item.quantity;
    }, 0);
    const gstAmount = subtotal * GST_RATE;
    const isFreeDelivery = subtotal > 500;
    const DELIVERY_CHARGE = isFreeDelivery ? 0 : 49;
    const total = subtotal + gstAmount + DELIVERY_CHARGE;

    // Input change handlers
    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!customer.name || !customer.email || !customer.phone) {
            toast.error('Please fill in all customer details');
            return false;
        }
        if (!address.street || !address.city || !address.state || !address.pincode) {
            toast.error('Please fill in complete delivery address');
            return false;
        }
        if (!agreeToTerms) {
            toast.error('Please agree to terms and conditions');
            return false;
        }
        return true;
    };

    const fetchOrders = async () => {
        if (!token || token === 'null' || token === 'undefined') return; // No orders for unauthenticated or invalid users

        try {
            const res = await axios.get(`${API_BASE_URL}/api/orders/my`, {
                headers: { Authorization: `Bearer ${token}` },
                validateStatus: (status) => status < 500, // Don't throw for any 4xx or 5xx errors
            });
            if (res.status === 200) {
                setOrders(res.data);
            } else {
                setOrders([]); // For any non-200 status, treat as empty orders
            }
        } catch (err) {
            setOrders([]); // Set to empty if network error
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePlaceOrder = async () => {
        try {
            const payload = {
                customer,
                address,
                paymentMethod
            };

            // For guest COD, include cart items and subtotal in payload
            if (!token && paymentMethod === 'COD') {
                payload.items = cartItems.map(({ product, quantity }) => ({
                    product: product._id,
                    quantity,
                    seller: product.seller // Assume seller is in product
                }));
                payload.subtotal = subtotal;
            }

            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await axios.post(
                `${API_BASE_URL}/api/orders/place`,
                payload,
                { headers }
            );
            toast.success('Order placed successfully!');
            clearCart();
            // For guests, no order history, so don't fetch
            if (token) {
                await fetchOrders();
            }
        } catch (error) {
            const message = error?.response?.data?.error || 'Failed to place order';
            toast.error(message);
            console.error('Order error:', message);
        }
    };

    // If no cart items but has orders, show order history directly
    if (!cartItems.length && orders.length > 0) {
        return (
            <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Your Orders
                    </h1>
                    <p className="text-gray-600">View your order history and download invoices</p>
                </div>

                {/* Orders History */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FiBox /> Your Recent Orders
                    </h2>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</h3>
                                        <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/invoice/${order._id}`)}
                                            className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                                            title="View Invoice"
                                        >
                                            👁️ View
                                        </button>
                                        
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {order.items.map((item) => (
                                        <div key={item._id} className="flex gap-3 border rounded-lg p-3 bg-gray-50">
                                            <img
                                                src={`${API_BASE_URL}${item.product?.images?.[0]}`}
                                                alt={item.product?.name}
                                                className="w-16 h-16 object-contain border rounded"
                                                onError={(e) => {
                                                    e.target.src = '/images/product-1.png';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 text-sm">{item.product?.name}</h4>
                                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                <p className="text-xs font-medium text-gray-700">₹{item.product?.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // If no cart items and no orders, show empty state
    if (!cartItems.length) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="text-center mt-20 text-lg text-gray-600">
                    <FiShoppingCart className="mx-auto text-5xl mb-2" />
                    <p>Your cart is empty. Add some products first!</p>
                    <Link to="/product" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Checkout ({cartItems.length} items)
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="text-green-600 font-medium">📍 {isFreeDelivery ? 'Free delivery' : 'Delivery charges ₹49'}</span>
                    <span>•</span>
                    <span>Earn ₹{Math.floor(total * 0.01)} reward points</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side - Forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Details */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FiUser className="text-blue-600" />
                            Customer Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={customer.name}
                                    onChange={handleCustomerChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={handleCustomerChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. +91 9876543210"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={customer.email}
                                    onChange={handleCustomerChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FiMapPin className="text-red-500" />
                            Delivery Address
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    value={address.street}
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="House no, Street, Area"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={address.city}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="City name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        PIN Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={address.pincode}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="6-digit PIN"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={address.state}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="State name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={address.country}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cart Items Review */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FiBox className="text-green-600" />
                            Order Items ({cartItems.length})
                        </h2>
                        <div className="space-y-4">
                            {cartItems.map(({ product, quantity }) => (
                                product && (
                                    <div key={product._id} className="flex gap-4 border rounded-lg p-4 bg-gray-50">
                                        <img
                                            src={`${API_BASE_URL}${product.images[0]}`}
                                            alt={product.name}
                                            className="w-16 h-16 object-contain border rounded"
                                            onError={(e) => {
                                                e.target.src = '/images/product-1.png';
                                            }}
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">Brand: {product.brandName}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-500">Qty:</span>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={quantity}
                                                        onChange={(e) => {
                                                            const newQty = parseInt(e.target.value);
                                                            if (newQty > 0) {
                                                                updateQuantity(product._id, newQty);
                                                            }
                                                        }}
                                                        className="w-16 px-2 py-1 border rounded text-center"
                                                    />
                                                </div>
                                                <span className="font-semibold text-gray-800">₹{product.price * quantity}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(product._id)}
                                            className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all"
                                            title="Remove item"
                                        >
                                            <FiX size={14} />
                                        </button>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FiCreditCard className="text-purple-600" />
                            Payment Method
                        </h2>
                        <div className="space-y-3">
                            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mt-1"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">Cash on Delivery</div>
                                    <div className="text-sm text-gray-600">Pay when your order arrives at your doorstep</div>
                                </div>
                                <FiTruck className="text-green-600 mt-1" size={20} />
                            </label>

                            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="ONLINE"
                                    checked={paymentMethod === 'ONLINE'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mt-1"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">Pay Now with Razorpay</div>
                                    <div className="text-sm text-gray-600">Secure online payment via UPI, Cards, Net Banking</div>
                                    <div className="text-xs text-green-600 mt-1">✓ Fast & Secure ✓ Instant Confirmation</div>
                                </div>
                                <div className="text-orange-600 mt-1">
                                    <FiCreditCard size={20} />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                className="mt-1"
                            />
                            <div className="text-sm">
                                <span className="font-medium">I agree to the </span>
                                <Link to="/term&condition" className="text-blue-600 hover:underline">Terms & Conditions</Link>
                                <span className="font-medium"> and </span>
                                <Link to="/privacypolicy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Right Side - Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span>Items ({cartItems.length})</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Delivery Charges</span>
                                <span className="text-green-600">₹{DELIVERY_CHARGE}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>GST (18%)</span>
                                <span>₹{gstAmount.toFixed(2)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Amount</span>
                                <span className="text-orange-600">₹{total.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                                💰 You save ₹{(gstAmount * 0.1).toFixed(2)} on this order!
                            </div>
                        </div>

                        {paymentMethod === 'COD' ? (
                            <button
                                onClick={() => {
                                    if (validateForm()) {
                                        handlePlaceOrder();
                                    }
                                }}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mb-3"
                            >
                                <FiLock size={18} />
                                Place Order ₹{total.toFixed(2)}
                            </button>
                        ) : (
                            <div className="mb-3">
                                {validateForm() ? (
                                    <PaymentComponent
                                        customer={customer}
                                        address={address}
                                        totalAmount={total}
                                        onPaymentSuccess={(data) => {
                                            toast.success('Payment successful! Order confirmed.');
                                            clearCart();
                                            // Refresh orders list
                                            fetchOrders();
                                        }}
                                        disabled={!token}
                                    />
                                ) : (
                                    <div className="text-red-500 text-sm mb-2">
                                        Please fill in all required fields and agree to terms to proceed with online payment.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="text-xs text-gray-500 space-y-1">
                            <div>• 🚚 Free delivery on orders above ₹500</div>
                            <div>• 🔒 Your payment information is secure</div>
                            <div>• 📱 Get order updates via SMS</div>
                        </div>

                        <Link
                            to="/product"
                            className="block text-center mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

            {/* Orders History */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiBox /> Your Recent Orders
                </h2>
                {orders.length === 0 ? (
                    <div className="text-gray-500 text-center py-8 bg-white rounded-lg">
                        No orders found. Start shopping to place your first order!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</h3>
                                        <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/invoice/${order._id}`)}
                                            className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                                            title="View Invoice"
                                        >
                                            👁️ View
                                        </button>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    toast.info('Downloading PDF...');
                                                    const response = await axios.get(`${API_BASE_URL}/api/orders/invoice/${order._id}`, {
                                                        responseType: 'blob',
                                                        headers: {
                                                            Authorization: `Bearer ${token}`
                                                        }
                                                    });

                                                    // Create blob link to download
                                                    const url = window.URL.createObjectURL(new Blob([response.data]));
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.setAttribute('download', `Invoice-${order._id.slice(-8)}.pdf`);
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    link.remove();
                                                    window.URL.revokeObjectURL(url);

                                                    toast.success('PDF downloaded successfully!');
                                                } catch (error) {
                                                    toast.error('Failed to download PDF');
                                                    console.error('PDF download error:', error);
                                                }
                                            }}
                                            className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!token}
                                            title="Download PDF"
                                        >
                                            📄 PDF
                                        </button>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {order.items.map((item) => (
                                        <div key={item._id} className="flex gap-3 border rounded-lg p-3 bg-gray-50">
                                            <img
                                                src={`${API_BASE_URL}${item.product?.images?.[0]}`}
                                                alt={item.product?.name}
                                                className="w-16 h-16 object-contain border rounded"
                                                onError={(e) => {
                                                    e.target.src = '/images/product-1.png';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 text-sm">{item.product?.name}</h4>
                                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                <p className="text-xs font-medium text-gray-700">₹{item.product?.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
