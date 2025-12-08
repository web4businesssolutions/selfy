// src/pages/Home.jsx
import React from 'react';
import Hero from '../Component/Hero';
import Product from '../Component/Product';
// import Products from '../Component/Products';
// import OurProduct from '../Component/OurProduct';
import Choose from '../Component/Choose';
// import HelpSection from '../Component/HelpSection';
import Testimonial from '../Component/Testimonial';
import Blog from '../Component/Blog';
import CategoryList from '../Component/CategoryList';
import LatestProduct from '../Component/LatestProduct';
import BestSellingProduct from '../Component/BestSellingProduct';
import Brand from '../Component/Brand';
import StoreHighlight from '../Component/StoreHighlight';
import RunningContent from '../Component/RunningContent';
import SideOffer from '../Component/SideOffer';

const Home = () => {
    return (
        <>
            <CategoryList />
            <Hero />
            <Product />
            <LatestProduct />
            {/* <Products /> */}
            {/* <OurProduct /> */}
            <Choose />
            <RunningContent />
            <SideOffer />
            <BestSellingProduct />
            <Brand />
            <StoreHighlight />
            <Testimonial />
            <Blog />
        </>
    );
};

export default Home;
