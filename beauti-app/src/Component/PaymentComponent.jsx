import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants';

const PaymentComponent = ({
    customer,
    address,
    totalAmount,
    onPaymentSuccess,
    disabled
}) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (disabled) {
            toast.warning('Please log in to make payment');
            return;
        }

        try {
            setLoading(true);
            toast.info('Creating order...');

            // Create order first
            const orderResponse = await axios.post(
                `${API_BASE_URL}/api/orders/place`,
                {
                    customer,
                    address,
                    paymentMethod: 'ONLINE',
                    status: 'Pending'
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );

            const orderId = orderResponse.data.order._id;
            console.log('Order created:', orderId);
            toast.info('Initiating payment...');

            // Create Razorpay order
            const paymentResponse = await axios.post(`${API_BASE_URL}/api/orders/create-payment`, {
                amount: totalAmount, // Send amount in rupees, backend converts to paisa
                orderId
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const { data } = paymentResponse;
            const options = {
                key: data.key, // Razorpay key from backend
                amount: data.order.amount,
                currency: data.order.currency,
                name: 'BeautySnap',
                description: 'Payment for Order',
                order_id: data.order.id,

                prefill: {
                    name: customer.name,
                    email: customer.email,
                    contact: customer.phone
                },
                notes: {
                    orderId: orderId
                },
                theme: {
                    color: '#F59E0B' // Orange theme matching app
                },

                handler: async function (response) {
                    try {
                        toast.info('Verifying payment...');

                        // Verify payment on backend
                        const verifyResponse = await axios.post(`${API_BASE_URL}/api/orders/verify-payment`, {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: orderId
                        }, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        });

                        if (verifyResponse.data.success) {
                            toast.success('Payment successful! Order confirmed.');
                            if (onPaymentSuccess) {
                                onPaymentSuccess(verifyResponse.data);
                            }
                        } else {
                            toast.error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        toast.error('Payment verification failed. Please contact support.');
                    }
                    setLoading(false);
                },

                modal: {
                    ondismiss: function() {
                        setLoading(false);
                        toast.info('Payment cancelled by user');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

            // Handle payment failure
            rzp.on('payment.failed', function (response) {
                setLoading(false);
                console.log('Payment failed:', response.error);
                toast.error('Payment failed: ' + response.error.description);
            });

        } catch (error) {
            setLoading(false);
            console.error('Payment error:', error);
            const message = error?.response?.data?.error || 'Failed to initiate payment. Please try again.';
            toast.error(message);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading || disabled}
            className={`
                w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
                ${disabled
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : loading
                        ? 'bg-orange-400 cursor-wait text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                }
            `}
        >
            {loading ? (
                <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                </>
            ) : (
                <>
                    💳 Pay ₹{totalAmount.toFixed(2)} with Razorpay
                </>
            )}
        </button>
    );
};

export default PaymentComponent;
