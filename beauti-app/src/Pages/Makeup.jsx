import React from 'react';
import image from '../assets/image.jpg'
import images from '../assets/images.webp'
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'
import image4 from '../assets/image4.jpg'
import image5 from '../assets/image5.jpg'
import image6 from '../assets/image6.jpg'
const products = [
    {
        id: 1,
        name: "Makeup Kits",
        price: "₹499",
        rating: 4.5,
        image: image
    },
    {
        id: 2,
        name: "Multicolour Makeup Kit",
        price: "₹899",
        rating: 4.2,
        image: images
    },
    {
        id: 3,
        name: "Combo Makeup kit",
        price: "₹699",
        rating: 4.7,
        image: image1
    },
    {
        id: 4,
        name: "TYA 5024 5 PC BRUSH OR H 36 LINER PANSIL ",
        price: "₹799",
        rating: 4.6,
        image: image2
    },
    {
        id: 5,
        name: "MINARA BEAUTY Professional Makeup Brush",
        price: "₹499",
        rating: 4.5,
        image: image3
    },
    {
        id: 6,
        name: "Modern Makeup",
        price: "₹899",
        rating: 4.2,
        image: image4
    },
    {
        id: 7,
        name: "Extra Soft Foundation Brush",
        price: "₹699",
        rating: 4.7,
        image: image5
    },
    {
        id: 8,
        name: "Professional Makeup Brush Applicator Set",
        price: "₹799",
        rating: 4.6,
        image: image6
    },
];

const Makeup = () => {
    return (

        <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 min-h-screen py-12 px-4">
            <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-500 drop-shadow-md tracking-wide animate-fade-in underline">
                Latest Makeup Products
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mt-6">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-rose-300 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out p-4 text-center group"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-3 transition duration-500 group-hover:scale-105"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-rose-500 text-sm font-medium">{product.price}</p>
                        <p className="text-yellow-500 text-sm my-1">
                            {Array(Math.floor(product.rating)).fill("⭐").join("")}
                            {product.rating % 1 !== 0 ? "⭐" : ""}
                            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                        </p>
                        <button className="mt-3 px-4 py-2 bg-rose-500 text-white text-sm font-semibold rounded-md hover:bg-rose-600 shadow-md hover:shadow-lg transition-all">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Makeup;
