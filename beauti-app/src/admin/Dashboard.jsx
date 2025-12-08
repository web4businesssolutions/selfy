// import React from 'react'

// const Dashboard = () => {
//     return (
//         <div>
//             <div className="p-4">Welcome to the Admin Dashboard!</div>
//         </div>
//     )
// }

// export default Dashboard


import React from 'react';
import {
    FiBox,
    FiShoppingCart,
    FiDollarSign,
    FiPackage,
    FiTrendingUp
} from 'react-icons/fi';

const Dashboard = () => {
    const dummyStats = {
        products: 24,
        orders: 89,
        revenue: 54600,
    };

    const recentOrders = [
        {
            id: 'ORD123456',
            product: 'Beauty Face Serum',
            qty: 2,
            total: 1200,
            status: 'Delivered',
        },
        {
            id: 'ORD123457',
            product: 'Organic Lip Balm',
            qty: 1,
            total: 300,
            status: 'Processing',
        },
        {
            id: 'ORD123458',
            product: 'Vitamin C Cream',
            qty: 3,
            total: 2100,
            status: 'Shipped',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">👋 Welcome, Seller!</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4 hover:shadow-md transition">
                    <FiBox className="text-3xl text-indigo-600" />
                    <div>
                        <p className="text-sm text-gray-500">Total Products</p>
                        <p className="text-xl font-bold">{dummyStats.products}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4 hover:shadow-md transition">
                    <FiShoppingCart className="text-3xl text-rose-600" />
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-xl font-bold">{dummyStats.orders}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4 hover:shadow-md transition">
                    <FiDollarSign className="text-3xl text-green-600" />
                    <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-xl font-bold">₹{dummyStats.revenue}</p>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
                    <FiPackage /> Recent Orders
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Product</th>
                                <th className="px-4 py-2">Qty</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{order.id}</td>
                                    <td className="px-4 py-2">{order.product}</td>
                                    <td className="px-4 py-2">{order.qty}</td>
                                    <td className="px-4 py-2">₹{order.total}</td>
                                    <td className="px-4 py-2 text-rose-600 font-medium">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
