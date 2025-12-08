import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from '../constants';

const AdminAbout = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aboutId, setAboutId] = useState(null);
  const [form, setForm] = useState({
    heading: "",
    contactEmail: "",
    mission: "",
    vision: "",
    typewriterTexts: "",
    introParagraphs: "",
    features: "",
    achievements: [],
  });

  const [imagePreview, setImagePreview] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/about/all`);
      const data = res.data.data[0];
      setAbout(data);
      setAboutId(data._id);
      setForm({
        heading: data.heading || "",
        contactEmail: data.contactEmail || "",
        mission: data.mission || "",
        vision: data.vision || "",
        typewriterTexts: data.typewriterTexts?.join("\n") || "",
        introParagraphs: data.introParagraphs?.join("\n") || "",
        features: data.features?.join("\n") || "",
        achievements: data.achievements || [],
      });
      if (data.image) {
        setImagePreview(`${API_BASE_URL}${data.image}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch about info.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleUpdate = async (field) => {
    try {
      let value = form[field];

      if (["typewriterTexts", "introParagraphs", "features"].includes(field)) {
        value = value
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item);
      }

      if (field === "achievements") {
        const isValid = form.achievements.every((item) => item.label && item.value);
        if (!isValid) {
          toast.error("All achievements must have label and value.");
          return;
        }
        value = form.achievements;
      }

      await axios.put(`${API_BASE_URL}/api/about/update/${aboutId}`, {
        [field]: value,
      });

      toast.success(`${field} updated successfully`);
      fetchAbout();
    } catch (err) {
      toast.error(`Failed to update ${field}`);
      console.error(err);
    }
  };

  const handleAchievementChange = (index, key, value) => {
    const updated = [...form.achievements];
    updated[index][key] = value;
    setForm({ ...form, achievements: updated });
  };

  const addAchievement = () => {
    setForm({
      ...form,
      achievements: [...form.achievements, { label: "", value: "" }],
    });
  };

  const removeAchievement = (index) => {
    const updated = [...form.achievements];
    updated.splice(index, 1);
    setForm({ ...form, achievements: updated });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!newImage) return toast.error("Please select an image first");

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      await axios.put(
        `${API_BASE_URL}/api/about/update/${aboutId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Image updated successfully");
      setNewImage(null);
      fetchAbout();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update image");
    }
  };

  if (loading || !about) return <div className="p-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manage About Section</h2>
      <div className="card shadow p-4 space-y-4">

        {/* Simple Fields */}
        {["heading", "contactEmail", "mission", "vision"].map((field) => (
          <div key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <div className="d-flex gap-2">
              <input
                className="form-control"
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
              <button className="btn btn-primary" onClick={() => handleUpdate(field)}>
                Save
              </button>
            </div>
          </div>
        ))}

        {/* Textarea Arrays */}
        {["typewriterTexts", "introParagraphs", "features"].map((field) => (
          <div key={field}>
            <label className="form-label text-capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <textarea
              className="form-control"
              rows={4}
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder="Enter each item on a new line"
            />
            <button className="btn btn-sm btn-primary mt-2" onClick={() => handleUpdate(field)}>
              Save
            </button>
          </div>
        ))}

        {/* Achievements */}
        <div>
          <label className="form-label">Achievements</label>
          {form.achievements.map((ach, index) => (
            <div key={index} className="d-flex gap-2 mb-2 align-items-center">
              <input
                className="form-control"
                placeholder="Label"
                value={ach.label}
                onChange={(e) => handleAchievementChange(index, "label", e.target.value)}
              />
              <input
                className="form-control"
                placeholder="Value"
                value={ach.value}
                onChange={(e) => handleAchievementChange(index, "value", e.target.value)}
              />
              <button className="btn btn-danger" onClick={() => removeAchievement(index)}>
                &times;
              </button>
            </div>
          ))}
          <button className="btn btn-outline-success mb-2" onClick={addAchievement}>
            + Add Achievement
          </button>
          <br />
          <button className="btn btn-primary" onClick={() => handleUpdate("achievements")}>
            Save Achievements
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label className="form-label">Image</label>
          <div className="mb-2">
            {imagePreview && (
              <img src={imagePreview} alt="About" height={120} style={{ objectFit: "contain" }} />
            )}
          </div>
          <input type="file" className="form-control" onChange={handleImageChange} />
          <button className="btn btn-primary mt-2" onClick={handleImageUpload}>
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
