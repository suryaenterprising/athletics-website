import React, { useState } from "react";

// Example starting records structure
const initialRecords = {
  best: {
    track: [
      { event: "100m", record: "10.2s", athlete: "John Doe", year: "2019" },
    ],
    field: [
      { event: "Long Jump", record: "7.2m", athlete: "Jane Doe", year: "2018" },
    ],
  },
  2023: { track: [], field: [] },
  2024: { track: [], field: [] },
};

export default function Records({ adminView = true }) {
  const [records, setRecords] = useState(initialRecords);
  const [activeTab, setActiveTab] = useState("best");

  const [editing, setEditing] = useState({ track: null, field: null });
  const [editRecord, setEditRecord] = useState({
    event: "",
    record: "",
    athlete: "",
    year: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditRecord((prev) => ({ ...prev, [name]: value }));
  }

  function handleEdit(category, index) {
    setEditing((prev) => ({ ...prev, [category]: index }));

    const tabRecords = records[activeTab];
    if (tabRecords && tabRecords[category] && tabRecords[category][index]) {
      setEditRecord({ ...tabRecords[category][index] });
    } else {
      setEditRecord({ event: "", record: "", athlete: "", year: "" });
    }
  }

  function handleSave(category) {
    if (!editRecord.event.trim()) {
      alert("Event name cannot be empty");
      return;
    }
    setRecords((prev) => {
      const tabRecords = prev[activeTab] || { track: [], field: [] };
      const updatedCategory = [...(tabRecords[category] || [])];
      updatedCategory[editing[category]] = { ...editRecord };

      return {
        ...prev,
        [activeTab]: {
          ...tabRecords,
          [category]: updatedCategory,
        },
      };
    });
    setEditing((prev) => ({ ...prev, [category]: null }));
  }

  function handleCancel(category) {
    setEditing((prev) => ({ ...prev, [category]: null }));
    setEditRecord({ event: "", record: "", athlete: "", year: "" });
  }

  function handleDelete(category, index) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords((prev) => {
        const tabRecords = prev[activeTab] || { track: [], field: [] };
        const updatedCategory = (tabRecords[category] || []).filter(
          (_, i) => i !== index
        );
        return {
          ...prev,
          [activeTab]: {
            ...tabRecords,
            [category]: updatedCategory,
          },
        };
      });
    }
  }

  function handleAdd(category) {
    setRecords((prev) => {
      const tabRecords = prev[activeTab] || { track: [], field: [] };
      const updatedCategory = [
        ...(tabRecords[category] || []),
        { event: "", record: "", athlete: "", year: "" },
      ];
      return {
        ...prev,
        [activeTab]: {
          ...tabRecords,
          [category]: updatedCategory,
        },
      };
    });

    setEditing((prev) => ({
      ...prev,
      [category]: (records[activeTab]?.[category]?.length || 0),
    }));

    setEditRecord({ event: "", record: "", athlete: "", year: "" });
  }

  const renderTable = (tabKey, category) => {
    const tabRecords = records[tabKey] || { track: [], field: [] };
    const recordsList = tabRecords[category] || [];

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Event</th>
              <th className="py-3 px-4 text-left">Record</th>
              <th className="py-3 px-4 text-left">Athlete</th>
              <th className="py-3 px-4 text-left">Year</th>
              {adminView && <th className="py-3 px-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {recordsList.map((rec, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-blue-50">
                {editing[category] === i && activeTab === tabKey ? (
                  <>
                    {["event", "record", "athlete", "year"].map((field) => (
                      <td className="py-3 px-4" key={field}>
                        <input
                          type="text"
                          name={field}
                          value={editRecord[field]}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                    ))}
                    <td className="py-3 px-4 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        onClick={() => handleSave(category)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={() => handleCancel(category)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{rec.event}</td>
                    <td className="py-3 px-4">{rec.record}</td>
                    <td className="py-3 px-4">{rec.athlete}</td>
                    <td className="py-3 px-4">{rec.year}</td>
                    {adminView && (
                      <td className="py-3 px-4 space-x-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                          onClick={() => handleEdit(category, i)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(category, i)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {adminView && (
          <div className="mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => handleAdd(category)}
            >
              + Add Record
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(records).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "best" ? "Best Ever" : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-6 text-center">
          {activeTab === "best"
            ? "Best Ever Records at IIT Indore"
            : `Records Set in ${activeTab}`}
        </h3>

        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 text-blue-800">
            Track Events
          </h4>
          {renderTable(activeTab, "track")}
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4 text-blue-800">
            Field Events
          </h4>
          {renderTable(activeTab, "field")}
        </div>
      </div>
    </div>
  );
}