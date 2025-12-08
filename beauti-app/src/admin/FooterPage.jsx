import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../constants';

const AdminFooter = () => {
  const [footer, setFooter] = useState(null);
  const [formData, setFormData] = useState({
    socialLinks: [],
    contact: {},
    newsletter: {},
    quickLinks: [],
    bottomLinks: [],
  });
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/footer/all`).then(res => {
      setFooter(res.data);
      setFormData(res.data || {});
    });
  }, []);

  const handleChange = (e, section, index, subIndex) => {
    const { name, value } = e.target;

    if (section === "socialLinks" || section === "bottomLinks") {
      const updated = [...formData[section]];
      updated[index][name] = value;
      setFormData(prev => ({ ...prev, [section]: updated }));
    } else if (section === "quickLinks") {
      const updated = [...formData.quickLinks];
      if (subIndex !== undefined) {
        updated[index].links[subIndex][name] = value;
      } else {
        updated[index][name] = value;
      }
      setFormData(prev => ({ ...prev, quickLinks: updated }));
    } else if (section === "contact" || section === "newsletter") {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = (section, index) => {
    if (section === "socialLinks") {
      setFormData(prev => ({
        ...prev,
        socialLinks: [...(prev.socialLinks || []), { platform: "", iconClass: "", url: "" }]
      }));
    } else if (section === "bottomLinks") {
      setFormData(prev => ({
        ...prev,
        bottomLinks: [...(prev.bottomLinks || []), { label: "", path: "" }]
      }));
    } else if (section === "quickLinks") {
      setFormData(prev => ({
        ...prev,
        quickLinks: [...(prev.quickLinks || []), { section: "", links: [{ label: "", path: "" }] }]
      }));
    } else if (section === "quickLinksLinks") {
      const updated = [...formData.quickLinks];
      updated[index].links.push({ label: "", path: "" });
      setFormData(prev => ({ ...prev, quickLinks: updated }));
    }
  };

  const handleRemove = (section, index, subIndex) => {
    if (section === "quickLinksLinks") {
      const updated = [...formData.quickLinks];
      updated[index].links.splice(subIndex, 1);
      setFormData(prev => ({ ...prev, quickLinks: updated }));
    } else {
      const updated = [...formData[section]];
      updated.splice(index, 1);
      setFormData(prev => ({ ...prev, [section]: updated }));
    }
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("data", JSON.stringify(formData));
    if (logo) form.append("logo", logo);

    if (footer?._id) {
      await axios.put(`${API_BASE_URL}/api/footer/update/${footer._id}`, form);
    } else {
      await axios.post(`${API_BASE_URL}/api/footer/add`, form);
    }

    alert("Saved Successfully");
    window.location.reload();
  };

  const handleDelete = async () => {
    if (footer?._id) {
      await axios.delete(`/api/footer/delete/${footer._id}`);
      setFooter(null);
      setFormData({});
    }
  };

  const inputStyle = "w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:ring-blue-300 mb-3";

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Footer</h2>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Logo:</label>
        <input type="file" onChange={handleLogoChange} className="mb-2" />
        {footer?.logoUrl && <img src={footer.logoUrl} className="w-24 mt-2 rounded shadow" />}
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Description:</label>
        <textarea name="description" value={formData.description || ""} onChange={handleChange} className={inputStyle} rows={3} />
      </div>

      <hr className="my-6 border-t-2" />
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Social Links</h3>
      {formData.socialLinks?.map((item, idx) => (
        <div key={idx} className="grid grid-cols-3 gap-3 items-center mb-2">
          <input name="platform" value={item.platform} onChange={e => handleChange(e, "socialLinks", idx)} placeholder="Platform" className={inputStyle} />
          <input name="iconClass" value={item.iconClass} onChange={e => handleChange(e, "socialLinks", idx)} placeholder="Icon Class" className={inputStyle} />
          <input name="url" value={item.url} onChange={e => handleChange(e, "socialLinks", idx)} placeholder="URL" className={inputStyle} />
          <button onClick={() => handleRemove("socialLinks", idx)} className="text-red-500 text-sm mt-1">Remove</button>
        </div>
      ))}
      <button onClick={() => handleAdd("socialLinks")} className="text-blue-600 text-sm font-medium mb-4">+ Add Social Link</button>

      <hr className="my-6 border-t-2" />
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Contact Information</h3>
      {["address", "phone", "email"].map(field => (
        <input key={field} name={field} value={formData.contact?.[field] || ""} onChange={e => handleChange(e, "contact")} placeholder={field} className={inputStyle} />
      ))}

      <hr className="my-6 border-t-2" />
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Newsletter Section</h3>
      {["title", "placeholderName", "placeholderEmail", "buttonText"].map(field => (
        <input key={field} name={field} value={formData.newsletter?.[field] || ""} onChange={e => handleChange(e, "newsletter")} placeholder={field} className={inputStyle} />
      ))}

      <hr className="my-6 border-t-2" />
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Quick Links</h3>
      {formData.quickLinks?.map((q, i) => (
        <div key={i} className="border rounded p-4 mb-4">
          <input name="section" value={q.section} onChange={e => handleChange(e, "quickLinks", i)} placeholder="Section Title" className={inputStyle} />
          {q.links?.map((link, j) => (
            <div key={j} className="grid grid-cols-2 gap-3 items-center">
              <input name="label" value={link.label} onChange={e => handleChange(e, "quickLinks", i, j)} placeholder="Label" className={inputStyle} />
              <input name="path" value={link.path} onChange={e => handleChange(e, "quickLinks", i, j)} placeholder="Path" className={inputStyle} />
              <button onClick={() => handleRemove("quickLinksLinks", i, j)} className="text-red-500 text-sm mt-1">Remove</button>
            </div>
          ))}
          <button onClick={() => handleAdd("quickLinksLinks", i)} className="text-blue-600 text-sm mt-2">+ Add Link</button>
        </div>
      ))}
      <button onClick={() => handleAdd("quickLinks")} className="text-blue-600 text-sm font-medium mb-4">+ Add Quick Link Section</button>

      <hr className="my-6 border-t-2" />
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Bottom Links</h3>
      {formData.bottomLinks?.map((item, idx) => (
        <div key={idx} className="grid grid-cols-2 gap-3 items-center mb-2">
          <input name="label" value={item.label} onChange={e => handleChange(e, "bottomLinks", idx)} placeholder="Label" className={inputStyle} />
          <input name="path" value={item.path} onChange={e => handleChange(e, "bottomLinks", idx)} placeholder="Path" className={inputStyle} />
          <button onClick={() => handleRemove("bottomLinks", idx)} className="text-red-500 text-sm mt-1">Remove</button>
        </div>
      ))}
      <button onClick={() => handleAdd("bottomLinks")} className="text-blue-600 text-sm font-medium mb-4">+ Add Bottom Link</button>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Copyright:</label>
        <input name="copyrightText" value={formData?.copyrightText || ""} onChange={handleChange} className={inputStyle} />
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">{footer ? "Update" : "Create"}</button>
        {footer && (
          <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Delete</button>
        )}
      </div>
    </div>
  );
};

export default AdminFooter;
