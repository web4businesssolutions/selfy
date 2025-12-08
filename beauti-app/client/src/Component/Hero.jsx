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
        arrows: false,
        pauseOnHover: false,
        cssEase: "linear",
    };

    return (
        <div className="w-full overflow-hidden mb-8">
            {renderSlider && (
                <Slider {...settings}>
                    <div>
                        <img
                            src="images/logo/banner.png"
                            alt="Banner 1"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            src="images/logo/Selfy Snap best product.mp4"
                        >
                            Sorry, your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            src="images/logo/Selfy Snap best products.mp4"
                        >
                            Sorry, your browser does not support the video tag.
                        </video>
                    </div>
                </Slider>
            )}
        </div>
    );
};

export default Hero;
