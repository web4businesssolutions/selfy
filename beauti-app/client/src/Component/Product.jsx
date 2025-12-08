import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Product = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const products = [
        { img: 'images/category/category.jpg', name: 'Makeup Kits' },
        { img: 'images/category/category1.webp', name: 'Bathing Soaps' },
        { img: 'images/category/category2.jpg', name: 'Acne Treatment Devices' },
        { img: 'images/category/category4.webp', name: 'Makeup Tool & Accessories' },
        // { img: 'images/logo/spoonge.jpg', name: 'Makeup Sponge' },
        // { img: 'images/logo/nail.jpg', name: 'Nail Art Tool' },
        // { img: 'images/logo/wipes.png', name: 'Facial Wipes' },
    ];

    return (
        <div className="product-section py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Category</h2>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div key={index} className="px-0"> {/* Increased spacing from px-2 to px-4 */}
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-md"
                                />
                                <p className="text-sm font-medium text-center">{product.name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Product;
