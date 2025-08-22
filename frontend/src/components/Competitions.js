import React, { useState, useEffect } from "react";
import axios from "axios"; // will still be used later when backend is ready

// For now, mock API base. You can replace with your backend later.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default function Competitions({ adminView, token }) {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editCompKey, setEditCompKey] = useState(null);
  const [editCompData, setEditCompData] = useState({});

  const [addingNew, setAddingNew] = useState(false);
  const [newCompData, setNewCompData] = useState({
    key: "",
    title: "",
    description: "",
    gradient: "from-blue-500 to-blue-700"
  });

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    // TODO: Replace with backend fetch when ready
    // Currently loading from placeholder
    setCompetitions([
      { key: "tvm", title: "T vs M", description: "Annual sports meet between IITs", gradient: "from-blue-500 to-blue-700" },
      { key: "interiit", title: "Inter IIT", description: "National level IIT sports competition", gradient: "from-red-500 to-red-700" }
    ]);
    setLoading(false);
  }, []);

  const handleEditClick = (comp) => {
    setEditCompKey(comp.key);
    setEditCompData({ ...comp });
  };

  const handleCancelEdit = () => {
    setEditCompKey(null);
    setEditCompData({});
  };

  const handleSaveEdit = () => {
    // For now just update frontend state without backend
    setCompetitions((prev) =>
      prev.map((c) => (c.key === editCompKey ? editCompData : c))
    );
    handleCancelEdit();
  };

  const handleDelete = (key) => {
    if (!window.confirm("Delete this competition?")) return;
    setCompetitions((prev) => prev.filter((c) => c.key !== key));
    if (editCompKey === key) handleCancelEdit();
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setNewCompData({
      key: "",
      title: "",
      description: "",
      gradient: "from-blue-500 to-blue-700"
    });
  };

  const handleCancelAddNew = () => {
    setAddingNew(false);
    setNewCompData({
      key: "",
      title: "",
      description: "",
      gradient: "from-blue-500 to-blue-700"
    });
  };

  const handleSaveNew = () => {
    if (!newCompData.key || !newCompData.title) {
      alert("Please provide a key and title for the competition");
      return;
    }
    setCompetitions((prev) => [...prev, newCompData]);
    handleCancelAddNew();
  };

  if (loading) return <p>Loading competitions...</p>;

  return (
    <section
      id="competitions"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-900">
          Competitions
        </h2>

        {/* Add New Button */}
        {adminView && !addingNew && (
          <div className="mb-6 text-center">
            <button
              onClick={handleAddNew}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add New Competition
            </button>
          </div>
        )}

        {/* Add Form */}
        {adminView && addingNew && (
          <div className="mb-10 max-w-xl mx-auto bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Add New Competition</h3>
            <input
              placeholder="Key (unique identifier)"
              value={newCompData.key}
              onChange={(e) =>
                setNewCompData({ ...newCompData, key: e.target.value })
              }
              className="w-full border mb-2 p-2 rounded"
            />
            <input
              placeholder="Title"
              value={newCompData.title}
              onChange={(e) =>
                setNewCompData({ ...newCompData, title: e.target.value })
              }
              className="w-full border mb-2 p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={newCompData.description}
              onChange={(e) =>
                setNewCompData({ ...newCompData, description: e.target.value })
              }
              className="w-full border mb-2 p-2 rounded"
              rows={3}
            />
            <input
              placeholder="Gradient CSS classes"
              value={newCompData.gradient}
              onChange={(e) =>
                setNewCompData({ ...newCompData, gradient: e.target.value })
              }
              className="w-full border mb-4 p-2 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleSaveNew}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelAddNew}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((comp) =>
            editCompKey === comp.key ? (
              // Edit mode
              <div
                key={comp.key}
                className="bg-white rounded-xl overflow-hidden shadow-lg p-6"
              >
                <input
                  className="w-full border mb-2 p-2 rounded"
                  value={editCompData.title}
                  onChange={(e) =>
                    setEditCompData({ ...editCompData, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full border mb-2 p-2 rounded"
                  rows={3}
                  value={editCompData.description}
                  onChange={(e) =>
                    setEditCompData({
                      ...editCompData,
                      description: e.target.value
                    })
                  }
                />
                <input
                  className="w-full border mb-4 p-2 rounded"
                  value={editCompData.gradient}
                  onChange={(e) =>
                    setEditCompData({
                      ...editCompData,
                      gradient: e.target.value
                    })
                  }
                  placeholder="Gradient CSS classes"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <div
                key={comp.key}
                className={`box-3d bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300`}
              >
                <div
                  className={`h-48 bg-gradient-to-r ${comp.gradient} flex items-center justify-center`}
                >
                  <h3 className="text-2xl font-bold text-white text-center">
                    {comp.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{comp.description}</p>
                  {adminView && (
                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        onClick={() => handleEditClick(comp)}
                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comp.key)}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}