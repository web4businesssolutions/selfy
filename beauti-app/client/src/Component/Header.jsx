
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="bg-blue-300 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src="/images/logo/logo2.png" alt="Logo" className="h-14" />
                </Link>

                {/* Hamburger Button */}
                <button className="text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Navigation Menu */}
                <nav
                    className={`absolute top-full left-0 w-full bg-blue-300 md:bg-transparent md:static md:w-auto z-50 transition-all duration-300 ease-in-out text-base md:text-lg font-medium ${isOpen ? 'block' : 'hidden'} md:block`}
                >

                    <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 px-4 md:px-0 py-4 md:py-0 text-white font-medium">
                        <li><Link to="/" className="hover:text-red-300">Home</Link></li>

                        {/* Dropdown */}
                        <li className="relative group">
                            <button
                                className="hover:text-gray-300 text-black"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                Category
                            </button>
                            {showDropdown && (
                                <ul className="absolute left-0 mt-2 w-52 bg-white text-black shadow-lg rounded-md z-50">
                                    <li><Link to="/makeup" className="block px-4 py-2 hover:bg-gray-200">Makeup Kits</Link></li>
                                    <li><Link to="/bath" className="block px-4 py-2 hover:bg-gray-200">Bath Soaps</Link></li>
                                    <li><Link to="/treatement" className="block px-4 py-2 hover:bg-gray-200">Acne Treatment</Link></li>
                                    <li><Link to="/makeuptool" className="block px-4 py-2 hover:bg-gray-200">Makeup Tools</Link></li>
                                </ul>
                            )}
                        </li>

                        <li><Link to="/product" className="hover:text-gray-300">Products</Link></li>
                        <li><Link to="/Blog" className="hover:text-gray-300">Blog</Link></li>
                        <li><Link to="/Contact" className="hover:text-gray-300">Contact us</Link></li>

                        {/* Icons */}
                        <li className="flex gap-4 items-center mt-2 md:mt-0">
                            <Link to="#"><img src="/images/user.svg" alt="User" className="h-6" /></Link>
                            <Link to="#"><img src="/images/cart.svg" alt="Cart" className="h-6" /></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

