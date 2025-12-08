import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../constants';

const CategoryScroll = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            // const res = await axios.get("https://selfy-snap-o6ka.onrender.com/api/categories/all");
            const res = await axios.get(`${API_BASE_URL}/api/categories/all`);

            setCategories(res.data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="py-2 px-2 overflow-x-auto scrollbar-hide mx-4">
            <div className="flex gap-6 min-w-max justify-center">
                {categories.map((cat) => (
                    <Link
                        to={`/product`}
                        key={cat._id}
                        className="flex flex-col items-center min-w-[72px] hover:bg-gray-100 p-2 rounded-md transition"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-14 h-14 rounded-full object-cover mb-1 shadow-sm border-2 border-b-pink-400"
                        />
                        <span className="text-sm font-semibold text-center">
                            {cat.name.length > 10 ? cat.name.slice(0, 15) + "..." : cat.name}
                        </span>


                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryScroll;
