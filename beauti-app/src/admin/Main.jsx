import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import Product from './Product';
import User from './User';
import Order from './Order';
import Category from './Category';
import StepperForm from './StepperProduct';
import UpdateStepperForm from './UpdateStepperProduct';
import UserPage from './UserPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import TermPage from './TermPage';
import PrivacyPage from './PrivacyPage';
import ReturnPage from './ReturnPage';
import ShippingPage from './ShippingPage';
import FooterPage from './FooterPage';

const Main = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <Header />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path='category' element={<Category />} />
                        <Route path="product" element={<Product />} />
                        <Route path="user" element={<User />} />
                        <Route path="order" element={<Order />} />
                        <Route path="vendor" element={<UserPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="term" element={<TermPage />} />
                        <Route path="privacy" element={<PrivacyPage />} />
                        <Route path="return" element={<ReturnPage />} />
                        <Route path="shipping" element={<ShippingPage />} />
                        <Route path="footer" element={<FooterPage />} />
                        <Route path="stepper-product" element={<StepperForm />} />
                        <Route path="stepper-product/:id" element={<UpdateStepperForm />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Main;
