import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    quote: "Selfy Snap's natural skincare range has changed my routine completely. I finally feel confident in my own skin!",
    author: "Aarohi Verma",
    position: "Customer from Mumbai",
    image: "/images/girl.png",
  },
  {
    quote: "I’ve tried dozens of products, but nothing matches the quality and results of Selfy Snap. Highly recommended!",
    author: "Ravi Sharma",
    position: "Customer from Delhi",
    image: "/images/boy.png",
  },
  {
    quote: "Their dedication to sustainability is what I love most. I feel good about what I’m putting on my skin.",
    author: "Meera Iyer",
    position: "Customer from Bengaluru",
    image: "/images/girl.png",
  },
  {
    quote: "Fast delivery, premium packaging, and amazing results. I gifted their combo to my sister — she loved it!",
    author: "Ankit Thakur",
    position: "Customer from Chandigarh",
    image: "/images/boy.png",
  },
  {
    quote: "Selfy Snap’s herbal products have a lovely texture and fragrance. They truly care about quality.",
    author: "Pooja Desai",
    position: "Customer from Ahmedabad",
    image: "/images/girl.png",
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <div className="slick-prev-custom">
        <ChevronLeft size={28} />
      </div>
    ),
    nextArrow: (
      <div className="slick-next-custom">
        <ChevronRight size={28} />
      </div>
    ),
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Static Banner */}
        <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/image/makeup3.jpeg"
            alt="testimonial banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Carousel */}
        <div>
          <h2 className="text-2xl font-extrabold mb-10 text-center text-gray-800">
                <span className="inline-block border-b-4 border-blue-500 rounded pb-2 mb-10">
                    What Our Client Says
                </span>
            </h2>

          <div className="slider-container" style={{ marginBottom: '40px' }}>
            {typeof window !== 'undefined' && (
              <Slider
                dots={settings.dots}
                infinite={settings.infinite}
                autoplay={settings.autoplay}
                autoplaySpeed={settings.autoplaySpeed}
                speed={settings.speed}
                slidesToShow={settings.slidesToShow}
                slidesToScroll={settings.slidesToScroll}
                arrows={settings.arrows}
                prevArrow={settings.prevArrow}
                nextArrow={settings.nextArrow}
              >
                {testimonials.map(({ quote, author, position, image }, index) => (
                  <div key={index} data-slide={index} className="bg-white shadow-lg p-6 rounded-lg">
                    <blockquote className="text-lg italic text-gray-700 mb-4 leading-relaxed font-serif">
                      "{quote}"
                    </blockquote>

                    <div className="flex items-center justify-center gap-4 mt-4">
                      <img
                        src={image}
                        alt={author}
                        className="w-14 h-14 rounded-full object-cover border-4 border-blue-200"
                      />
                      <div>
                        <h4 className="text-md font-semibold text-gray-900">{author}</h4>
                        <p className="text-sm text-gray-500">{position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>

      {/* Custom arrow styling */}
      <style>
        {`
          .slick-prev-custom, .slick-next-custom {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            border-radius: 50%;
            padding: 6px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            cursor: pointer;
            z-index: 10;
          }

          .slick-prev-custom {
            left: -30px;
          }

          .slick-next-custom {
            right: -30px;
          }

          .slick-dots li button:before {
            font-size: 12px;
            color: #999;
          }

          .slick-dots li.slick-active button:before {
            color: #2563eb;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonial;
