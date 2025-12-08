import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_BASE_URL } from '../constants';
import {    FiPrinter,
    FiDownload,
    FiArrowLeft,
    FiUser,
    FiMapPin,
    FiPhone,
    FiMail,
    FiShoppingBag,
    FiClock,
    FiCheckCircle
} from 'react-icons/fi';

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.error('Please login to view invoice');
            navigate('/login');
            return;
        }

        fetchInvoiceDetails();
    }, [orderId, token, navigate]);

    const fetchInvoiceDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/orders/invoice-details/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrder(response.data);
        } catch (error) {
            toast.error('Failed to load invoice details');
            console.error('Invoice fetch error:', error);
            navigate('/order');
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const link = document.createElement('a');
        link.href = `${API_BASE_URL}/api/orders/invoice/${orderId}`;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const printInvoice = () => {
        window.print();
    };

    const calculateTotals = () => {
        if (!order) return { subtotal: 0, gstAmount: 0, total: 0 };

        const subtotal = order.items.reduce((sum, item) => {
            if (item.product) {
                return sum + (item.product.price * item.quantity);
            }
            return sum;
        }, 0);

        const gstAmount = subtotal * 0.18; // 18% GST
        const deliveryCharge = 49;
        const total = subtotal + gstAmount + deliveryCharge;

        return { subtotal, gstAmount, deliveryCharge, total };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Invoice not found</h2>
                    <button
                        onClick={() => navigate('/order')}
                        className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                        Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    const { subtotal, gstAmount, deliveryCharge, total } = calculateTotals();

    return (
        <div className="min-h-screen bg-white print:bg-white no-headers-footers">
            {/* Invoice Content - Single A4 Sheet */}
            <div className="relative invoice-a4 mx-auto bg-white shadow-none p-6 print:p-8 print-invoice no-headers-footers" style={{minHeight: '297mm'}}>
                <div className="flex items-center absolute top-15 bottom-15 right-15 left-15 opacity-10">
                        <img src="/images/logo/logo2.png" alt="Logo" className="h-full w-full" />
                    </div>
                {/* Company Header */}
                <div className="flex flex-col items-center justify-center mb-8 border-b pb-6">
                    <div className="flex items-center gap-4 mb-4">

                        
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 underline">INVOICE</h2>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 underline">Invoice Details</h3>
                        <div className="space-y-2">
                            <p><strong>Invoice Number:</strong> INV-{order._id.slice(-8)}</p>
                            <div className="flex items-center gap-2">
                                <FiClock className="text-gray-600" />
                                <p><strong>Order Date & Time:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 underline flex items-center gap-2">
                            <FiUser className="text-blue-600" />
                            Bill To
                        </h3>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <div className="flex items-center gap-2">
                                <FiMail className="text-gray-600" />
                                <p><strong>Email:</strong> {order.user.email}</p>
                            </div>
                            {order.shippingAddress && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <FiMapPin className="text-gray-600" />
                                        <p><strong>Address:</strong></p>
                                    </div>
                                    <p className="ml-6">{order.shippingAddress.address}</p>
                                    <p className="ml-6">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                    <div className="flex items-center gap-2">
                                        <FiPhone className="text-gray-600" />
                                        <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 underline flex items-center gap-2">
                        <FiShoppingBag className="text-green-600" />
                        Order Details
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-gray-600">Order ID</p>
                            <p className="font-semibold">{order._id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Payment Method</p>
                            <p className="font-semibold">{order.paymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <div className="flex items-center gap-2">
                                <FiCheckCircle className={`${
                                    order.status === 'Delivered' ? 'text-green-600' :
                                    order.status === 'Processing' ? 'text-blue-600' :
                                    order.status === 'Shipped' ? 'text-purple-600' :
                                    'text-yellow-600'
                                }`} size={16} />
                                <span className="font-semibold">{order.status}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Items</p>
                            <p className="font-semibold">{order.items.length} products</p>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 underline">Product Details</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-3 text-left">Product & Seller</th>
                                    <th className="border border-gray-300 p-3 text-center">Quantity</th>
                                    <th className="border border-gray-300 p-3 text-right">Unit Price</th>
                                    <th className="border border-gray-300 p-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 ">
                                        <td className="border border-gray-300 p-3">
                                            <div>
                                                <div className="font-semibold text-gray-900 text-lg">{item.product?.name}</div>
                                                {item.seller && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        <span className="font-medium">Seller:</span> {item.seller.name} ({item.seller.email})
                                                    </p>
                                                )}
                                                {item.product?.brandName && (
                                                    <p className="text-xs text-gray-500">Brand: {item.product.brandName}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center font-semibold">{item.quantity}</td>
                                        <td className="border border-gray-300 p-3 text-right">₹{item.product?.price}</td>
                                        <td className="border border-gray-300 p-3 text-right font-semibold">₹{item.product?.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                    <div className="w-64">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (18%):</span>
                                <span>₹{gstAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charges:</span>
                                <span>₹{deliveryCharge.toFixed(2)}</span>
                            </div>
                            <hr className="my-2 border-gray-400" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Amount:</span>
                                <span className="text-orange-600">₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t text-center">
                    <p className="text-gray-700 font-medium">Thank you for shopping with BeautySnap!</p>
                    <p className="text-gray-600 text-sm mt-2">For any queries, contact us at support@beautysnap.com</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
