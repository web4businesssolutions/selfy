import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
    { name: "Lakme", logo: "/images/brand/brand1.jpg" },
    { name: "L'Oreal", logo: "/images/brand/brand2.png" },
    { name: "Maybelline", logo: "/images/brand/brand3.jpg" },
    { name: "Nivea", logo: "/images/brand/brand4.png" },
    { name: "Dove", logo: "/images/brand/brand5.png" },
    { name: "Himalaya", logo: "/images/brand/brand6.png" },
    { name: "Mamaearth", logo: "/images/brand/brand7.jpg" },
    { name: "Garnier", logo: "/images/brand/brand8.png" },
    { name: "Ponds", logo: "/images/brand/brand9.png" },
];

const TopBrandsCarousel = () => {
    const settings = {
        infinite: true,
        speed: 4000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 5 } },
            { breakpoint: 768, settings: { slidesToShow: 4 } },
            { breakpoint: 480, settings: { slidesToShow: 3 } },
        ],
    };

    return (
        <div className="my-10 px-28 md:px-28 mt-16">
            <h2 className="text-2xl font-extrabold mb-10 text-center text-gray-800">
                <span className="inline-block border-b-4 border-blue-500 rounded pb-2 mb-10">
                    Top Brands
                </span>
            </h2>

            <Slider {...settings}>
                {brands.map((brand, index) => (
                    <div key={index} className="flex justify-center items-center px-4">
                        <div className="bg-white p-4 rounded-lg hover:shadow-md transition duration-300 w-28 h-28 flex items-center justify-center">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TopBrandsCarousel;
