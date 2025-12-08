import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SideOfferBanner = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed top-1/3 right-0 z-50 flex items-start">
            {/* Slide-in Panel */}
            <div
                className={`bg-gray-800 text-white w-64 p-4 rounded-l-md shadow-lg transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <h2 className="font-bold text-lg mb-2">Special Offer!</h2>
                <p className="text-sm">
                    Get up to ₹2000 OFF on your first order. <br />
                    Use code <span className="font-semibold">WELCOME2000</span>.
                </p>
            </div>

            {/* Sticky Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-blue-600 text-white w-12 h-52 flex flex-col items-center rounded-l-md shadow-md ml-[-10px] z-10 py-3"
            >
                {/* Icon at the top */}
                <div className="mb-2">
                    {open ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
                </div>

                {/* Text horizontally centered below icon */}
                <div className="text-[15px] font-bold whitespace-nowrap rotate-90 origin-bottom me-6 mt-12">
                    UP TO ₹2000 OFF
                </div>
            </button>
        </div>
    );
};

export default SideOfferBanner;
