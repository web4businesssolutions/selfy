import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../constants';

const UpdateProductForm = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    category: '', image: '', brandName: '',
    name: '',
    description: '', bulletPoints: '', images: [],
    manufacturer: '', ageRange: '', numberOfItems: '', itemTypeName: '', color: '', partNumber: '', manufacturerContact: '',
    isSensitive: false, isExpirable: false, unitCount: '', unitType: '',
    width: '', height: '', length: '', weight: '',
    quantity: '', price: '', maxPrice: '', retailPrice: '', itemCondition: '',
    complianceInfo: ''
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewGallery, setPreviewGallery] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/productdetail/singledetail/${id}`);
        const product = res.data.product;
        setForm({
          ...product,
          seller: undefined, // ❌ prevent seller from being sent
          bulletPoints: product.bulletPoints?.join(',') || '',
          image: '',
          images: [],
        });
        setPreviewImage(`${product.image}`);
        setPreviewGallery(product.images.map(img => `${img}`));
      } catch (err) {
        toast.error('Failed to load product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      if (name === 'image') {
        setForm(prev => ({ ...prev, [name]: files[0] }));
        setPreviewImage(URL.createObjectURL(files[0]));
      } else if (name === 'images') {
        const fileList = [...files];
        setForm(prev => ({ ...prev, [name]: fileList }));
        const previews = fileList.map(file => URL.createObjectURL(file));
        setPreviewGallery(previews);
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return toast.error('User not authenticated');

      const formData = new FormData();

      // Append all form fields
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'seller') return; // ❌ prevent updating seller

        if (Array.isArray(value) && key === 'images') {
          value.forEach(file => formData.append('images', file));
        } else if (key === 'image' && value) {
          formData.append('image', value);
        } else {
          formData.append(key, value);
        }
      });

      await axios.put(`${API_BASE_URL}/api/productdetail/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Product updated successfully!');
    } catch (err) {
      const message = err?.response?.data?.error || err.message;
      toast.error('Update failed: ' + message);
      console.error('Update error:', message);
    }
  };

  const renderInput = (label, name, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const renderTextarea = (label, name) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const renderCheckbox = (label, name) => (
    <label className="flex items-center gap-2 mb-2">
      <input type="checkbox" name={name} checked={form[name]} onChange={handleChange} /> {label}
    </label>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-8">Update Product - Step {step}/5</h2>

      <div className="flex items-center justify-between mb-10">
        {['Category', 'Description', 'Details', 'Offer', 'Compliance'].map((label, index) => (
          <div key={index + 1} className="flex-1 flex flex-col items-center relative">
            <div className={`rounded-full w-10 h-10 flex items-center justify-center border-2 text-sm font-medium ${
              step === index + 1
                ? 'bg-blue-500 text-white border-blue-500'
                : step > index + 1
                ? 'bg-green-500 text-white border-green-500'
                : 'text-gray-400 border-gray-300'
            }`}>
              {index + 1}
            </div>
            <span className="text-sm mt-2 text-center text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {step === 1 && (
          <>
            {renderInput('Category', 'category')}
            {renderInput('Brand Name', 'brandName')}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
              <input type="file" name="image" onChange={handleChange} className="w-full" />
              {previewImage && <img src={previewImage} alt="Preview" className="h-24 mt-2 rounded" />}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {renderInput('Product Name', 'name')}
            {renderTextarea('Description', 'description')}
            {renderTextarea('Bullet Points (comma separated)', 'bulletPoints')}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
              <input type="file" name="images" onChange={handleChange} multiple className="w-full" />
              <div className="flex flex-wrap gap-2 mt-2">
                {previewGallery.map((src, i) => (
                  <img key={i} src={src} alt="Gallery Preview" className="h-20 rounded" />
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {renderInput('Manufacturer', 'manufacturer')}
            {renderInput('Age Range', 'ageRange')}
            {renderInput('Number of Items', 'numberOfItems', 'number')}
            {renderInput('Item Type Name', 'itemTypeName')}
            {renderInput('Color', 'color')}
            {renderInput('Part Number', 'partNumber')}
            {renderInput('Manufacturer Contact', 'manufacturerContact')}
            {renderCheckbox('Sensitive Product?', 'isSensitive')}
            {renderCheckbox('Expirable?', 'isExpirable')}
            {renderInput('Unit Count', 'unitCount', 'number')}
            {renderInput('Type of Unit', 'unitType')}
            <div className="grid grid-cols-2 gap-4">
              {renderInput('Width', 'width', 'number')}
              {renderInput('Height', 'height', 'number')}
              {renderInput('Length', 'length', 'number')}
              {renderInput('Weight', 'weight', 'number')}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            {renderInput('Quantity', 'quantity', 'number')}
            {renderInput('Your Price', 'price', 'number')}
            {renderInput('Maximum Price', 'maxPrice', 'number')}
            {renderInput('Retail Price', 'retailPrice', 'number')}
            {renderInput('Item Condition', 'itemCondition')}
          </>
        )}

        {step === 5 && (
          <>
            {renderTextarea('Safety & Compliance Info', 'complianceInfo')}
          </>
        )}
      </div>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="btn bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded">
            Back
          </button>
        )}
        {step < 5 ? (
          <button onClick={() => setStep(step + 1)} className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded">
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateProductForm;
