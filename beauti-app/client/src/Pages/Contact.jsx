import React from 'react';

const Contact = () => {
    return (
        <div className="bg-gradient-to-b from-pink-100 via-white to-pink-50 text-gray-800 px-4 md:px-16 py-14 animate-fade-in">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 border-b-4 border-pink-500 inline-block">Contact Us</h1>
                <p className="text-lg text-gray-600 mb-10">
                    We'd love to hear from you. Whether you’re a customer or vendor, feel free to get in touch with any questions, feedback, or partnership opportunities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <form className="space-y-6 bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-400 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-400 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message here..."
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-400 transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info + Map */}
                    <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
                        <div>
                            <h2 className="text-xl font-semibold mb-1 text-pink-600">Head Office</h2>
                            <p className="text-gray-600">
                                Glow & Glamour Cosmetics<br />
                                22-Block, 3rd Floor, Beauty Mall, Mumbai, India
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-1 text-pink-600">Email</h2>
                            <p className="text-pink-500 font-medium">support@glowglamour.com</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-1 text-pink-600">Phone</h2>
                            <p className="text-gray-600">+91 98765 43210</p>
                        </div>

                        <div className="rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                            <iframe
                                title="Google Map"
                                className="w-full h-64 border-2 border-pink-100"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609943085!2d72.74109911088553!3d19.08219783931801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b2c91775d1%3A0x7cb674c11e1e05b3!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689238108306!5m2!1sen!2sin"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
