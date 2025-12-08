// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const CategoryPage = () => {
//     const { slug } = useParams();
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         axios.get(`https://selfy-snap-o6ka.onrender.com/api/products/category/${slug}`)
//             .then(res => setProducts(res.data.products))
//             .catch(err => console.error("Error:", err));
//     }, [slug]);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-semibold capitalize mb-4">{slug} Products</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {products.map(product => (
//                     <div key={product._id} className="bg-white shadow rounded p-4">
//                         <img
//                             src={`https://selfy-snap-o6ka.onrender.com/${product.image}`}
//                             alt={product.name}
//                             className="h-40 w-full object-cover mb-2"
//                         />
//                         <h2 className="text-lg font-bold">{product.name}</h2>
//                         <p>₹{product.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const CategoryPage = () => {
//     const { slug } = useParams();
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         axios.get(`https://selfy-snap-o6ka.onrender.com/api/products/category/${slug}`)
//             .then(res => setProducts(res.data.products))
//             .catch(err => console.error("Error:", err));
//     }, [slug]);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-semibold capitalize mb-4">{slug} Products</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {products.map(product => (
//                     <div key={product._id} className="bg-white shadow rounded p-4">
//                         <img
//                             src={`https://selfy-snap-o6ka.onrender.com${product.images?.[0]}`}
//                             alt={product.name}
//                             className="h-40 w-full object-cover mb-2"
//                         />
//                         <h2 className="text-lg font-bold">{product.name}</h2>

//                         <p className="text-blue-600 font-semibold">₹{product.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;






import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../constants';

const CategoryPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/products/category/${slug}`)
            .then(res => setProducts(res.data.products))
            .catch(err => console.error("Error:", err));
    }, [slug]);

    const handleBuyNow = (productId) => {
        addToCart({ _id: productId });
        navigate("/cart");
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold capitalize mb-6 text-center text-rose-600">
                {slug} Products
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map(product => (
                    <div
                        key={product._id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transform hover:scale-[1.01] transition-all duration-300"
                    >
                        <Link to={`/product/${product._id}`}> <img
                            src={`${API_BASE_URL}${product.images[0]}`}
                            alt={product.name}
                            className="h-32 w-full object-cover"
                        /></Link>


                        <div className="p-2">
                            <h4 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h4>
                            <p className="text-xs text-gray-400">{product.brand || "Brand"}</p>
                            <p className="text-sm font-bold text-emerald-600 mt-1">₹{product.price}</p>

                            <div className="flex gap-1 mt-2">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="flex-1 text-xs bg-rose-600 hover:bg-rose-700 text-white py-1 rounded"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => handleBuyNow(product._id)}
                                    className="flex-1 text-xs bg-gray-800 hover:bg-black text-white py-1 rounded"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
