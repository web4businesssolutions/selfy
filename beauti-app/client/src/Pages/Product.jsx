import React from 'react';

const products = [
    {
        id: 1,
        title: '5-Piece Soft Makeup Brush Set',
        price: '599',
        image: 'images/image/makeup9.jpeg',
        rating: 5,
    },
    {
        id: 2,
        title: '24K Gold Beauty Bar Face Massager',
        price: '499',
        image: 'images/image/makeup10.jpeg',
        rating: 5,
    },
    {
        id: 3,
        title: 'Multiple Makeup brush',
        price: '500',
        image: 'images/image/makeup11.jpeg',
        rating: 4,
    },
    {
        id: 4,
        title: 'Velvet Powder Puff',
        price: '299',
        image: 'images/image/makeup12.jpeg',
        rating: 3,
    },
    {
        id: 5,
        title: 'Fruit Capsule Towels',
        price: '600',
        image: 'images/image/makeup13.jpeg',
        rating: 4,
    },
    {
        id: 6,
        title: 'Bullet Shape Travel Makeup Brush Set',
        price: '599',
        image: 'images/image/makeup14.jpeg',
        rating: 5,
    },
    {
        id: 7,
        title: ' flat top kabuki foundation brush',
        price: '499',
        image: 'images/image/makeup15.jpeg',
        rating: 5,
    },
    {
        id: 8,
        title: 'makeup mixing palette with spatula',
        price: '899',
        image: 'images/image/makeup16.jpeg',
        rating: 5,
    },
    {
        id: 9,
        title: 'Multi-Use Disposable ',
        price: '799',
        image: 'images/image/makeup17.jpeg',
        rating: 4,
    },
    {
        id: 10,
        title: 'Fruit-Themed Compressed Towel Tablets Travel Pack',
        price: '1200',
        image: 'images/image/makeup18.jpeg',
        rating: 3,
    },
    {
        id: 11,
        title: 'Fruit Scented Heart-Shaped Paper',
        price: '599',
        image: 'images/image/makeup19.jpeg',
        rating: 4,
    },
    {
        id: 12,
        title: 'Reusable Silicone Ear Plugs',
        price: '600',
        image: 'images/image/makeup21.jpeg',
        rating: 4,
    },
    {
        id: 13,
        title: 'Silicone Makeup Practice Eyeshadow Training Pad',
        price: '700',
        image: 'images/image/makeup22.jpeg',
        rating: 3,
    },
    {
        id: 14,
        title: '55mm Fast Flawless Foundation Makeup',
        price: '1000',
        image: 'images/image/makeup23.jpeg',
        rating: 5,
    },
    {
        id: 15,
        title: 'Eyelash Extension Mannequin Training Head',
        price: '400',
        image: 'images/image/mask.webp',
        rating: 4,
    },
    {
        id: 16,
        title: 'DermaSink Serum',
        price: '900',
        image: 'images/image/makeup25.jpeg',
        rating: 4,
    },
    {
        id: 17,
        title: 'For Mass Market: FlipRibbon Dual Applicator',
        price: '1200',
        image: 'images/image/makeup26.jpeg',
        rating: 3,
    },
    {
        id: 18,
        title: 'A-Bond® Pro Cyanoacrylate Gel',
        price: '900',
        image: 'images/image/makeup27.jpeg',
        rating: 4,
    },
    {
        id: 19,
        title: 'Zebronics Zeb-Fit4220CH',
        price: '1200',
        image: 'images/image/makeup28.jpeg',
        rating: 5,
    },
    {
        id: 20,
        title: 'boAt Xtend Smartwatch',
        price: '$65',
        image: 'images/image/makeup29.jpeg',
        rating: 4,
    },
];

const Product = () => {
    return (
        <div className="text-center text-black font-semibold underline underline-offset-4 text-2xl">
            Our Products




            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(({ id, title, price, image, rating }) => (
                    <div
                        key={id}
                        className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                    >
                        <a href="#">
                            <img className="p-4 rounded-t-lg" src={image} alt={title} />
                        </a>
                        <div className="px-4 pb-4">
                            <a href="#">
                                <h5 className="text-base font-medium tracking-tight text-gray-900 dark:text-white">
                                    {title}
                                </h5>
                            </a>
                            <div className="flex items-center mt-2.5 mb-3">
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'}`}
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M10.612 1.343l2.122 4.292 4.74.689-3.43 3.343.81 4.725-4.242-2.229-4.242 2.229.81-4.725-3.43-3.343 4.74-.689 2.122-4.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-sm ms-2">
                                    {rating}.0
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product
