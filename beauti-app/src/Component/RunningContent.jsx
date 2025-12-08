import React from 'react';

const ScrollingOfferBanner = () => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white h-10 flex items-center">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div
        className="flex whitespace-nowrap font-bold text-sm"
        style={{
          animation: 'marquee 20s linear infinite',
          minWidth: '200%',
        }}
      >
        {/* duplicated content for looping */}
        <div className="flex">
          <span className="mx-8">🚨 LIMITED TIME OFFER – 50% OFF ON <u>EVERYTHING</u> 🚨</span>
          <span className="mx-8">🚨 LIMITED TIME OFFER – 50% OFF ON <u>EVERYTHING</u> 🚨</span>
          <span className="mx-8">🚨 LIMITED TIME OFFER – 50% OFF ON <u>EVERYTHING</u> 🚨</span>
        </div>
        <div className="flex">
          <span className="mx-8">🚨 LIMITED TIME OFFER – 50% OFF ON <u>EVERYTHING</u> 🚨</span>
          <span className="mx-8">🚨 LIMITED TIME OFFER – 50% OFF ON <u>EVERYTHING</u> 🚨</span>
          <span className="mx-8">🚨 LIMITED TIME OFFER – 50% OFF ON <u>EVERYTHING</u> 🚨</span>
        </div>
      </div>
    </div>
  );
};

export default ScrollingOfferBanner;
