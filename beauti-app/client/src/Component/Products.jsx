import React from 'react';

const products = [
    {
        id: 1,
        title: 'Moisturised Skin Oil Best',
        price: 500,
        image: 'images/image/image.jpeg',
        rating: 5,
    },
    {
        id: 2,
        title: 'Makeup Practice Eye Pad',
        price: 450,
        image: 'images/image/makeup3.jpeg',
        rating: 4,
    },
    {
        id: 3,
        title: 'Realistic Eye Makeup Practice Pad',
        price: 229,
        image: 'images/image/mackup.jpeg',
        rating: 4,
    },
    {
        id: 4,
        title: 'Polka Dot Shower Cap',
        price: 299,
        image: 'images/image/makup2.jpeg',
        rating: 3,
    },
    {
        id: 5,
        title: 'Stainless Steel Makeup Mixing Palette with Spatula',
        price: 490,
        image: 'images/image/makup5.jpeg',
        rating: 4,
    },
    {
        id: 6,
        title: 'Fire-Boltt Ninja Call Pro Plus',
        price: 599,
        image: 'images/image/makeup6.jpeg',
        rating: 4,
    },
    {
        id: 7,
        title: '24K Gold Face Massager Beauty Bar',
        price: 490,
        image: 'images/image/makeup7.jpeg',
        rating: 3,
    },
    {
        id: 8,
        title: 'Nail Glue for Acrylic and Press-On Nails',
        price: 600,
        image: 'images/image/mekup8.jpeg',
        rating: 5,
    },
];

const Products = () => {
    return (
        <div>
            <h2 className="text-center text-black underline font-semibold text-2xl mb-4">New Arrivals</h2>
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
                                            className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M10.984 1.306l2.15 4.355 4.797.693-3.474 3.385.82 4.776-4.293-2.257-4.292 2.257.82-4.776-3.474-3.385 4.797-.693 2.149-4.355z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-sm ms-2">
                                    {rating}.0
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    ₹{new Intl.NumberFormat('en-IN').format(price)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
