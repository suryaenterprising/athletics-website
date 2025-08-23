import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminPanel({ visible, token, role }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState(null);
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (section) {
      fetchSection(section);
    }
  }, [section]);

  if (!visible || role !== "admin") return null;

  const fetchSection = async (sec) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/${sec}`, { headers: authHeader });
      setData(res.data?.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert(`Failed to load ${sec}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      await axios.delete(`${API_URL}/api/${section}/${id}`, { headers: authHeader });
      fetchSection(section);
      setEditItem(null);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (editItem._id) {
        await axios.put(`${API_URL}/api/${section}/${editItem._id}`, editItem, { headers: authHeader });
      } else {
        await axios.post(`${API_URL}/api/${section}`, editItem, { headers: authHeader });
      }
      setEditItem(null);
      fetchSection(section);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Save failed");
    }
  };

  // Nested edit helpers for competitions
  const addNewYear = () => {
    setEditItem({
      ...editItem,
      years: [...(editItem.years || []), { year: new Date().getFullYear(), eventTypes: [] }]
    });
  };

  const removeYear = (yearIdx) => {
    const newYears = [...(editItem.years || [])];
    newYears.splice(yearIdx, 1);
    setEditItem({ ...editItem, years: newYears });
  };

  const addEventType = (yearIdx) => {
    const newYears = [...(editItem.years || [])];
    newYears[yearIdx].eventTypes = newYears[yearIdx].eventTypes || [];
    newYears[yearIdx].eventTypes.push({ typeName: "track", events: [] });
    setEditItem({ ...editItem, years: newYears });
  };

  const removeEventType = (yearIdx, typeIdx) => {
    const newYears = [...(editItem.years || [])];
    newYears[yearIdx].eventTypes.splice(typeIdx, 1);
    setEditItem({ ...editItem, years: newYears });
  };

  const addEvent = (yearIdx, typeIdx) => {
    const newYears = [...(editItem.years || [])];
    newYears[yearIdx].eventTypes[typeIdx].events = newYears[yearIdx].eventTypes[typeIdx].events || [];
    newYears[yearIdx].eventTypes[typeIdx].events.push({ name: "New Event", results: [] });
    setEditItem({ ...editItem, years: newYears });
  };

  const removeEvent = (yearIdx, typeIdx, evIdx) => {
    const newYears = [...(editItem.years || [])];
    newYears[yearIdx].eventTypes[typeIdx].events.splice(evIdx, 1);
    setEditItem({ ...editItem, years: newYears });
  };

  const addResult = (yearIdx, typeIdx, evIdx) => {
    const newYears = [...(editItem.years || [])];
    const event = newYears[yearIdx].eventTypes[typeIdx].events[evIdx];
    event.results = event.results || [];
    event.results.push({ position: "", athlete: "", result: "", points: 0 });
    setEditItem({ ...editItem, years: newYears });
  };

  const removeResult = (yearIdx, typeIdx, evIdx, rIdx) => {
    const newYears = [...(editItem.years || [])];
    newYears[yearIdx].eventTypes[typeIdx].events[evIdx].results.splice(rIdx, 1);
    setEditItem({ ...editItem, years: newYears });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(v => !v)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
          aria-label="Toggle Admin Panel"
        >
          <i className="fas fa-cog" />
        </button>
      </div>

      {open && (
        <div className="fixed top-0 right-0 w-full md:w-4/5 h-full bg-white bg-opacity-30 backdrop-blur-md border border-white/30 shadow-2xl overflow-y-auto z-50 transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <button onClick={() => setOpen(false)} aria-label="Close Admin Panel">
              <i className="fas fa-times" />
            </button>
          </div>

          {/* Section Buttons */}
          <div className="flex gap-3 p-4 border-b bg-white bg-opacity-40">
            {["competitions", "achievements", "records", "athletes"].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setSection(sec);
                  setEditItem(null);
                }}
                className={`px-4 py-2 rounded ${
                  sec === section ? "bg-blue-700 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {sec.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-4">
            {/* List View */}
            {section && !editItem && (
              <>
                <div className="flex justify-between mb-3">
                  <h3 className="text-xl font-semibold">{section.toUpperCase()}</h3>
                  <button
                    onClick={() => setEditItem({})}
                    className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>

                {data.length === 0 && <div className="text-center text-gray-600">No data found.</div>}

                <div>
                  {data.map(item => (
                    <div
                      key={item._id || item.id}
                      className="p-3 mb-3 bg-white bg-opacity-70 rounded flex justify-between items-center shadow"
                    >
                      <span>{item.title || item.name || item.category || "Untitled"}</span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditItem(item)}
                          className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id || item.id)}
                          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Edit Form */}
            {editItem && (
              <div className="bg-white bg-opacity-80 rounded p-6 shadow-lg animate-slide-up">
                <h3 className="text-xl font-semibold mb-4">{editItem._id ? "Edit" : "Add"} {section}</h3>

                {/* Competition form */}
                {section === "competitions" && (
                  <>
                    <input
                      className="mb-3 p-2 border rounded w-full"
                      placeholder="Key"
                      value={editItem.key || ""}
                      onChange={e => setEditItem({ ...editItem, key: e.target.value })}
                    />
                    <input
                      className="mb-3 p-2 border rounded w-full"
                      placeholder="Title"
                      value={editItem.title || ""}
                      onChange={e => setEditItem({ ...editItem, title: e.target.value })}
                    />
                    <input
                      className="mb-3 p-2 border rounded w-full"
                      placeholder="Gradient (e.g., from-pink-500 to-red-500)"
                      value={editItem.gradient || ""}
                      onChange={e => setEditItem({ ...editItem, gradient: e.target.value })}
                    />
                    <textarea
                      className="mb-3 p-2 border rounded w-full"
                      placeholder="Description"
                      value={editItem.description || ""}
                      onChange={e => setEditItem({ ...editItem, description: e.target.value })}
                    />

                    <select
                      className="mb-3 p-2 border rounded w-full"
                      value={editItem.status || "upcoming"}
                      onChange={e => setEditItem({ ...editItem, status: e.target.value })}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="present">Present</option>
                      <option value="past">Past</option>
                    </select>

                    {editItem.status === "upcoming" && (
                      <input
                        className="mb-3 p-2 border rounded w-full"
                        placeholder="Eligibility (comma separated)"
                        value={(editItem.upcomingEventDetails?.eligibility || []).join(", ")}
                        onChange={e => setEditItem({
                          ...editItem,
                          upcomingEventDetails: {
                            ...editItem.upcomingEventDetails,
                            eligibility: e.target.value.split(",").map(i => i.trim())
                          }
                        })}
                      />
                    )}

                    <div>
                      <button
                        className="mb-3 px-3 py-1 bg-green-500 rounded text-white"
                        onClick={addNewYear}
                      >
                        Add Year
                      </button>

                      {editItem.years?.map((year, yidx) => (
                        <div key={yidx} className="mb-4 border p-4 rounded bg-gray-100">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="number"
                              value={year.year}
                              onChange={e => {
                                const newYears = [...(editItem.years || [])];
                                newYears[yidx].year = Number(e.target.value);
                                setEditItem({ ...editItem, years: newYears });
                              }}
                              className="border p-2 rounded w-20"
                            />
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded"
                              onClick={() => removeYear(yidx)}
                            >
                              Remove Year
                            </button>
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                              onClick={() => addEventType(yidx)}
                            >
                              Add Event Type
                            </button>
                          </div>

                          {year.eventTypes?.map((etype, eidx) => (
                            <div key={eidx} className="mb-4 pl-6 bg-white rounded p-3 shadow">
                              <div className="flex items-center gap-3 mb-2">
                                <input
                                  value={etype.typeName}
                                  onChange={e => {
                                    const newYears = [...(editItem.years || [])];
                                    newYears[yidx].eventTypes[eidx].typeName = e.target.value;
                                    setEditItem({ ...editItem, years: newYears });
                                  }}
                                  className="border p-2 rounded w-full"
                                />
                                <button
                                  className="bg-red-500 text-white px-3 py-1 rounded"
                                  onClick={() => removeEventType(yidx, eidx)}
                                >
                                  Remove Event Type
                                </button>
                                <button
                                  className="bg-green-600 text-white px-3 py-1 rounded"
                                  onClick={() => addEvent(yidx, eidx)}
                                >
                                  Add Event
                                </button>
                              </div>

                              {etype.events?.map((event, evidx) => (
                                <div key={evidx} className="mb-4 pl-6 bg-gray-50 rounded p-3 shadow">
                                  <div className="flex items-center gap-3 mb-2">
                                    <input
                                      value={event.name}
                                      onChange={e => {
                                        const newYears = [...(editItem.years || [])];
                                        newYears[yidx].eventTypes[eidx].events[evidx].name = e.target.value;
                                        setEditItem({ ...editItem, years: newYears });
                                      }}
                                      className="border p-2 rounded w-full"
                                    />
                                    <button
                                      className="bg-red-500 text-white px-3 py-1 rounded"
                                      onClick={() => removeEvent(yidx, eidx, evidx)}
                                    >
                                      Remove Event
                                    </button>
                                    <button
                                      className="bg-green-600 text-white px-3 py-1 rounded"
                                      onClick={() => addResult(yidx, eidx, evidx)}
                                    >
                                      Add Result
                                    </button>
                                  </div>

                                  {event.results?.map((result, ridx) => (
                                    <div key={ridx} className="mb-3 pl-6 bg-white rounded p-2 shadow flex flex-wrap gap-2 items-center">
                                      <input
                                        placeholder="Position"
                                        value={result.position}
                                        onChange={e => {
                                          const newYears = [...(editItem.years || [])];
                                          newYears[yidx].eventTypes[eidx].events[evidx].results[ridx].position = e.target.value;
                                          setEditItem({ ...editItem, years: newYears });
                                        }}
                                        className="border p-2 rounded w-24"
                                      />
                                      <input
                                        placeholder="Athlete"
                                        value={result.athlete}
                                        onChange={e => {
                                          const newYears = [...(editItem.years || [])];
                                          newYears[yidx].eventTypes[eidx].events[evidx].results[ridx].athlete = e.target.value;
                                          setEditItem({ ...editItem, years: newYears });
                                        }}
                                        className="border p-2 rounded w-40"
                                      />
                                      <input
                                        placeholder="Result"
                                        value={result.result}
                                        onChange={e => {
                                          const newYears = [...(editItem.years || [])];
                                          newYears[yidx].eventTypes[eidx].events[evidx].results[ridx].result = e.target.value;
                                          setEditItem({ ...editItem, years: newYears });
                                        }}
                                        className="border p-2 rounded w-24"
                                      />
                                      <input
                                        type="number"
                                        placeholder="Points"
                                        value={result.points}
                                        onChange={e => {
                                          const newYears = [...(editItem.years || [])];
                                          newYears[yidx].eventTypes[eidx].events[evidx].results[ridx].points = Number(e.target.value);
                                          setEditItem({ ...editItem, years: newYears });
                                        }}
                                        className="border p-2 rounded w-20"
                                      />
                                      <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => removeResult(yidx, eidx, evidx, ridx)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditItem(null)}
                        className="bg-gray-400 px-5 py-2 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}

                {/* Add forms for Achievements, Records, Athletes same way */}

              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
