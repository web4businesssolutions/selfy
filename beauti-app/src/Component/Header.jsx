import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSearch, FaEllipsisV } from 'react-icons/fa';
import { MdLogout, MdLogin, MdAppRegistration } from 'react-icons/md';
import { API_BASE_URL } from '../constants';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        axios.get(`${API_BASE_URL}/api/categories/all`)
            .then(res => setCategories(res.data.categories || []))
            .catch(err => console.error("Failed to load categories", err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/images/logo/logo2.png" alt="Logo" className="h-12" />
                    </Link>

                    {/* Search */}
                    <div className="hidden md:flex flex-1 mx-6">
                        <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 outline-none"
                            />
                            <button className="bg-blue-600 text-white px-4">
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4 relative">
                        {/* Categories */}
                        <div className="relative hidden md:block">
                            <button
                                className="text-gray-700 hover:text-blue-600 font-medium"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                Categories
                            </button>
                            {showDropdown && (
                                <ul className="absolute left-0 mt-2 w-52 bg-white text-black shadow-lg rounded-md z-50 text-base">
                                    {categories.map(cat => (
                                        <li key={cat._id}>
                                            <Link to={`/category/${cat.slug}`} className="block px-4 py-2 hover:bg-gray-200">
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* User */}
                        <div className="relative flex items-center gap-1 cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                            <FaUserCircle className="text-2xl text-gray-700" />
                            {user && <span className="text-sm font-semibold text-gray-800">{user.name}</span>}
                            {showMenu && (
                                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 z-50 min-w-[160px]">
                                    {user ? (
                                        <>
                                            <div className="px-3 py-1 text-gray-800 font-semibold">{user.name}</div>
                                            <Link className='px-3 py-1 text-gray-800 font-semibold' to="/order">Order</Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-800 px-3 py-1 w-full"
                                            >
                                                <MdLogout /> Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" className="flex items-center gap-2 px-3 py-1 hover:text-blue-600" onClick={() => setShowMenu(false)}>
                                                <MdLogin /> Login
                                            </Link>
                                            <Link to="/register" className="flex items-center gap-2 px-3 py-1 hover:text-blue-600" onClick={() => setShowMenu(false)}>
                                                <MdAppRegistration /> Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="relative">
                            <FaShoppingCart className="text-2xl text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                                {cartCount}
                            </span>
                        </Link>

                        {/* Mobile Toggle */}
                        <button className="text-gray-700 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                     {/* Three Dot Menu */}
                        <div className="relative mx-4">
                            <button onClick={() => setShowMoreMenu(!showMoreMenu)}>
                                <FaEllipsisV className="text-sm text-gray-700"/>
                            </button>
                            {showMoreMenu && (
                                <ul className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md z-50 text-base">
                                    <li><Link to="/product" className="block px-4 py-2 hover:bg-gray-100">Products</Link></li>
                                    <li><Link to="/order" className="block px-4 py-2 hover:bg-gray-100">Order</Link></li>
                                    <li><Link to="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</Link></li>
                                    <li><Link to="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact Us</Link></li>
                                </ul>
                            )}
                        </div>

                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="md:hidden bg-white shadow-md px-4 py-3">
                        <ul className="flex flex-col gap-3 text-gray-700 text-base font-medium">
                            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                            <li><Link to="/product" onClick={() => setIsOpen(false)}>Products</Link></li>
                            <li><Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
                            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
                            <li className="border-t pt-2">
                                {user ? (
                                    <button onClick={handleLogout} className="text-red-600">Logout</button>
                                ) : (
                                    <>
                                        <Link to="/login" className="block py-1" onClick={() => setIsOpen(false)}>Login</Link>
                                        <Link to="/register" className="block py-1" onClick={() => setIsOpen(false)}>Sign Up</Link>
                                    </>
                                )}
                            </li>
                        </ul>
                    </nav>
                )}
            </header>

            {/* Push Content Down */}
            <div className="h-20"></div>
        </>
    );
};

export default Header;
