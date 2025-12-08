import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Show ALL products for admin dashboard
      const res = await axios.get(`${API_BASE_URL}/api/productdetail/alldetails`);
      console.log('API response:', res.data);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err.response?.data || err.message);
      toast.error('Failed to fetch products: ' + (err.response?.data?.error || err.message));
      setProducts([]); // Ensure products is empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/productdetail/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Deleted successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/stepper-product/${id}`);
  };

  const columns = [
    {
      name: 'Image',
      cell: row =>
        row.image ? (
          <img src={row.image} alt="product" className="h-8 w-8 object-cover rounded" />
        ) : (
          'N/A'
        ),
      width: '90px'
    },
    { name: 'Name', selector: row => row.name || 'N/A', sortable: true, width: '300px' },
    { name: 'Brand', selector: row => row.brandName, sortable: true, width: '120px' },
    { name: 'Category', selector: row => row.category, sortable: true, width: '120px' },
    { name: 'Price', selector: row => `₹${row.price?.toLocaleString('en-IN')}`, sortable: true, width: '100px' },
    { name: 'Quantity', selector: row => row.quantity || 'N/A', width: '80px' },
    {
      name: 'Status',
      selector: row => row.quantity > 0 ? 'In Stock' : 'Out of Stock',
      width: '100px',
      cell: row => (
        <span className={row.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
          {row.quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      )
    },
    {
      name: 'Date',
      selector: row =>
        new Date(row.createdAt).toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      width: '120px',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-1">
          <button
            onClick={() => handleEdit(row._id)}
            className="text-blue-500 hover:text-blue-700 p-1"
            title="Edit"
          >
            <FaEdit size={14} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '90px'
    },
  ];

  const filteredItems = products.filter(
    item =>
      item.brandName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto my-8 p-4 border rounded shadow bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">Your Products</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by brand or category"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={() => {
            setLoading(true);
            fetchProducts();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : (
        <div className="overflow-auto max-h-[600px]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 mt-2">Try refreshing or add some products</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              highlightOnHover
              responsive
              striped
              dense
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
