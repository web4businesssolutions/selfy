import React from 'react';
import { ShieldCheck, RefreshCcw, Truck, Users } from 'lucide-react';

const StoreHighlights = () => {
  const features = [
    {
      title: 'Trusted Selfy Snap Company',
      icon: <ShieldCheck size={32} className="text-blue-600" />,
    },
    {
      title: '10 Days Refund Policy',
      icon: <RefreshCcw size={32} className="text-blue-600" />,
    },
    {
      title: 'Fast and Free Delivery',
      icon: <Truck size={32} className="text-blue-600" />,
    },
    {
      title: '24/7 Customer Support',
      icon: <Users size={32} className="text-blue-600" />,
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-12 rounded-xl shadow-inner my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow hover:shadow-md transition-all text-center p-6 flex flex-col items-center"
          >
            <div className="mb-3">{feature.icon}</div>
            <h4 className="font-bold text-sm sm:text-base text-gray-800">{feature.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreHighlights;
