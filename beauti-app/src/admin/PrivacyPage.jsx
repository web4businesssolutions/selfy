import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { API_BASE_URL } from '../constants';

const AdminTerms = () => {
  const [terms, setTerms] = useState([]);
  const [sections, setSections] = useState([]);

  const fetchTerms = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/privacys/all`);
    setTerms(res.data);
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: uuidv4(),
        heading: "",
        content: "",
        bulletPoints: [""],
      },
    ]);
  };

  const handleRemoveSection = (id) => {
    setSections(sections.filter((sec) => sec.id !== id));
  };

  const handleSectionChange = (id, field, value) => {
    setSections(sections.map((sec) =>
      sec.id === id ? { ...sec, [field]: value } : sec
    ));
  };

  const handleBulletChange = (sectionId, index, value) => {
    setSections(sections.map((sec) =>
      sec.id === sectionId
        ? {
            ...sec,
            bulletPoints: sec.bulletPoints.map((bp, i) =>
              i === index ? value : bp
            ),
          }
        : sec
    ));
  };

  const handleAddBullet = (sectionId) => {
    setSections(sections.map((sec) =>
      sec.id === sectionId
        ? { ...sec, bulletPoints: [...sec.bulletPoints, ""] }
        : sec
    ));
  };

  const handleRemoveBullet = (sectionId, index) => {
    setSections(sections.map((sec) =>
      sec.id === sectionId
        ? {
            ...sec,
            bulletPoints: sec.bulletPoints.filter((_, i) => i !== index),
          }
        : sec
    ));
  };

  const handleSubmit = async () => {
    for (const sec of sections) {
      if (sec.heading) {
        await axios.post(`${API_BASE_URL}/api/privacys/add`, {
          heading: sec.heading,
          content: sec.content,
          bulletPoints: sec.bulletPoints.filter(bp => bp.trim() !== ""),
        });
      }
    }
    setSections([]);
    fetchTerms();
  };

  const handleEdit = (term) => {
    setSections([
      {
        id: term._id,
        heading: term.heading,
        content: term.content || "",
        bulletPoints: term.bulletPoints || [""],
      },
    ]);
  };

  const handleUpdate = async () => {
    const section = sections[0]; // only one section is editable at a time
    await axios.put(`${API_BASE_URL}/api/privacys/update/${section.id}`, {
      heading: section.heading,
      content: section.content,
      bulletPoints: section.bulletPoints.filter(bp => bp.trim() !== ""),
    });
    setSections([]);
    fetchTerms();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/privacys/delete/${id}`);
    fetchTerms();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Admin Form */}
      <div className="space-y-4 mb-8">
        {sections.map((section, index) => (
          <div key={section.id} className="border rounded-lg p-4 shadow bg-white">
            <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>

            <input
              type="text"
              placeholder="Heading"
              value={section.heading}
              onChange={(e) => handleSectionChange(section.id, "heading", e.target.value)}
              className="w-full border rounded-md p-2 mb-3"
            />

            <textarea
              placeholder="Paragraph Content (optional)"
              value={section.content}
              onChange={(e) => handleSectionChange(section.id, "content", e.target.value)}
              className="w-full border rounded-md p-2 h-24 resize-none mb-3"
            />

            <div className="space-y-2 mb-2">
              {section.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Bullet Point ${i + 1}`}
                    value={bp}
                    onChange={(e) => handleBulletChange(section.id, i, e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                  <button
                    onClick={() => handleRemoveBullet(section.id, i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAddBullet(section.id)}
              className="text-sm text-blue-600 hover:underline mb-3"
            >
              + Add Bullet Point
            </button>

            <div className="mt-3 text-right">
              <button
                onClick={() => handleRemoveSection(section.id)}
                className="text-red-600 hover:underline"
              >
                Remove Section
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            onClick={handleAddSection}
            className="bg-blue-600 text-white px-4 py-2 !rounded-md shadow hover:bg-blue-700"
          >
            Add Section
          </button>

          {sections.length > 0 && (
            <button
              onClick={sections[0]?.id?.length === 24 ? handleUpdate : handleSubmit}
              className="bg-green-600 text-white px-4 py-2 !rounded-md shadow hover:bg-green-700"
            >
              {sections[0]?.id?.length === 24 ? "Update Section" : "Save All"}
            </button>
          )}
        </div>
      </div>

      {/* Display Current Sections */}
      <div className="space-y-6 container shadow-lg p-6 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4 bg-black text-white p-3 rounded-lg">Current Privacy Policy</h4>
        {terms.map((term, index) => (
          <div key={term._id} className="bg-gray-100 p-4 border rouened-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-1">
              {index + 1}. {term.heading}
            </h3>
            {term.content && <p className="text-gray-700 mb-2">{term.content}</p>}
            {term.bulletPoints?.length > 0 && (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {term.bulletPoints.map((bp, idx) => (
                  <li key={idx}>{bp}</li>
                ))}
              </ul>
            )}
            <div className="mt-2 space-x-4">
              <button
                onClick={() => handleEdit(term)}
                className="text-blue-600 hover:underline px-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(term._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTerms;
