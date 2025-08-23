// src/components/Competitions.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI State for navigation
  const [selectedComp, setSelectedComp] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/competitions`).then(res => {
      setCompetitions(res.data.data || []);
      setLoading(false);
    });
  }, []);

  // Glass card CSS
  const glassCard = "rounded-3xl bg-white bg-opacity-40 shadow-2xl backdrop-blur-lg border border-white/20 transition-all duration-500 hover:scale-105 hover:-rotate-2";
  
  // Dynamic years based on selected competition
  const years = selectedComp?.years?.map(y => y.year) || [];

  // Find upcoming event info
  const upcoming = competitions.find(c => c.upcomingEventDetails?.date) || {};

  return (
    <div className="relative">
      {/* Parallax Section BG */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 via-orange-200 to-red-500 opacity-50 parallax-bg"></div>
      
      <section id="competitions" className="py-20 px-4 md:px-8 flex flex-col gap-12 min-h-screen animate-fadeIn">
        {/* --- Glassmorphic Upcoming Card --- */}
        <div className={`mx-auto mb-8 p-6 md:max-w-lg w-full ${glassCard} flex flex-col items-center`}>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">Upcoming Competition</h3>
          <div className="text-lg text-gray-900 mb-2">
            {upcoming.upcomingEventDetails?.description || "No event announced yet."}
          </div>
          <div className="text-md text-blue-700">
            {upcoming.upcomingEventDetails?.date ? (
              <>
                <span className="font-bold">{upcoming.upcomingEventDetails?.date}</span> | {upcoming.upcomingEventDetails?.venue}
              </>
            ) : ""}
          </div>
        </div>

        {/* --- Animated 3D Competition Boxes --- */}
        {!selectedComp && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-center">
            {["T vs M", "Inter IIT", "Lakshya", "Shaurya", "Marathons"].map((name, idx) => {
              const comp = competitions.find(c => c.title === name) || {};
              return (
                <div
                  key={name}
                  className={`
                    group cursor-pointer font-bold text-lg text-white
                    rounded-xl shadow-2xl p-7 flex flex-col items-center 
                    bg-gradient-to-tr ${comp.gradient || "from-blue-500 to-blue-300"}
                    animated-card
                  `}
                  onClick={() => setSelectedComp(comp)}
                >
                  {name}
                  <span className="mt-2 text-xs font-normal">{comp.description || ""}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* --- Year Selection --- */}
        {selectedComp && !selectedYear && (
          <div className="flex flex-wrap justify-center gap-5 mt-8">
            {years.map((yr) => (
              <button
                key={yr}
                className="rounded-xl bg-gradient-to-r from-blue-400 to-red-400 px-7 py-3 font-bold text-xl text-white shadow-xl hover:scale-105 hover:rotate-1 transition-all animated-card"
                onClick={() => setSelectedYear(yr)}
              >
                {yr}
              </button>
            ))}
            <button className="text-sm text-gray-500 ml-6 px-2 py-1" onClick={() => setSelectedComp(null)}>Back</button>
          </div>
        )}

        {/* --- Event Types --- */}
        {selectedYear && !selectedType && (
          <div className="flex flex-wrap gap-10 justify-center mt-8">
            {["Track Events", "Field Events"].map(type =>
              <button
                key={type}
                className="bg-gradient-to-tl from-orange-400 to-blue-600 px-9 py-4 rounded-2xl font-semibold text-lg text-white shadow-lg hover:scale-105 hover:-rotate-3 transition animated-card"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            )}
            <button className="text-sm text-gray-500 ml-6 px-2 py-1" onClick={() => setSelectedYear(null)}>Back</button>
          </div>
        )}

        {/* --- Event List --- */}
        {selectedType && !selectedEvent && (
          <div className="flex flex-wrap gap-6 justify-center mt-8">
            {(selectedComp.years?.find(y => y.year === selectedYear)?.eventTypes?.find(t => t.typeName.toLowerCase() === selectedType.toLowerCase().split(' ')[0])?.events || []).map(evt =>
              <button
                key={evt.name}
                className="rounded-xl bg-gradient-to-bl from-blue-200 to-orange-300 px-6 py-3 shadow-md font-semibold text-blue-800 hover:scale-105 hover:rotate-1 transition-all animated-card"
                onClick={() => setSelectedEvent(evt)}
              >
                {evt.name}
              </button>
            )}
            <button className="text-sm text-gray-500 ml-6 px-2 py-1" onClick={() => setSelectedType(null)}>Back</button>
          </div>
        )}

        {/* --- Player Table --- */}
        {selectedEvent && (
          <div className={`mx-auto w-full md:max-w-2xl ${glassCard} p-6 animated-card`}>
            <h4 className="text-xl font-bold text-blue-700">{selectedEvent.name} - Players</h4>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white bg-opacity-80 rounded shadow-md font-mono text-sm">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-2 px-3 text-left">Position</th>
                    <th className="py-2 px-3 text-left">Athlete</th>
                    <th className="py-2 px-3 text-left">Result</th>
                    <th className="py-2 px-3 text-left">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.results?.map((r, idx) => (
                    <tr key={idx} className="animated-table-row">
                      <td className="py-2 px-3">{r.position}</td>
                      <td className="py-2 px-3">{r.athlete}</td>
                      <td className="py-2 px-3">{r.result}</td>
                      <td className="py-2 px-3">{r.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800 transition" onClick={() => {
              setSelectedEvent(null);
              setSelectedType(null);
              setSelectedYear(null);
              setSelectedComp(null);
            }}>Back to Competitions</button>
          </div>
        )}
      </section>
    </div>
  );
}
