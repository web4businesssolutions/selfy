// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get("http://localhost:4000/api/products/all-products");
//                 setProducts(res.data.products); // Ensure backend returns { products: [...] }
//             } catch (error) {
//                 console.error("Failed to fetch products:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) return <p className="text-center mt-10">Loading products...</p>;

//     return (
//         <div className="p-6">
//             <h2 className="text-center text-3xl font-bold mb-6">Our Products</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.map(({ _id, name, price, images = [] }) => (
//                     <div
//                         key={_id}
//                         className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
//                     >
//                         <img
//                             src={`http://localhost:4000${images[0]}`}  // Example: /uploads/17508xxxxx.webp
//                             crossOrigin="anonymous"
//                             alt="Product"
//                         />
//                         console.log(images[0]);
//                         <div className="p-4">
//                             <h3 className="text-lg font-semibold mb-2">{name}</h3>
//                             <p className="text-gray-700 font-bold">₹{price}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Product;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/categories/all`);
                setCategories(res.data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading categories...</p>;

    return (
        <div className="p-6">
            <h2 className="text-center text-3xl font-bold mb-8 text-red-500">Our Categories</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categories?.map(({ _id, name, image }) => (
                    <div
                        key={_id}
                        className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow hover:shadow-xl transition-all duration-300"
                    >
                        <div className="relative overflow-hidden">
                            {image ? (
                                <img
                                    src={image.startsWith('http') ? image : `${API_BASE_URL}${image}`}
                                    alt={name}
                                    className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-900 truncate mb-3">{name}</h3>

                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                                Explore Category
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
