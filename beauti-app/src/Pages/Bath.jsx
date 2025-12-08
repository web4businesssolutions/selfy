import React from 'react';
import bath from '../assets/bath.jpg'
import bath1 from '../assets/bath1.jpg'
import bath2 from '../assets/bath2.jpg'
import bath3 from '../assets/bath3.jpg'
import bath4 from '../assets/bath4.webp';
import bath5 from '../assets/bath5.jpg'
import bath6 from '../assets/bath6.webp'
import bath7 from '../assets/bath7.jpg'
import bath8 from '../assets/bath8.webp'
import bath9 from '../assets/bath9.webp'
import bath10 from '../assets/bath10.webp'
import bath11 from '../assets/bath11.webp'
const bathProducts = [
    {
        id: 1,
        name: "Disposable Mini Soap Paper Scented ",
        price: "₹600",
        rating: 4.5,
        image: bath
    },
    {
        id: 2,
        name: "Flower Design Tube Shape Bottle",
        price: "₹599",
        rating: 4.7,
        image: bath1
    },
    {
        id: 3,
        name: "Travel Soft Paper Soap Flower Design",
        price: "₹479",
        rating: 4.6,
        image: bath2
    },
    {
        id: 4,
        name: "Disposable Mini Soap Paper | Scented Soap Bath Flakes",
        price: "₹359",
        rating: 4.4,
        image: bath3
    },
    {
        id: 5,
        name: "Combo Of 4 Boxes Aple Shape Paper Soap",
        price: "₹249",
        rating: 4.8,
        image: bath4
    },
    {
        id: 6,
        name: "Pack of 2 Multicolor Design Tube Shape Bottle Paper Soap",
        price: "₹329",
        rating: 4.6,
        image: bath5
    },
    {
        id: 7,
        name: "Tube Paper Soap Pack of 2 For Office and Tarvel Use",
        price: "₹389",
        rating: 4.5,
        image: bath6
    },
    {
        id: 8,
        name: "Cursive heart round shape fruit flavor tube paper soap",
        price: "₹299",
        rating: 4.6,
        image: bath7
    },
    {
        id: 9,
        name: "Ghar Soap Sandalwood & Saffron Magic Soap for Bathing",
        price: "₹489",
        rating: 4.7,
        image: bath8
    },
    {
        id: 10,
        name: "Wet Wipes can Shaped With Tube Paper Soap Pack",
        price: "₹579",
        rating: 4.5,
        image: bath9
    },
    {
        id: 11,
        name: "Wet Wipes can Shaped With Tube Paper Soap",
        price: "₹569",
        rating: 4.3,
        image: bath10
    },
    {
        id: 12,
        name: "Hand wash paper soap pack of 5 pcs",
        price: "₹159",
        rating: 4.2,
        image: bath11
    }
];

const Bath = () => {
    return (
        <div className="bg-gradient-to-br from-teal-50 via-emerald-100 to-green-50 min-h-screen py-12 px-4">
            <h1 className="text-3xl font-extrabold text-center text-emerald-700 mb-10 animate-fade-in tracking-wide underline">
                Best Bath Soaps
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
                {bathProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-emerald-300 transition-transform transform hover:scale-105 duration-300 p-4 group"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-3 transition duration-500 group-hover:scale-105"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-emerald-600 text-sm font-medium">{product.price}</p>
                        <p className="text-yellow-500 text-sm my-1">
                            {Array(Math.floor(product.rating)).fill("⭐").join("")}
                            {product.rating % 1 !== 0 ? "⭐" : ""}
                            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                        </p>
                        <button className="mt-3 px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-md hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bath;
