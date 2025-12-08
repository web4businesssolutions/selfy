// import React from 'react';

// const tools = [
//     { id: 1, name: "Blending Sponge", price: "₹149", rating: 4.6, image: "https://via.placeholder.com/300x300.png?text=Blending+Sponge" },
//     { id: 2, name: "Foundation Brush", price: "₹249", rating: 4.7, image: "https://via.placeholder.com/300x300.png?text=Foundation+Brush" },
//     { id: 3, name: "Eyelash Curler", price: "₹199", rating: 4.5, image: "https://via.placeholder.com/300x300.png?text=Eyelash+Curler" },
//     { id: 4, name: "Makeup Mirror", price: "₹499", rating: 4.8, image: "https://via.placeholder.com/300x300.png?text=Makeup+Mirror" },
//     { id: 5, name: "Makeup Organizer", price: "₹799", rating: 4.6, image: "https://via.placeholder.com/300x300.png?text=Organizer" },
//     { id: 6, name: "Eyeliner Brush", price: "₹129", rating: 4.4, image: "https://via.placeholder.com/300x300.png?text=Eyeliner+Brush" },
//     { id: 7, name: "Powder Puff", price: "₹99", rating: 4.3, image: "https://via.placeholder.com/300x300.png?text=Powder+Puff" },
//     { id: 8, name: "Makeup Scissors", price: "₹149", rating: 4.2, image: "https://via.placeholder.com/300x300.png?text=Scissors" },
//     { id: 9, name: "Brow Brush", price: "₹159", rating: 4.5, image: "https://via.placeholder.com/300x300.png?text=Brow+Brush" },
//     { id: 10, name: "Lip Brush", price: "₹139", rating: 4.4, image: "https://via.placeholder.com/300x300.png?text=Lip+Brush" },
//     { id: 11, name: "Contour Brush", price: "₹229", rating: 4.6, image: "https://via.placeholder.com/300x300.png?text=Contour+Brush" },
//     { id: 12, name: "Brush Cleaner", price: "₹299", rating: 4.7, image: "https://via.placeholder.com/300x300.png?text=Brush+Cleaner" },
// ];

// const MakeupTool = () => {
//     return (
//         <div className="bg-gradient-to-r from-pink-50 via-rose-100 to-purple-50 py-12 px-4 min-h-screen mt-6">
//             <h2 className="text-4xl text-center font-bold text-rose-500 mb-10 animate-fade-in tracking-wide underline decoration-rose-300">
//                 Premium Makeup Tools
//             </h2>

//             <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
//                 {tools.map((tool) => (
//                     <div
//                         key={tool.id}
//                         className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-pink-300"
//                     >
//                         <img
//                             src={tool.image}
//                             alt={tool.name}
//                             className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
//                         />
//                         <div className="p-4 text-center">
//                             <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
//                             <p className="text-rose-600 font-medium mt-1">{tool.price}</p>
//                             <p className="text-yellow-500 text-sm mt-1">
//                                 {"⭐".repeat(Math.floor(tool.rating))}
//                                 {tool.rating % 1 !== 0 && "⭐"}
//                                 <span className="text-xs text-gray-500 ml-1">({tool.rating})</span>
//                             </p>
//                             <button className="mt-3 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md shadow-md hover:shadow-lg transition-all">
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MakeupTool;


import React from 'react';
import tool from '../assets/tool.webp'
import tool1 from '../assets/tool1.webp'
import tool2 from '../assets/tool2.webp'
import tool3 from '../assets/tool3.webp'
import tool4 from '../assets/tool4.webp'
import tool5 from '../assets/tool5.webp'
import tool6 from '../assets/tool6.webp'
import tool7 from '../assets/tool7.webp'
const tools = [
    { id: 1, name: "Eye Shadow 13 Pcs Brush Set Professional Blush", price: "₹349", rating: 4.6, image: tool },
    { id: 2, name: "Synthetic Bristle Makeup Brushes - Shiny Copper", price: "₹549", rating: 4.7, image: tool1 },
    { id: 3, name: "8 Pcs Brush Set With Pouch, Makeup Brushes", price: "₹499", rating: 4.5, image: tool2 },
    { id: 4, name: "12pcs Makeup Eyeshadow Brush Foundation Lips Eyebrows ", price: "₹599", rating: 4.8, image: tool3 },
    { id: 5, name: "pcs Face Puff and Sponge", price: "₹799", rating: 4.6, image: tool4 },
    { id: 6, name: "Silicone Makeup Brush Cleaner", price: "₹129", rating: 4.4, image: tool5 },
    { id: 7, name: "Eye Shadow 13 Pcs Brush Set", price: "₹599", rating: 4.3, image: tool6 },
    { id: 8, name: "Nail Art Dust Powder Remover", price: "₹549", rating: 4.2, image: tool7 },

];

const MakeupTool = () => {
    return (
        <div className="bg-gradient-to-r from-pink-50 via-rose-100 to-purple-50 min-h-screen py-12 px-4">

            {/* Heading Above All Cards */}
            <div className="max-w-7xl mx-auto mb-10">
                <h2 className="text-4xl font-bold text-center text-rose-500 animate-fade-in underline decoration-rose-300">
                    Premium Makeup Tools
                </h2>
            </div>

            {/* Card Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-pink-300"
                    >
                        <img
                            src={tool.image}
                            alt={tool.name}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
                            <p className="text-rose-600 font-medium mt-1">{tool.price}</p>
                            <p className="text-yellow-500 text-sm mt-1">
                                {"⭐".repeat(Math.floor(tool.rating))}
                                {tool.rating % 1 !== 0 && "⭐"}
                                <span className="text-xs text-gray-500 ml-1">({tool.rating})</span>
                            </p>
                            <button className="mt-3 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md shadow-md hover:shadow-lg transition-all">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeupTool;
