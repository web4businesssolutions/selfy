import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Contact from './Pages/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Makeup from './Pages/Makeup';
import Bath from './Pages/Bath';
import Treatement from './Pages/Treatement'
import MakeupTool from './Pages/MakeupTool';


const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <Router>
      <Header />
      <div className='mt-6'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/blog" element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/makeup' element={<Makeup />} />
          <Route path='/bath' element={<Bath />} />
          <Route path='/treatement' element={<Treatement />} />
          <Route path='/makeuptool' element={<MakeupTool />} />
        </Routes>
      </div>
      <div className='mt-6'>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
