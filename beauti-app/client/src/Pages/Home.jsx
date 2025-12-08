// src/pages/Home.jsx
import React from 'react';
import Hero from '../Component/Hero';
import Product from '../Component/Product';
import Products from '../Component/Products';
import OurProduct from '../Component/OurProduct';
import Choose from '../Component/Choose';
import HelpSection from '../Component/HelpSection';
import Testimonial from '../Component/Testimonial';
import Blog from '../Component/Blog';

const Home = () => {
    return (
        <>
            <Hero />
            <Product />
            <Products />
            <OurProduct />
            <Choose />
            <div className='mt-6'>
                <HelpSection />
            </div>
            <Testimonial />
            <Blog />
        </>
    );
};

export default Home;
