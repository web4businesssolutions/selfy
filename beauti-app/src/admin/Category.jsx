import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { API_BASE_URL } from '../constants';

const Category = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [image, setImage] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/categories/all`);
            setCategories(res.data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);

        try {
            if (editMode) {
                await axios.put(
                    `${API_BASE_URL}/api/categories/update/${editId}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                await axios.post(
                    `${API_BASE_URL}/api/categories/create`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            }

            setName("");
            setImage(null);
            setEditMode(false);
            fetchCategories();
        } catch (error) {
            console.error("Operation failed:", error);
        }
    };


    const handleEdit = (cat) => {
        setEditMode(true);
        setEditId(cat._id);
        setName(cat.name);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/categories/delete/${id}`);
                fetchCategories();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        if (editMode) {
            setEditMode(false);
            setName("");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                        🗂️ Category Manager
                    </h2>
                    <button
                        onClick={toggleForm}
                        className="flex items-center gap-1 bg-white text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                        <span>{isFormOpen ? "Cancel" : "Add Category"}</span>
                    </button>
                </div>

                {/* Form */}
                {isFormOpen && (
                    <div className="p-4 border-b border-gray-200">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                {/* Text Input */}
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter category name"
                                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                {/* File Input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="w-full sm:w-1/2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`px-4 py-2 text-white rounded-lg font-medium tracking-wide transition duration-300 flex items-center justify-center gap-1 ${editMode
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {editMode ? (
                                    <>
                                        <PencilSquareIcon className="h-4 w-4" />
                                        <span>Update</span>
                                    </>
                                ) : (
                                    <>
                                        <PlusCircleIcon className="h-4 w-4" />
                                        <span>Add</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Categories List */}
                <div className="p-4">
                    {categories.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <PlusCircleIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-2">No categories found</p>
                            <button
                                onClick={toggleForm}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Add your first category
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {categories.map((cat, index) => (
                                <div
                                    key={cat._id}
                                    className="bg-gray-50 rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
                                >
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mr-3">
                                            {index + 1}
                                        </div>
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-10 h-10 rounded-full object-cover mr-3"
                                        />

                                        <span className="font-medium text-gray-800 truncate max-w-[120px] sm:max-w-[150px]">
                                            {cat.name}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                            title="Edit"
                                        >
                                            <PencilSquareIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat._id)}
                                            className="p-1.5 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Footer */}
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Total Categories: {categories.length}</span>
                        <span>Last Updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
