import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const About = () => {
    return (
        <div className="bg-gradient-to-br from-pink-50 via-white to-pink-100 text-gray-800 px-4 md:px-16 py-12">
            <div className="max-w-5xl mx-auto">
                <h1
                    className="text-4xl font-bold mb-6 border-b-4 border-pink-500 pb-2 inline-block text-pink-600"
                    data-aos="fade-down"
                >
                    About Us
                </h1>

                {/* Intro Section with Image and Typing Text */}
                <div className="my-8 flex flex-col md:flex-row items-center gap-8" data-aos="fade-up">
                    <div className="flex-shrink-0 w-full md:w-1/2">
                        <img
                            src="images/image/makeup6.jpeg"
                            alt="About Selfy Snap"
                            className="w-full rounded-lg shadow-2xl hover:scale-105 transition duration-300"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-4 font-medium text-black">
                        <TypeAnimation
                            sequence={[
                                "Welcome to Selfy Snap — your ultimate destination for trendsetting beauty.",
                                2000,
                                "Skincare, makeup, haircare — all in one seamless platform.",
                                2000,
                                "Celebrate confidence, creativity, and empowerment.",
                                2000,
                            ]}
                            wrapper="p"
                            cursor={true}
                            repeat={Infinity}
                            className="text-lg text-pink-600 font-semibold"
                        />

                        <p className="text-xl leading-relaxed transition duration-500 ease-in-out hover:scale-[1.01]">
                            At Selfy Snap, we believe cosmetics are more than just products — they’re a powerful form of self-expression, confidence, and artistry. Our platform bridges the gap between beauty creators and conscious consumers by delivering a seamless and personalized shopping experience, rooted in authenticity, innovation, and trust.
                        </p>
                        <p className="text-xl leading-relaxed transition duration-500 ease-in-out hover:scale-[1.01] mt-4">
                            From luxury essentials to everyday must-haves, explore thousands of curated beauty products from top-rated sellers — all in one beautifully designed marketplace. Because at Selfy Snap, we don't just sell beauty — we celebrate it.
                        </p>

                    </div>
                </div>

                {/* Section: Mission */}
                <section className="mb-10" data-aos="fade-right">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-2">💄 Our Mission</h2>
                    <p className="text-base leading-relaxed">
                        Empowering every individual to express themselves through beauty. We connect high-quality vendors from around the globe with customers who value innovation, authenticity, and trust.
                    </p>
                </section>

                {/* Section: Vision */}
                <section className="mb-10" data-aos="fade-left">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-2">🎯 Our Vision</h2>
                    <p className="text-base leading-relaxed">
                        To become the most trusted beauty marketplace in the world by offering a seamless shopping experience, genuine products, and excellent customer service.
                    </p>
                </section>

                {/* Section: What Makes Us Different */}
                <section className="mb-10" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-2">🛍️ What Makes Us Different?</h2>
                    <ul className="list-disc ml-6 text-base leading-loose text-gray-700">
                        <li>✅ Verified Sellers with 100% Genuine Products</li>
                        <li>🧴 Wide Range of Makeup, Skincare, Haircare & Tools</li>
                        <li>💎 Exclusive Beauty Brands You Won’t Find Anywhere Else</li>
                        <li>🌟 Customer Reviews and Honest Ratings</li>
                        <li>🚚 Easy Returns, Fast Delivery, & 24x7 Support</li>
                    </ul>
                </section>

                {/* Section: Achievements */}
                <section className="mb-10" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-4">🌟 Our Achievements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { label: "Happy Customers", value: "1000K+" },
                            { label: "Verified Sellers", value: "5000+" },
                            { label: "Popular Brands", value: "50000+" },
                            { label: "Average Rating", value: "4.8/5" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-xl transition-all"
                                data-aos="zoom-in"
                            >
                                <h3 className="text-3xl font-bold text-pink-600">{item.value}</h3>
                                <p className="text-sm text-gray-700">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: Join Community */}
                <section className="mb-10" data-aos="fade-right">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-2">🤝 Join Our Community</h2>
                    <p className="text-base leading-relaxed">
                        Whether you're a makeup artist, skincare lover, or just discovering the power of self-care — <strong className="text-pink-600">Selfy Snap</strong> welcomes you. Create your account, explore the finest beauty products, and experience eCommerce redefined with elegance.
                    </p>
                </section>

                {/* Contact */}
                <div className="mt-12 text-center bg-white p-4 rounded-lg shadow" data-aos="fade-up">
                    <p className="text-pink-700 font-medium">
                        💬 For any questions or feedback, reach out to us at <strong>support@SelfySnap.com</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
