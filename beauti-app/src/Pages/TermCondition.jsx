import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

const TermsDisplay = () => {
    const [terms, setTerms] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/terms/all`)
            .then(res => setTerms(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-8 shadow-md rounded-b-lg">
                <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
                <p className="text-sm text-white opacity-80">Last modified: Dec 12, 2020</p>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-lg shadow-md my-6">
                <p className="mb-6 text-gray-700 leading-relaxed text-center text-2xl">
                    Welcome to <span className="font-semibold text-pink-800">Selfy Snap</span>!
                </p>

                {terms.map((term, index) => (
                    <div key={term._id} className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            {index + 1}. {term.heading}
                        </h4>
                        <p className="text-gray-700 text-base leading-relaxed mb-2">
                            {term.content}
                        </p>

                        {/* Show bullet points if available */}
                        {term.bulletPoints && term.bulletPoints.length > 0 && (
                            <ul className="list-disc list-inside text-gray-700 ml-4">
                                {term.bulletPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TermsDisplay;
