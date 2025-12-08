import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Layout Components
import Header from './Component/Header';
import Footer from './Component/Footer';

// Public Pages
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Contact from './Pages/Contact';
import Makeup from './Pages/Makeup';
import Bath from './Pages/Bath';
import Treatement from './Pages/Treatement';
import MakeupTool from './Pages/MakeupTool';
import Register from './Pages/Register';
import Login from './Pages/Login';
import CategoryPage from './Pages/CategoryPages';
// Admin Layout & Pages
import AdminLayout from './admin/Main';
import ProductDetails from './Pages/ProductDetails';
import CartPage from './Pages/CartPage';
import Order from './Pages/Order';
import Invoice from './Pages/Invoice';
import TermCondition from './Pages/TermCondition';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ShippingPolicy from './Pages/ShippingPolicy';
import ReturnPolicy from './Pages/ReturnPolicy';

// PUBLIC LAYOUT WRAPPER
const PublicLayout = ({ children }) => {
  const location = useLocation();
  const hideLayoutRoutes = ["/register", "/login"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <div className="min-h-[80vh]">{children}</div>
      {!hideLayout && <Footer />}
    </>
  );
};

// PUBLIC ROUTES WRAPPER
const PublicRoutes = () => (
  <PublicLayout>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/blog" element={<Blog />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/makeup' element={<Makeup />} />
      <Route path='/bath' element={<Bath />} />
      <Route path='/term&condition' element={<TermCondition />} />
      <Route path='/privacypolicy' element={<PrivacyPolicy />} />
      <Route path='/returnpolicy' element={<ReturnPolicy />} />
      <Route path='/shippingpolicy' element={<ShippingPolicy />} />
      <Route path='/treatement' element={<Treatement />} />
      <Route path='/makeuptool' element={<MakeupTool />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/order' element={<Order />} />
      <Route path='/invoice/:orderId' element={<Invoice />} />
    </Routes>
  </PublicLayout>
);

// ADMIN ROUTES WITH SIDEBAR + HEADER
// const AdminRoutes = () => {
//   return (
//     <AdminLayout />
//   );
// };

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public pages */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Admin layout and nested pages handled by Main.jsx */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
