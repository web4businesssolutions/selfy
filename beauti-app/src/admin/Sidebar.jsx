import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaUsers,
    FaShoppingCart,
    FaThList,
    FaInfoCircle,
    FaAddressCard,
    FaChevronDown,
} from 'react-icons/fa';

const Sidebar = () => {
    const role = localStorage.getItem('role'); // 'admin' or 'seller'
    const [isPagesOpen, setIsPagesOpen] = useState(false); // dropdown toggle
    const [isDocumentOpen, setIsDocumentOpen] = useState(false); // dropdown toggle

    return (
        <div className="w-full md:w-64 min-h-screen bg-gradient-to-b from-indigo-800 to-purple-800 text-white flex flex-col p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-10 tracking-wide text-center">
                Selfy<span className="text-pink-300">Snap</span>
            </h2>

            <nav className="flex flex-col gap-4 mt-4">
                {role === 'admin' && (
                    <>
                        <Link to="/admin/dashboard" className="flex items-center gap-4 px-2 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white transition-all duration-200 shadow hover:shadow-md">
                            <FaTachometerAlt className="text-xl" />
                            <span className="text-base font-medium">Analytics</span>
                        </Link>

                        <Link to="/admin/vendor" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaUsers className="text-xl" />
                            <span className="text-base font-medium">Manage Vendors</span>
                        </Link>

                        <Link to="/admin/product" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaBoxOpen className="text-xl" />
                            <span className="text-base font-medium">Manage Products</span>
                        </Link>

                         {/* Dropdown for Manage Pages */}
                        <div
                            className="flex items-center justify-between px-2 py-3 rounded-xl hover:bg-indigo-700 cursor-pointer text-white transition-all duration-200"
                            onClick={() => setIsPagesOpen(!isPagesOpen)}
                        >
                            <div className="flex items-center gap-4">
                                <FaInfoCircle className="text-xl" />
                                <span className="text-base font-medium">Manage Pages</span>
                            </div>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${isPagesOpen ? 'rotate-180' : ''}`}
                            />
                        </div>

                        {isPagesOpen && (
                            <div className="pl-10 flex flex-col gap-2 text-sm">
                                <Link to="/admin/about" className="hover:underline hover:text-pink-300 text-white flex items-center gap-2">
                                    <FaInfoCircle className="text-sm" /> About Page
                                </Link>
                                <Link to="/admin/contact" className="hover:underline hover:text-pink-300 text-white flex items-center gap-2">
                                    <FaAddressCard className="text-sm" /> Contact Page
                                </Link>
                                 <Link to="/admin/footer" className="hover:underline hover:text-pink-300 text-white flex items-center gap-2">
                                    <FaAddressCard className="text-sm" /> Footer Page
                                </Link>
                            </div>
                        )}

                        {/* Dropdown for Manage Document */}
                        <div
                            className="flex items-center justify-between px-2 py-3 rounded-xl hover:bg-indigo-700 cursor-pointer text-white transition-all duration-200"
                            onClick={() => setIsDocumentOpen(!isDocumentOpen)}
                        >
                            <div className="flex items-center gap-4">
                                <FaInfoCircle className="text-xl" />
                                <span className="text-base font-medium">Manage Policy

                                </span>
                            </div>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${isDocumentOpen ? 'rotate-180' : ''}`}
                            />
                        </div>

                        {isDocumentOpen && (
                            <div className="pl-10 flex flex-col gap-2 text-sm">
                                <Link to="/admin/term" className="hover:underline hover:text-pink-300 text-white flex items-center gap-2">
                                    <FaAddressCard className="text-xl" />Term & Condition
                                </Link>
                                 <Link to="/admin/privacy" className="hover:underline hover:text-pink-300 text-white flex items-center gap-2">
                                    <FaAddressCard className="text-xl" />Privacy Policy
                                </Link>
                                 <Link to="/admin/return" className="hover:underline hover:text-pink-300 text-white flex items-center gap-2">
                                    <FaAddressCard className="text-xl" />Return Policy
                                </Link>
                                 <Link to="/admin/shipping" className="hover:underline hover:text-pink-300 text-white flex items-center gap-2">
                                    <FaAddressCard className="text-xl" />Shipping Policy
                                </Link>
                            </div>
                        )}


                        <Link to="/admin/order" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaShoppingCart className="text-xl" />
                            <span className="text-base font-medium">Manage Orders</span>
                        </Link>

                        <Link to="/admin/user" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaUsers className="text-xl" />
                            <span className="text-base font-medium">Manage Users</span>
                        </Link>  
                        
                    </>
                )}

                {role === 'seller' && (
                    <>
                        <Link to="/admin/dashboard" className="flex items-center gap-4 px-2 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white transition-all duration-200 shadow hover:shadow-md">
                            <FaTachometerAlt className="text-xl" />
                            <span className="text-base font-medium">Dashboard</span>
                        </Link>

                        <Link to="/admin/category" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaThList className="text-xl" />
                            <span className="text-base font-medium">Category</span>
                        </Link>

                        <Link to="/admin/product" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaBoxOpen className="text-xl" />
                            <span className="text-base font-medium">View Products</span>
                        </Link>

                        <Link to="/admin/order" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaShoppingCart className="text-xl" />
                            <span className="text-base font-medium">Orders</span>
                        </Link>

                        <Link to="/admin/stepper-product" className="flex items-center gap-4 px-2 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaBoxOpen className="text-xl" />
                            <span className="text-base font-medium">Add Product</span>
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;
