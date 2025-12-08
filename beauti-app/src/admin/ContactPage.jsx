import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from '../constants';

const AdminContactForm = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    headOffice: "",
    email: "",
    phone: "",
  });

  const [contactId, setContactId] = useState(null);
  const [activeField, setActiveField] = useState("");
  const [modalValue, setModalValue] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/contact/get`);
        if (res.data.data) {
          setFormData(res.data.data);
          setContactId(res.data.data._id);
        }
      } catch (err) {
        toast.error("Failed to fetch contact data");
      }
    };
    fetchContact();
  }, []);

  const openModal = (field) => {
    setActiveField(field);
    setModalValue(formData[field]);
    new window.bootstrap.Modal(document.getElementById("editModal")).show();
  };

  const handleUpdate = async () => {
    if (!contactId) return toast.error("No contact found");
    try {
      await axios.put(`${API_BASE_URL}/api/contact/update/${contactId}`, {
        [activeField]: modalValue,
      });
      toast.success(`${activeField} updated`);
      setFormData({ ...formData, [activeField]: modalValue });
      document.querySelector(".btn-close").click();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="card shadow p-4">
        <h3 className="mb-4 border-bottom pb-2">🛠️ Manage Contact Info</h3>
        {["heading", "description", "headOffice", "email", "phone"].map((field) => (
          <div className="d-flex justify-content-between align-items-center mb-3" key={field}>
            <div>
              <strong className="text-capitalize">{field}</strong>
              <p className="mb-0 text-muted">{formData[field]}</p>
            </div>
            <button className="btn btn-sm btn-primary" onClick={() => openModal(field)}>
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit {activeField}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {activeField === "description" ? (
                <textarea
                  className="form-control"
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                />
              ) : (
                <input
                  type={activeField === "email" ? "email" : "text"}
                  className="form-control"
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                />
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactForm;
