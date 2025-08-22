import React, { useState, useEffect } from "react";

export default function Records({ adminView }) {
  const [records, setRecords] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [editing, setEditing] = useState({});
  const [editRecord, setEditRecord] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  // Fetch records from backend
  useEffect(() => {
    async function loadRecords() {
      try {
        const res = await fetch(`${API_URL}/api/records`);
        const data = await res.json();
        if (res.ok) {
          setRecords(
            data.reduce((acc, rec) => {
              acc[rec.category] = rec;
              return acc;
            }, {})
          );
          if (data.length > 0) setActiveTab(data[0].category);
        }
      } catch (err) {
        console.error("Failed to fetch records:", err);
      }
    }
    loadRecords();
  }, []);

  // Helpers
  const getToken = () => localStorage.getItem("token");

  // ---- CRUD HANDLERS ----

  // Create new entry
  async function handleAdd(category, type) {
    const newEntry = {
      event: "New Event",
      record: "0s",
      athlete: "Unknown",
      year: new Date().getFullYear(),
    };

    try {
      const res = await fetch(`${API_URL}/api/records/${records[category]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          [type]: [...records[category][type], newEntry],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecords((prev) => ({
          ...prev,
          [category]: data,
        }));
      } else {
        alert(data.message || "Error adding record");
      }
    } catch (err) {
      console.error("Add failed:", err);
    }
  }

  // Save edited entry
  async function handleSave(category, type, index) {
    if (!editRecord.event.trim()) {
      alert("Event name cannot be empty");
      return;
    }
    if (editRecord.year > new Date().getFullYear()) {
      alert("Year cannot be in the future");
      return;
    }

    try {
      const updatedList = records[category][type].map((r, i) =>
        i === index ? editRecord : r
      );

      const res = await fetch(`${API_URL}/api/records/${records[category]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          [type]: updatedList,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecords((prev) => ({
          ...prev,
          [category]: data,
        }));
        setEditing((prev) => ({ ...prev, [type]: null }));
      } else {
        alert(data.message || "Error saving record");
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  // Delete entry
  async function handleDelete(category, type, index) {
    try {
      const updatedList = records[category][type].filter((_, i) => i !== index);

      const res = await fetch(`${API_URL}/api/records/${records[category]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          [type]: updatedList,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecords((prev) => ({
          ...prev,
          [category]: data,
        }));
      } else {
        alert(data.message || "Error deleting record");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // Cancel edit
  const handleCancel = (type) => {
    setEditing((prev) => ({ ...prev, [type]: null }));
    setEditRecord({});
  };

  // ---- RENDER ----

  if (!activeTab) return <p className="text-center">Loading records...</p>;

  const activeData = records[activeTab];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Records</h2>

        {/* Tabs */}
        <div className="flex space-x-4 justify-center mb-6">
          {Object.keys(records).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Track & Field tables */}
        {["track", "field"].map((type) => (
          <div key={type} className="mb-6">
            <h3 className="text-xl font-semibold mb-3 capitalize">{type}</h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Event</th>
                  <th className="border p-2">Record</th>
                  <th className="border p-2">Athlete</th>
                  <th className="border p-2">Year</th>
                  {adminView && <th className="border p-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {activeData[type].map((rec, index) =>
                  editing[type] === index ? (
                    <tr key={index}>
                      <td className="border p-2">
                        <input
                          value={editRecord.event}
                          onChange={(e) =>
                            setEditRecord((prev) => ({
                              ...prev,
                              event: e.target.value,
                            }))
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          value={editRecord.record}
                          onChange={(e) =>
                            setEditRecord((prev) => ({
                              ...prev,
                              record: e.target.value,
                            }))
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          value={editRecord.athlete}
                          onChange={(e) =>
                            setEditRecord((prev) => ({
                              ...prev,
                              athlete: e.target.value,
                            }))
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={editRecord.year}
                          onChange={(e) =>
                            setEditRecord((prev) => ({
                              ...prev,
                              year: Number(e.target.value),
                            }))
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="border p-2 space-x-2">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          onClick={() => handleSave(activeTab, type, index)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                          onClick={() => handleCancel(type)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td className="border p-2">{rec.event}</td>
                      <td className="border p-2">{rec.record}</td>
                      <td className="border p-2">{rec.athlete}</td>
                      <td className="border p-2">{rec.year}</td>
                      {adminView && (
                        <td className="border p-2 space-x-2">
                          <button
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                            onClick={() => {
                              setEditing((prev) => ({ ...prev, [type]: index }));
                              setEditRecord(rec);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => handleDelete(activeTab, type, index)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {adminView && (
              <button
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleAdd(activeTab, type)}
              >
                Add {type} record
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
