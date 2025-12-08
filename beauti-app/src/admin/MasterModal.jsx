import React, { useState } from 'react';

const ModalTest = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded"
            >
                Open Modal
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">This is a Modal</h2>
                        <p className="mb-4">Modal content goes here.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalTest;
