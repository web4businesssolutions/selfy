import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TypeAnimation } from 'react-type-animation';
import { API_BASE_URL } from '../constants';

const About = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/about/all`);
                setData(res.data.data[0]); // assuming only 1 document
            } catch (err) {
                console.error('Failed to load about data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (loading || !data) {
        return <div className="text-center py-10 text-pink-600 font-bold text-xl">Loading...</div>;
    }

    return (
        <div className="bg-gradient-to-br from-pink-50 via-white to-pink-100 text-gray-800 px-4 md:px-16 py-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 border-b-4 border-pink-500 pb-2 inline-block text-pink-600" data-aos="fade-down">
                    {data.heading}
                </h1>

                {/* Intro Section */}
                <div className="my-8 flex flex-col md:flex-row items-center gap-8" data-aos="fade-up">
                    <div className="flex-shrink-0 w-full md:w-1/2">
                        <img
                            src={`${API_BASE_URL}${data.image}`}
                            alt="About Selfy Snap"
                            className="w-full rounded-lg shadow-2xl hover:scale-105 transition duration-300"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-4 font-medium text-black">
                        <TypeAnimation
                            sequence={data.typewriterTexts.flatMap(text => [text, 2000])}
                            wrapper="p"
                            cursor={true}
                            repeat={Infinity}
                            className="text-lg text-pink-600 font-semibold"
                        />
                        {data.introParagraphs.map((para, i) => (
                            <p
                                key={i}
                                className="text-xl leading-relaxed transition duration-500 ease-in-out hover:scale-[1.01]"
                            >
                                {para}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Mission */}
                <section className="mb-10" data-aos="fade-right">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-2">💄 Our Mission</h2>
                    <p className="text-base leading-relaxed">{data.mission}</p>
                </section>

                {/* Vision */}
                <section className="mb-10" data-aos="fade-left">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-2">🎯 Our Vision</h2>
                    <p className="text-base leading-relaxed">{data.vision}</p>
                </section>

                {/* Features */}
                <section className="mb-10" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-2">🛍️ What Makes Us Different?</h2>
                    <ul className="list-disc ml-6 text-base leading-loose text-gray-700">
                        {data.features.map((item, i) => (
                            <li key={i}>✅ {item}</li>
                        ))}
                    </ul>
                </section>

                {/* Achievements */}
                <section className="mb-10" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-4">🌟 Our Achievements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {data.achievements.map((item, i) => (
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

                {/* Contact */}
                <div className="mt-12 text-center bg-white p-4 rounded-lg shadow" data-aos="fade-up">
                    <p className="text-pink-700 font-medium">
                        💬 For any questions or feedback, reach out to us at <strong>{data.contactEmail}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
