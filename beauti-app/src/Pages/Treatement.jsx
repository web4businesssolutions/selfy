import React from 'react';
import treatement from '../assets/treatement.webp'
import treatement1 from '../assets/treatement1.webp'
import treatement2 from '../assets/treatement2.webp'
import treatement3 from '../assets/treatement3.webp'
import treatement4 from '../assets/treatement4.webp'
import treatement6 from '../assets/treatement6.webp'
import tretement7 from '../assets/tretement7.webp'
import treatement8 from '../assets/treatement8.webp'
const bathProducts = [
    {
        id: 1,
        name: "Stainless Steel Anti-Slid Handle Blackhead",
        price: "₹549",
        rating: 4.5,
        image: treatement
    },
    {
        id: 2,
        name: "4Pcs Blackhead Pimple Golden Remover Tools",
        price: "₹599",
        rating: 4.7,
        image: treatement1
    },
    {
        id: 3,
        name: "Rose Gold High quality Blackhead Remover 4 PCS",
        price: "₹579",
        rating: 4.6,
        image: treatement2
    },
    {
        id: 4,
        name: "Blackhead Remover & Ear Earwax",
        price: "₹500",
        rating: 4.4,
        image: treatement3
    },
    {
        id: 5,
        name: "Davilo Professionals Blackhead Remover Tool Kit",
        price: "₹449",
        rating: 4.8,
        image: treatement4
    },
    {
        id: 6,
        name: "Blackhead Remover Pimple Blemish Extractor/Remover",
        price: "₹429",
        rating: 4.6,
        image: treatement6
    },
    {
        id: 7,
        name: "NNBB Blackhead Remover Professional Tweezers Kit",
        price: "₹589",
        rating: 4.5,
        image: tretement7
    },
    {
        id: 8,
        name: " Pcs Blackhead Remover Cleaner Set Kit Stainless Steel",
        price: "₹399",
        rating: 4.6,
        image: treatement8
    },

];

const Bath = () => {
    return (
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 min-h-screen py-12 px-6">
            <h1 className="text-4xl font-extrabold text-center text-fuchsia-600 mb-12 animate-pulse tracking-wide drop-shadow-md underline">
                Best Bath Soaps Collection
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
                {bathProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:bg-gradient-to-br hover:from-rose-200 hover:via-pink-100 hover:to-amber-100"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-44 object-cover rounded-xl mb-3 transition-all duration-500 hover:scale-105"
                        />
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition">
                            {product.name}
                        </h3>
                        <p className="text-rose-600 text-sm font-medium">{product.price}</p>
                        <p className="text-yellow-500 text-sm my-1">
                            {Array(Math.floor(product.rating)).fill("⭐").join("")}
                            {product.rating % 1 !== 0 ? "⭐" : ""}
                            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                        </p>
                        <button className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm rounded-lg hover:from-pink-600 hover:to-rose-500 transition-all shadow hover:shadow-lg">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bath;
