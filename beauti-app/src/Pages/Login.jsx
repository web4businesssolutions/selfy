import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../constants';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      const { user, token } = res.data;

      if (!token || !user) {
        toast.error("Invalid login response from server");
        return;
      }

      // ✅ Check if seller is active
      if (user.role === "seller" && user.isActive === false) {
        toast.error("Your seller account is not active. Please contact support.");
        return;
      }

      // Save in localStorage
      localStorage.setItem('role', user.role);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!");

      setTimeout(() => {
        if (user.role === "admin" || user.role === "seller") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 100);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r from-green-100 to-white">
      {/* Left Panel with Illustration */}
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

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-10 rounded-lg shadow-lg"
        >
          <h1 className="text-center mb-4">
            <img src="/images/logo/logo2.png" alt="Lovebirds Logo" className="mx-auto h-12 w-auto" />
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Welcome to Selfysnap
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <div className="text-right mt-1 text-sm text-blue-500 hover:underline cursor-pointer">
              Forgot password?
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 transition duration-200 shadow-lg !rounded-full"
          >
            Sign in
          </button>
          <p className="pt-2">
            Don't have an account? <Link to={'/register'} className="text-blue-500 underline">Register</Link>
          </p>
        </form>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Login;
