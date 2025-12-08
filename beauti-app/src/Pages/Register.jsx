import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../constants";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "select role"
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
            toast.success("Registered successfully!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed!");
        }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r from-green-100 to-white">
            {/* Left Panel with Floating Logo */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-[#A3C6B3]">
                <img
                    src="/images/logo/logoside.png"
                    alt="Lovebird Illustration"
                    className="w-3/4 max-w-md float-updown"
                />
            </div>

            <style>
                {`
                .float-updown {
                    animation: floatUpDown 3s ease-in-out infinite;
                }

                @keyframes floatUpDown {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                `}
            </style>

            {/* Right Panel - Register Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-10 rounded-lg shadow-lg">
                    <h1 className="text-center mb-4">
                        <img src="/images/logo/logo2.png" alt="SelfySnap Logo" className="mx-auto h-12 w-auto" />
                    </h1>
                    <p className="text-center text-gray-600 mb-6">
                        Create your SelfySnap account
                    </p>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="select role" disabled>Select Role</option>
                        <option value="seller">Seller</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 transition duration-200 mt-3 !shadow-2xl !rounded-full"
                    >
                        Register
                    </button>
                    <p className='pt-2'>don't have an account? <Link to={'/login'}>Login</Link></p>
                </form>
            </div>

            {/* ✅ Toast container */}
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default Register;
