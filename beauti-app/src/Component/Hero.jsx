import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Hero = () => {
    const [renderSlider, setRenderSlider] = useState(false);

    useEffect(() => {
        setRenderSlider(true);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, // Always true — we’ll show/hide using CSS
        pauseOnHover: false,
        cssEase: 'linear',
    };

    return (
        <div className="relative group w-full overflow-hidden mb-4">
            {renderSlider && (
                <Slider {...settings}>
                    <div className="h-[550px]">
                        <img
                            src="images/logo/banner.png"
                            alt="Banner"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="h-[550px]">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            src="images/logo/Selfy Snap best product.mp4"
                        />
                    </div>
                    <div className="h-[550px]">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            src="images/logo/Selfy Snap best products.mp4"
                        />
                    </div>
                </Slider>
            )}

            {/* Style overrides for slick arrows */}
            <style>
                {`
                .slick-prev, .slick-next {
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 10;
                    width: 80px;
                    height: 80px;
                }

                .group:hover .slick-prev,
                .group:hover .slick-next {
                    opacity: 1;
                }

                .slick-prev {
                    left: 30px !important;
                }

                .slick-next {
                    right: 30px !important;
                }

                .slick-prev:before, .slick-next:before {
                    color: #000;
                    font-size: 60px;
                }

                .slick-dots {
                    bottom: 10px;
                }
                `}
            </style>
        </div>
    );
};

export default Hero;
