import React, { useState, useEffect } from "react";
// import axios from "axios"; // Uncomment when backend ready

const TABS = [
  { key: "students", label: "Students" },
  { key: "coaches", label: "Coaches" },
  { key: "alumni", label: "Alumni" }
];

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
export default function Athletes({ adminView, token }) {
  const [activeTab, setActiveTab] = useState("students");
  const [athletesData, setAthletesData] = useState({ students: [], coaches: [], alumni: [] });
  const [loading, setLoading] = useState(true);

  const [editIndex, setEditIndex] = useState(null);
  const [editTab, setEditTab] = useState(null);
  const [editData, setEditData] = useState(null);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    // Mock data load for now
    const mockData = {
      students: [
        {
          name: "John Doe",
          image: "https://via.placeholder.com/150",
          branch: "Mechanical",
          roll: "ME123",
          events: ["100m", "200m"],
          achv: ["Gold in 100m", "Silver in 200m"],
          email: "john@example.com"
        }
      ],
      coaches: [
        {
          name: "Coach Smith",
          image: "https://via.placeholder.com/150",
          role: "Head Coach",
          spec: "Track",
          events: ["Sprint Training"],
          achv: ["Level 3 Athletics Coach"],
          email: "coach@example.com"
        }
      ],
      alumni: [
        {
          name: "Jane Alumni",
          image: "https://via.placeholder.com/150",
          batch: "2015",
          branch: "Civil",
          events: ["Marathon"],
          achv: ["State Marathon Winner"],
          email: "jane@example.com",
          contact: "linkedin.com/in/jane"
        }
      ]
    };
    setAthletesData(mockData);
    setLoading(false);

    // Later replace with:
    // fetchAthletes();
  }, []);

  // const fetchAthletes = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(${API_URL}/athletes, { headers: authHeader });
  //     setAthletesData(res.data);
  //   } catch (err) {
  //     alert("Failed to load athletes data");
  //   }
  //   setLoading(false);
  // };

  const startEdit = (tabKey, idx) => {
    setEditTab(tabKey);
    setEditIndex(idx);
    const clone = JSON.parse(JSON.stringify(athletesData[tabKey][idx]));
    clone.events = clone.events || [];
    clone.achv = clone.achv || [];
    setEditData(clone);
  };

  const cancelEdit = () => {
    setEditTab(null);
    setEditIndex(null);
    setEditData(null);
  };

  const saveEdit = () => {
    const updatedList = [...athletesData[editTab]];
    updatedList[editIndex] = editData;
    setAthletesData({ ...athletesData, [editTab]: updatedList });
    cancelEdit();

    // Later:
    // await axios.put(${API_URL}/athletes, { ...athletesData, [editTab]: updatedList }, { headers: authHeader });
  };

  const onChangeField = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // Events
  const onChangeEvent = (idx, value) => {
    const events = [...editData.events];
    events[idx] = value;
    setEditData((prev) => ({ ...prev, events }));
  };
  const addEvent = () => setEditData((prev) => ({ ...prev, events: [...prev.events, ""] }));
  const deleteEvent = (idx) =>
    setEditData((prev) => ({ ...prev, events: prev.events.filter((_, i) => i !== idx) }));

  // Achievements
  const onChangeAchv = (idx, value) => {
    const achv = [...editData.achv];
    achv[idx] = value;
    setEditData((prev) => ({ ...prev, achv }));
  };
  const addAchv = () => setEditData((prev) => ({ ...prev, achv: [...prev.achv, ""] }));
  const deleteAchv = (idx) =>
    setEditData((prev) => ({ ...prev, achv: prev.achv.filter((_, i) => i !== idx) }));

  if (loading) return <p>Loading athletes...</p>;

  return (
    <section id="athletes" className="py-20 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-900">
          Our Athletes
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`${
                  activeTab === tab.key ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                } px-6 py-2 rounded-lg transition`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {athletesData[activeTab].map((ath, idx) =>
            editTab === activeTab && editIndex === idx ? (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                <label className="mb-1 font-semibold">Name:</label>
                <input
                  type="text"
                  className="border p-2 rounded mb-2"
                  value={editData.name}
                  onChange={(e) => onChangeField("name", e.target.value)}
                />
                <label className="mb-1 font-semibold">Image URL:</label>
                <input
                  type="text"
                  className="border p-2 rounded mb-2"
                  value={editData.image}
                  onChange={(e) => onChangeField("image", e.target.value)}
                />
                {/* Branch / Role / Batch */}
                {activeTab === "students" && (
                  <>
                    <label className="mb-1 font-semibold">Branch:</label>
                    <input
                      type="text"
                      className="border p-2 rounded mb-2"
                      value={editData.branch || ""}
                      onChange={(e) => onChangeField("branch", e.target.value)}
                    />
                    <label className="mb-1 font-semibold">Roll No:</label>
                    <input
                      type="text"
                      className="border p-2 rounded mb-2"
                      value={editData.roll || ""}
                      onChange={(e) => onChangeField("roll", e.target.value)}
                    />
                  </>
                )}
                {activeTab === "coaches" && (
                  <>
                    <label className="mb-1 font-semibold">Role:</label>
                    <input
                      type="text"
                      className="border p-2 rounded mb-2"
                      value={editData.role || ""}
                      onChange={(e) => onChangeField("role", e.target.value)}
                    />
                    <label className="mb-1 font-semibold">Specialization:</label>
                    <input
                      type="text"
                      className="border p-2 rounded mb-2"
                      value={editData.spec || ""}
                      onChange={(e) => onChangeField("spec", e.target.value)}
                    />
                  </>
                )}
                {activeTab === "alumni" && (
                  <>
                    <label className="mb-1 font-semibold">Batch:</label>
                    <input
                      type="text"
                      className="border p-2 rounded mb-2"
                      value={editData.batch || ""}
                      onChange={(e) => onChangeField("batch", e.target.value)}
                    />
                    <label className="mb-1 font-semibold">Branch:</label>
                    <input
                      type="text"
                      className="border p-2 rounded mb-2"
                      value={editData.branch || ""}
                      onChange={(e) => onChangeField("branch", e.target.value)}
                    />
                  </>
                )}
                {/* Events */}
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Events:</label>
                  {editData.events.map((ev, i) => (
                    <div key={i} className="flex gap-2 items-center mb-1">
                      <input
                        type="text"
                        className="border p-1 rounded flex-grow"
                        value={ev}
                        onChange={(e) => onChangeEvent(i, e.target.value)}
                      />
                      <button
                        onClick={() => deleteEvent(i)}
                        type="button"
                        className="text-red-600 font-bold px-2"
                        aria-label={`Delete event ${i + 1}`}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addEvent}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    + Add Event
                  </button>
                </div>
                {/* Achievements/Credentials */}
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">
                    {activeTab === "coaches" ? "Credentials" : "Achievements"}:
                  </label>
                  {editData.achv.map((a, i) => (
                    <div key={i} className="flex gap-2 items-center mb-1">
                      <input
                        type="text"
                        className="border p-1 rounded flex-grow"
                        value={a}
                        onChange={(e) => onChangeAchv(i, e.target.value)}
                      />
                      <button
                        onClick={() => deleteAchv(i)}
                        type="button"
                        className="text-red-600 font-bold px-2"
                        aria-label={`Delete achievement ${i + 1}`}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addAchv}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    + Add {activeTab === "coaches" ? "Credential" : "Achievement"}
                  </button>
                </div>
                {/* Contact */}
                <label className="mb-1 font-semibold">Email:</label>
                <input
                  type="email"
                  className="border p-2 rounded mb-2"
                  value={editData.email || ""}
                  onChange={(e) => onChangeField("email", e.target.value)}
                />
                {activeTab === "alumni" && (
                  <>
                    <label className="mb-1 font-semibold">Contact:</label>
                    <input
                      type="text"
                      className="border p-2 rounded mb-2"
                      value={editData.contact || ""}
                      onChange={(e) => onChangeField("contact", e.target.value)}
                    />
                  </>
                )}
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={idx} className="flip-card h-96 cursor-default">
                <div className="flip-card-inner h-full rounded-xl shadow-lg">
                  <div className="flip-card-front bg-white rounded-xl p-6 flex flex-col items-center">
                    <img src={ath.image} alt={ath.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200" />
                    <h3 className="text-xl font-bold text-blue-800">{ath.name}</h3>
                    {ath.branch && <p className="text-gray-600">{ath.branch}</p>}
                    {ath.roll && <p className="text-gray-500 text-sm">Roll No: {ath.roll}</p>}
                    {ath.role && <p className="text-gray-600">{ath.role}</p>}
                    {ath.spec && <p className="text-gray-500 text-sm">Specialization: {ath.spec}</p>}
                    {ath.batch && <p className="text-gray-600">{ath.batch}</p>}
                    <div className="mt-4">
                      {ath.events?.map((e, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-1 inline-block">
                          {e}
                        </span>
                      ))}
                    </div>
                    {adminView && (
                      <button
                        onClick={() => startEdit(activeTab, idx)}
                        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="flip-card-back bg-blue-600 rounded-xl p-6 flex flex-col justify-center text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {activeTab === "coaches" ? "Credentials" : "Achievements"}
                    </h3>
                    <ul className="list-disc pl-5 text-sm">
                      {ath.achv.map((a, i) => (
                        <li key={i} className="mb-1">{a}</li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-blue-400">
                      {ath.phone && <p className="mb-1"><i className="fas fa-phone-alt mr-2" /> {ath.phone}</p>}
                      {ath.email && <p className="mb-1"><i className="fas fa-envelope mr-2" /> {ath.email}</p>}
                      {ath.contact && <p className="mb-1"><i className="fab fa-linkedin mr-2" /> {ath.contact}</p>}
                    </div>
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