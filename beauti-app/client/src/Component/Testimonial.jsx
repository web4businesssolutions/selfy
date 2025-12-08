import React, { useState } from 'react';

const testimonials = [
    {
        quote: `Manpreet Singh is the visionary CEO behind [Selfy Snap], a leader in delivering innovative and high-quality beauty products that empower customers to feel confident and radiant. With a deep passion for skincare and cosmetics, Manpreet has driven the company’s mission to blend science and nature, creating products that cater to diverse beauty needs worldwide. Under his leadership, the brand has grown rapidly by prioritizing customer satisfaction, sustainability, and cutting-edge formulation. Manpreet believes in fostering a culture of creativity and excellence, inspiring his team to continuously innovate and elevate the beauty experience for every customer.`,
        author: 'Manpreet Singh',
        position: 'CEO ',
        image: 'images/logo/images.png',
    },
    {
        quote: `Manpreet Singh is a dedicated and dynamic manager at [Selfy snap], known for his exceptional leadership and commitment to driving team success. With a strong passion for the beauty industry, Manpreet plays a crucial role in ensuring smooth operations and delivering top-quality products that empower customers to feel confident and radiant. He fosters a collaborative and motivated work environment, encouraging innovation and excellence within his team. Manpreet’s focus on customer satisfaction and sustainable practices helps the company continuously evolve and meet diverse beauty needs worldwide.`,
        author: 'Manpreet Singh',
        position: ' Manager.',
        image: 'images/logo/images.png',
    },

];

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const { quote, author, position, image } = testimonials[currentIndex];

    return (
        <div className="testimonial-section py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">Testimonials</h2>
                </div>

                <div className="relative max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-md text-center">
                    <blockquote className="mb-6 text-gray-700 italic">
                        <p>&ldquo;{quote}&rdquo;</p>
                    </blockquote>

                    <div className="flex justify-center mb-4">
                        <img
                            src={image}
                            alt={author}
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                    </div>

                    <h3 className="text-lg font-semibold">{author}</h3>
                    <span className="text-sm text-gray-500">{position}</span>

                    {/* Navigation Arrows */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                        <button
                            onClick={prevSlide}
                            className="text-gray-600 hover:text-gray-900 px-4"
                        >
                            <i className="fa fa-chevron-left"></i>
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                        <button
                            onClick={nextSlide}
                            className="text-gray-600 hover:text-gray-900 px-4"
                        >
                            <i className="fa fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
