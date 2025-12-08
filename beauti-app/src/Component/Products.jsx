import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const Product = () => {
    const [products, setProducts] = useState([]);
    console.log(products);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/products/all-products`);
                console.log("Fetched data:", res.data); // ✅ Check what is returned
                console.log(res.data.products);
                setProducts(res.data.products); // ✅ Use the correct array
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    if (loading) return <p className="text-center mt-10">Loading products...</p>;

    return (
        <div>

        </div>
        // <div className="text-center text-black font-semibold underline underline-offset-4 text-2xl">
        //     Our Products
        //     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        //         {products.map(({ _id, name, price, images = [], ratings }) => (
        //             <div
        //                 key={_id}
        //                 className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        //             >
        //                 {images.map((img, index) => (
        //                     <img
        //                         key={index}
        //                         src={`https://selfy-snap-o6ka.onrender.com/uploads/${img}`}  // not img.url
        //                         alt={`${name}-${index}`}
        //                         className="w-full h-40 object-cover"
        //                         onError={(e) => {
        //                             e.target.src = "/placeholder.png";
        //                         }}
        //                     />
        //                 ))}


        //                 <div className="px-4 pb-4">
        //                     <h5 className="text-base font-medium tracking-tight text-gray-900 dark:text-white">
        //                         {name}
        //                     </h5>
        //                     <div className="flex items-center mt-2.5 mb-3">
        //                         <div className="flex items-center space-x-1">
        //                             {[...Array(5)].map((_, i) => (
        //                                 <svg
        //                                     key={i}
        //                                     className={`w-3.5 h-3.5 ${i < ratings ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'}`}
        //                                     fill="currentColor"
        //                                     viewBox="0 0 22 20"
        //                                 >
        //                                     <path d="M10.612 1.343l2.122 4.292 4.74.689-3.43 3.343.81 4.725-4.242-2.229-4.242 2.229.81-4.725-3.43-3.343 4.74-.689 2.122-4.292z" />
        //                                 </svg>
        //                             ))}
        //                         </div>
        //                         <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-sm ms-2">
        //                             {ratings || 0}.0
        //                         </span>
        //                     </div>
        //                     <div className="flex items-center justify-between">
        //                         <span className="text-xl font-bold text-gray-900 dark:text-white">₹{price}</span>
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
};

export default Product;
