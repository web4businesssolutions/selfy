import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../constants';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            console.log('=== Debug Info ===');
            const role = localStorage.getItem('role');
            const user = localStorage.getItem('user');
            console.log('User role:', role);
            console.log('User data:', user);
            console.log('Token present:', !!token);

            try {
                let endpoint;
                if (role === 'admin') {
                    endpoint = '/api/orders/admin'; // Admin: show ALL orders
                    console.log('Using admin endpoint: ALL orders');
                } else {
                    endpoint = '/api/orders/seller'; // Seller: show seller's orders
                    console.log('Using seller endpoint: seller orders');
                }

                console.log('API URL:', `${API_BASE_URL}${endpoint}`);

                const res = await axios.get(`${API_BASE_URL}${endpoint}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('✓ Orders API response received:', res.data);
                console.log('Number of orders:', res.data.length);

                setOrders(res.data);
                setFilteredOrders(res.data);
            } catch (err) {
                console.error('✗ Error fetching orders:', {
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data,
                    message: err.message
                });

                // Try alternative endpoint if admin endpoint fails
                if (role === 'admin' && err.response?.status === 403) {
                    console.log('Trying alternative seller endpoint...');
                    try {
                        const altRes = await axios.get(`${API_BASE_URL}/api/orders/seller`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        console.log('Alternative seller response:', altRes.data);
                        setOrders(altRes.data);
                        setFilteredOrders(altRes.data);
                        toast.warning('Admin endpoint failed, showing seller orders instead');
                        return;
                    } catch (altErr) {
                        console.error('Alternative endpoint also failed');
                    }
                }

                toast.error(err.response?.data?.error || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    // 🔍 Search filter
    useEffect(() => {
        if (!search) {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order =>
                order.items.some(item =>
                    item.product?.name?.toLowerCase().includes(search.toLowerCase())
                )
            );
            setFilteredOrders(filtered);
        }
    }, [search, orders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_BASE_URL}/api/orders/admin/update/${orderId}`, {
                status: newStatus,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Order status updated");

            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to update status');
        }
    };

    // 🧱 Table Columns
    const columns = [
        {
            name: 'Order ID',
            selector: row => row._id,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Product',
            cell: row => (
                <div className="flex items-center gap-2">
                    {row.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-1">
                            <img
                                src={`${API_BASE_URL}${item.product.images[0]}`}
                                alt={item.product.name}
                                className="w-10 h-10 object-cover rounded"
                            />
                            <span>{item.product.name}</span>
                        </div>
                    ))}
                </div>
            ),
            grow: 2,
        },
        {
            name: 'Total Amount',
            cell: row => {
                const total = row.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
                return `₹${total.toFixed(2)}`;
            },
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            ),
        },
        {
            name: 'Placed On',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Orders Management</h2>

            <input
                type="text"
                placeholder="Search by product name"
                className="border p-2 rounded mb-4 w-full md:w-1/3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <DataTable
                columns={columns}
                data={filteredOrders}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                responsive
                defaultSortFieldId={1}
                noDataComponent={<div className="text-center py-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
                    <p className="text-gray-500">There are currently no orders to display.</p>
                    <p className="text-gray-400 text-sm mt-2">Orders will appear here once customers place them.</p>
                </div>}
            />
        </div>
    );
};

export default Order;
