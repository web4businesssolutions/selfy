import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../constants';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState('');
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/productdetail/singledetail/${id}`);
                setProduct(res.data.product);
                setSelectedImage(`${res.data.product.images?.[0]}`);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError('Failed to load product.');
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setShowPopup(true);
        toast.success(`${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart! Redirecting to checkout...`);
        navigate('/order');
    };

    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center mt-10">Loading product...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden transition-all duration-300">
                {/* Left: Image Preview */}
                <div className="md:w-1/2 p-6 bg-gray-50">
                    <img
                        src={`${API_BASE_URL}${selectedImage}`}
                        
                        alt={product.name}
                        className="w-full h-80 object-contain rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
                    />

                    <div className="grid grid-cols-4 gap-3">
                        {product.images?.slice(0, 4).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                onClick={() => setSelectedImage(`${img}`)}
                                className={`h-20 w-full object-contain cursor-pointer border p-1 rounded-lg transition duration-200 ${selectedImage === `${img}`
                                        ? 'border-blue-600 ring-2 ring-blue-300'
                                        : 'hover:border-blue-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
                        <p className="text-gray-900 mb-4">
                            <span className="font-semibold">Description:</span> {product.description}
                        </p>

                        <div className="text-lg font-medium text-gray-800 mb-2">
                            Price: <span className="text-gray-900 font-bold">₹{product.price}</span>
                        </div>
                        <div className="mb-1">Stock: <span className="text-gray-700">{product.quantity}</span></div>
                        <div className="mb-1">Brand: <span className="text-gray-700">{product.brandName}</span></div>
                        <div className="mb-1">Category: <span className="text-gray-700">{product.category}</span></div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold mb-4 text-center">Product Added to Cart</h2>
                        <div className="text-center mb-4">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-24 h-24 object-contain mx-auto mb-2"
                            />
                            <p className="text-gray-700">{product.name}</p>
                            <p className="text-blue-600 font-bold">₹{product.price}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                                onClick={() => setShowPopup(false)}
                            >
                                Continue Shopping
                            </button>
                            <button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                                onClick={() => {
                                    setShowPopup(false);
                                    navigate('/cart');
                                }}
                            >
                                Go to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
