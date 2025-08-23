import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminPanel({ visible, token, role }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState(null);
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (section) {
      fetchSection(section);
    }
  }, [section]);

  if (!visible || role !== "admin") return null;

  const fetchSection = async (sec) => {
    try {
      const res = await axios.get(`${API_URL}/${sec}`, { headers: authHeader });
      setData(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
      alert(`Failed to load ${sec}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      await axios.delete(`${API_URL}/${section}/${id}`, { headers: authHeader });
      fetchSection(section);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleSave = async () => {
    try {
      if (editItem._id) {
        await axios.put(`${API_URL}/${section}/${editItem._id}`, editItem, { headers: authHeader });
      } else {
        await axios.post(`${API_URL}/${section}`, editItem, { headers: authHeader });
      }
      setEditItem(null);
      fetchSection(section);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // --- Competition helpers ---
  const addYear = () => {
    setEditItem({
      ...editItem,
      years: [...(editItem.years || []), { year: new Date().getFullYear(), eventTypes: [] }],
    });
  };
  const removeYear = (yearIdx) => {
    const years = [...(editItem.years || [])];
    years.splice(yearIdx, 1);
    setEditItem({ ...editItem, years });
  };
  const addEventType = (yearIdx) => {
    const years = [...(editItem.years || [])];
    years[yearIdx].eventTypes = years[yearIdx].eventTypes || [];
    years[yearIdx].eventTypes.push({ typeName: "track", events: [] });
    setEditItem({ ...editItem, years });
  };
  const removeEventType = (yearIdx, typeIdx) => {
    const years = [...(editItem.years || [])];
    years[yearIdx].eventTypes.splice(typeIdx, 1);
    setEditItem({ ...editItem, years });
  };
  const addEvent = (yearIdx, typeIdx) => {
    const years = [...(editItem.years || [])];
    years[yearIdx].eventTypes[typeIdx].events =
      years[yearIdx].eventTypes[typeIdx].events || [];
    years[yearIdx].eventTypes[typeIdx].events.push({ name: "New Event", results: [] });
    setEditItem({ ...editItem, years });
  };
  const removeEvent = (yearIdx, typeIdx, evIdx) => {
    const years = [...(editItem.years || [])];
    years[yearIdx].eventTypes[typeIdx].events.splice(evIdx, 1);
    setEditItem({ ...editItem, years });
  };
  const addResult = (yearIdx, typeIdx, evIdx) => {
    const years = [...(editItem.years || [])];
    years[yearIdx].eventTypes[typeIdx].events[evIdx].results =
      years[yearIdx].eventTypes[typeIdx].events[evIdx].results || [];
    years[yearIdx].eventTypes[typeIdx].events[evIdx].results.push({
      position: "Gold",
      athlete: "",
      result: "",
      points: 0,
    });
    setEditItem({ ...editItem, years });
  };
  const removeResult = (yearIdx, typeIdx, evIdx, rIdx) => {
    const years = [...(editItem.years || [])];
    years[yearIdx].eventTypes[typeIdx].events[evIdx].results.splice(rIdx, 1);
    setEditItem({ ...editItem, years });
  };

  return (
    <>
      {/* Floating Admin Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
          aria-label="Toggle Admin Panel"
        >
          <i className="fas fa-cog"></i>
        </button>
      </div>

      {open && (
        <div className="fixed top-0 right-0 w-full md:w-[80%] h-full bg-white bg-opacity-40 backdrop-blur-lg border border-white/30 shadow-2xl z-50 overflow-y-auto transition-transform duration-500">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <button onClick={() => setOpen(false)} aria-label="Close Admin Panel">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Section Buttons */}
          <div className="flex gap-2 p-4 border-b">
            {["competitions", "achievements", "records", "athletes"].map((sec) => (
              <button
                key={sec}
                onClick={() => setSection(sec)}
                className={`px-4 py-2 rounded ${
                  section === sec ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {sec.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="p-4">
            {/* List View */}
            {section && !editItem && (
              <>
                <div className="flex justify-between mb-3">
                  <h3 className="text-xl">{section.toUpperCase()}</h3>
                  <button
                    onClick={() => setEditItem({})}
                    className="bg-green-500 px-3 py-1 text-white rounded hover:scale-105 hover:shadow-xl transition-transform"
                  >
                    Add
                  </button>
                </div>
                {data.map((item) => (
                  <div
                    key={item._id || item.key || item.name}
                    className="p-2 border mb-2 flex justify-between"
                  >
                    <span>{item.title || item.name || item.category}</span>
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-500 text-white px-2 rounded hover:scale-105 hover:shadow-xl transition-transform"
                        onClick={() => setEditItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 rounded hover:scale-105 hover:shadow-xl transition-transform"
                        onClick={() => handleDelete(item._id)}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Edit Form */}
            {editItem && (
              <div className="border p-4 rounded-2xl bg-white bg-opacity-70 shadow-2xl animate-slideUp">
                <h4 className="font-bold mb-2">
                  {editItem._id ? "Edit" : "Add"} {section}
                </h4>

                {/* Competitions */}
{section === "competitions" && (
  <>
    <input
      className="border p-1 w-full mb-1"
      placeholder="Key"
      value={editItem.key || ""}
      onChange={(e) => setEditItem({ ...editItem, key: e.target.value })}
    />
    <input
      className="border p-1 w-full mb-1"
      placeholder="Title"
      value={editItem.title || ""}
      onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
    />
    <input
      className="border p-1 w-full mb-1"
      placeholder="Gradient (e.g. from-blue-500 to-orange-500)"
      value={editItem.gradient || ""}
      onChange={(e) => setEditItem({ ...editItem, gradient: e.target.value })}
    />
    <textarea
      className="border p-1 w-full mb-1"
      placeholder="Description"
      value={editItem.description || ""}
      onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
    />

    {/* ✅ New status select */}
    <select
      className="border p-1 w-full mb-2"
      value={editItem.status || "upcoming"}
      onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
    >
      <option value="upcoming">Upcoming</option>
      <option value="present">Present</option>
      <option value="past">Past</option>
    </select>

    {/* ✅ Eligibility editing (only for upcoming events) */}
    {editItem.status === "upcoming" && (
      <input
        className="border p-1 w-full mb-1"
        placeholder="Eligibility (comma separated)"
        value={(editItem.upcomingEventDetails?.eligibility || []).join(", ")}
        onChange={(e) =>
          setEditItem({
            ...editItem,
            upcomingEventDetails: {
              ...editItem.upcomingEventDetails,
              eligibility: e.target.value.split(",").map((i) => i.trim()),
            },
          })
        }
      />
    )}

                    {/* Years */}
                    <div>
                      <button
                        className="bg-green-500 text-white px-2 rounded hover:scale-105 hover:shadow-xl transition-transform"
                        onClick={addYear}
                      >
                        Add Year
                      </button>
                      {editItem.years?.map((yr, yIdx) => (
                        <div key={yIdx} className="mt-2 border p-2">
                          <input
                            type="number"
                            value={yr.year}
                            onChange={(e) => {
                              const years = [...editItem.years];
                              years[yIdx].year = Number(e.target.value);
                              setEditItem({ ...editItem, years });
                            }}
                          />
                          <button
                            className="bg-red-400 ml-2 hover:scale-105 hover:shadow-xl transition-transform"
                            onClick={() => removeYear(yIdx)}
                          >
                            Del Year
                          </button>
                          <button
                            className="bg-blue-400 ml-2 hover:scale-105 hover:shadow-xl transition-transform"
                            onClick={() => addEventType(yIdx)}
                          >
                            Add Event Type
                          </button>

                          {yr.eventTypes?.map((et, tIdx) => (
                            <div key={tIdx} className="ml-4 border p-2">
                              <input
                                value={et.typeName}
                                onChange={(e) => {
                                  const years = [...editItem.years];
                                  years[yIdx].eventTypes[tIdx].typeName = e.target.value;
                                  setEditItem({ ...editItem, years });
                                }}
                              />
                              <button onClick={() => removeEventType(yIdx, tIdx)}>Del Type</button>
                              <button onClick={() => addEvent(yIdx, tIdx)}>Add Event</button>

                              {et.events?.map((ev, eIdx) => (
                                <div key={eIdx} className="ml-4 border p-1">
                                  <input
                                    value={ev.name}
                                    onChange={(e2) => {
                                      const years = [...editItem.years];
                                      years[yIdx].eventTypes[tIdx].events[eIdx].name =
                                        e2.target.value;
                                      setEditItem({ ...editItem, years });
                                    }}
                                  />
                                  <button onClick={() => removeEvent(yIdx, tIdx, eIdx)}>Del Event</button>
                                  <button onClick={() => addResult(yIdx, tIdx, eIdx)}>Add Result</button>

                                  {ev.results?.map((r, rIdx) => (
                                    <div key={rIdx} className="ml-4 border p-1">
                                      <input
                                        value={r.position}
                                        placeholder="Position"
                                        onChange={(e) => {
                                          const years = [...editItem.years];
                                          years[yIdx].eventTypes[tIdx].events[eIdx].results[rIdx].position = e.target.value;
                                          setEditItem({ ...editItem, years });
                                        }}
                                      />
                                      <input
                                        value={r.athlete}
                                        placeholder="Athlete"
                                        onChange={(e) => {
                                          const years = [...editItem.years];
                                          years[yIdx].eventTypes[tIdx].events[eIdx].results[rIdx].athlete = e.target.value;
                                          setEditItem({ ...editItem, years });
                                        }}
                                      />
                                      <input
                                        value={r.result}
                                        placeholder="Result"
                                        onChange={(e) => {
                                          const years = [...editItem.years];
                                          years[yIdx].eventTypes[tIdx].events[eIdx].results[rIdx].result = e.target.value;
                                          setEditItem({ ...editItem, years });
                                        }}
                                      />
                                      <input
                                        type="number"
                                        value={r.points}
                                        placeholder="Points"
                                        onChange={(e) => {
                                          const years = [...editItem.years];
                                          years[yIdx].eventTypes[tIdx].events[eIdx].results[rIdx].points = Number(e.target.value);
                                          setEditItem({ ...editItem, years });
                                        }}
                                      />
                                      <button onClick={() => removeResult(yIdx, tIdx, eIdx, rIdx)}>Del Result</button>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 px-3 py-1 text-white rounded hover:scale-105 hover:shadow-xl transition-transform"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditItem(null)}
                    className="bg-gray-400 px-3 py-1 rounded hover:scale-105 hover:shadow-xl transition-transform"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
