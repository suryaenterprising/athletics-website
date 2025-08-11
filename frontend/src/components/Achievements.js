import React, { useState, useEffect } from "react";
// import axios from "axios"; // uncomment later

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Achievements({ adminView, token }) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    // Mock load for now
    const mockData = [
      {
        icon: "fas fa-trophy",
        title: "National Level",
        description: "Won multiple gold medals",
        gradient: "from-yellow-500 to-yellow-700",
        items: ["Gold - 100m", "Silver - Javelin"]
      },
      {
        icon: "fas fa-star",
        title: "State Level",
        description: "Dominated athletics in state competitions",
        gradient: "from-blue-500 to-indigo-700",
        items: ["Gold - Long Jump", "Bronze - Shot Put"]
      }
    ];
    setAchievements(mockData);
    setLoading(false);

    // Later replace with:
    // fetchAchievements();
  }, []);

  // const fetchAchievements = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(${API_URL}/achievements, { headers: authHeader });
  //     setAchievements(res.data);
  //   } catch (err) {
  //     console.error("Fetch achievements error:", err);
  //     alert("Failed to load achievements");
  //   }
  //   setLoading(false);
  // };

  const handleEditClick = (idx) => {
    setEditIndex(idx);
    setEditData(JSON.parse(JSON.stringify(achievements[idx])));
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditData(null);
  };

  const handleSaveEdit = () => {
    const updated = [...achievements];
    updated[editIndex] = editData;
    setAchievements(updated);
    handleCancelEdit();

    // Later:
    // await axios.put(${API_URL}/achievements/${editData._id}, editData, { headers: authHeader });
    // fetchAchievements();
  };

  const onChangeField = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeItem = (idx, value) => {
    const items = [...editData.items];
    items[idx] = value;
    setEditData((prev) => ({ ...prev, items }));
  };

  const addNewItem = () => {
    setEditData((prev) => ({ ...prev, items: [...prev.items, ""] }));
  };

  const deleteItem = (idx) => {
    setEditData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx)
    }));
  };

  if (loading) return <p>Loading achievements...</p>;

  return (
    <section id="achievements" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-900">
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((ach, idx) =>
            editIndex === idx ? (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                <input
                  className="mb-2 border p-2 rounded"
                  value={editData.icon}
                  onChange={(e) => onChangeField("icon", e.target.value)}
                  placeholder="Icon (e.g., fas fa-trophy)"
                />
                <input
                  className="mb-2 border p-2 rounded font-bold text-xl"
                  value={editData.title}
                  onChange={(e) => onChangeField("title", e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  rows={2}
                  className="mb-4 border p-2 rounded"
                  value={editData.description}
                  onChange={(e) => onChangeField("description", e.target.value)}
                  placeholder="Description"
                />

                <div className="flex flex-col gap-2 mb-4 max-h-40 overflow-auto">
                  {editData.items.map((item, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        className="flex-grow border p-1 rounded"
                        value={item}
                        onChange={(e) => onChangeItem(i, e.target.value)}
                      />
                      <button
                        onClick={() => deleteItem(i)}
                        className="text-red-600 hover:text-red-800 font-bold px-2"
                        aria-label={`Delete item ${i + 1}`}
                        type="button"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addNewItem}
                  className="mb-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
                  type="button"
                >
                  + Add Item
                </button>

                <div className="flex gap-3 justify-end">
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
              <div key={idx} className="flip-card h-64 cursor-default">
                <div className="flip-card-inner h-full rounded-xl shadow-lg">
                  <div
                    className={`flip-card-front bg-gradient-to-br ${ach.gradient} rounded-xl p-6 flex flex-col justify-center items-center text-white`}
                  >
                    <i className={`${ach.icon} text-4xl mb-4`} />
                    <h3 className="text-2xl font-bold mb-2">{ach.title}</h3>
                    <p className="text-center">{ach.description}</p>

                    {adminView && (
                      <button
                        onClick={() => handleEditClick(idx)}
                        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="flip-card-back bg-white rounded-xl p-6 flex flex-col justify-center">
                    <ul className="list-disc pl-5 text-gray-700">
                      {ach.items.map((item, i) => (
                        <li key={i} className="mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}