import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { API_BASE_URL } from '../constants';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sellers = Array.isArray(res.data)
        ? res.data.filter(user => user.role === 'seller')
        : [];
      setUsers(sellers);
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/users/status/${id}`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || 'Status updated');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this user?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Role', selector: row => row.role, sortable: true },
    {
      name: 'Status',
      cell: row => (
        <button
          onClick={() => handleToggleStatus(row._id, row.isActive)}
          className={`px-2 py-1 rounded text-sm font-medium ${
            row.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {row.isActive ? 'Approved' : 'Declined'}
        </button>
      ),
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row =>
        new Date(row.createdAt).toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-3 text-lg">
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-600 hover:text-red-800"
            title="Delete User"
          >
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredUsers = users.filter(
    user =>
      user.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto my-8 p-4 border rounded shadow bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">All Sellers</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 p-2 w-full border rounded"
      />

      <div className="overflow-auto max-h-[600px]">
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
          striped
          dense
          responsive
        />
      </div>
    </div>
  );
};

export default User;
