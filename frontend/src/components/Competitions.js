// src/components/Competitions.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const COMPETITION_KEYS = ["tvm", "interiit", "lakshya", "shaurya", "marathons"];

export default function Competitions() {
  const [loading, setLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([]);
  const [present, setPresent] = useState([]);
  const [selectedComp, setSelectedComp] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch upcoming and present competitions separately
    const fetchData = async () => {
      try {
        const [upRes, presRes] = await Promise.all([
          axios.get(`${API_URL}/api/competitions?status=upcoming`),
          axios.get(`${API_URL}/api/competitions?status=present`)
        ]);
        setUpcoming(upRes.data.data);
        setPresent(presRes.data.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const glassCard = "rounded-3xl bg-white bg-opacity-30 backdrop-blur-lg border border-white/30 shadow-lg transition-transform transform hover:scale-105 hover:rotate-3";

  // Filter competitions objects for main 5 keys
  const mainComps = [...upcoming, ...present].filter(c => COMPETITION_KEYS.includes(c.key));

  // Find competition object by key from either upcoming or present
  const findCompetitionByKey = (key) => {
    return upcoming.find(c => c.key === key) || present.find(c => c.key === key);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto bg-gradient-to-b from-blue-100 to-white min-h-screen relative">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">Competitions</h1>

      {/* Sub headings: Upcoming and Present */}
      <div className="flex justify-center gap-12 mb-12">
        <button
          onClick={() => {
            setSelectedComp(null);
            setSelectedYear(null);
            setSelectedType(null);
            setSelectedEvent(null);
          }}
          className="font-semibold text-blue-700 underline hover:text-blue-900"
        >
          View All
        </button>
        <button
          onClick={() => setSelectedComp("upcoming")}
          className="font-semibold text-green-700 hover:text-green-900"
        >
          Upcoming Competitions
        </button>
        <button
          onClick={() => setSelectedComp("present")}
          className="font-semibold text-red-700 hover:text-red-900"
        >
          Present Competitions
        </button>
      </div>

      {/* Section for Upcoming Competitions */}
      {selectedComp === "upcoming" && (
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {upcoming.map(comp => (
            <div key={comp._id} className={`${glassCard} p-6`}>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{comp.title}</h3>
              <p>{comp.upcomingEventDetails?.description}</p>
              <p><b>Date:</b> {comp.upcomingEventDetails?.date}</p>
              <p><b>Venue:</b> {comp.upcomingEventDetails?.venue}</p>
              <p>
                <b>Eligibility:</b> {comp.upcomingEventDetails?.eligibility?.join(", ") || "Open to all"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Section for Present Competitions */}
      {selectedComp === "present" && (
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {present.map(comp => (
            <div
              key={comp._id}
              className={`${glassCard} p-4 cursor-pointer`}
              onClick={() => setSelectedComp(comp)}
            >
              <h3 className="text-xl font-semibold text-red-900">{comp.title}</h3>
              <p>{comp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* When a present competition is selected, show participant results table */}
      {selectedComp && typeof selectedComp === "object" && selectedComp.status === "present" && (
        <>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Results - {selectedComp.title}</h2>
          {/* Iterate over years > event types > events > results & display in tables */}
          {selectedComp.years.map((year, yIdx) => (
            <div key={yIdx} className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Year: {year.year}</h3>
              {year.eventTypes.map((etype, eIdx) => (
                <div key={eIdx} className="mb-6">
                  <h4 className="text-lg font-semibold">{etype.typeName}</h4>
                  {etype.events.map((event, evIdx) => (
                    <div key={evIdx} className="mb-4 p-4 border rounded-lg shadow-sm bg-white bg-opacity-80">
                      <h5 className="font-semibold">{event.name}</h5>
                      <table className="min-w-full text-left text-sm border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="border px-3 py-1">Position</th>
                            <th className="border px-3 py-1">Athlete</th>
                            <th className="border px-3 py-1">Result</th>
                            <th className="border px-3 py-1">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.results?.map((r, rIdx) => (
                            <tr key={rIdx} className="border-b">
                              <td className="border px-3 py-1">{r.position}</td>
                              <td className="border px-3 py-1">{r.athlete}</td>
                              <td className="border px-3 py-1">{r.result}</td>
                              <td className="border px-3 py-1">{r.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
              <hr className="my-6"/>
            </div>
          ))}
          <button
            onClick={() => setSelectedComp(null)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back
          </button>
        </>
      )}

      {/* Five main competitions below (merged upcoming+present) */}
      {!selectedComp && (
        <>
          <h2 className="text-3xl my-8 font-semibold text-center text-blue-900">Main Competitions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
            {mainComps.map(comp => (
              <div
                key={comp.key}
                onClick={() => setSelectedComp(comp)}
                className={`cursor-pointer p-6 rounded-xl text-white shadow-xl bg-gradient-to-tr ${comp.gradient || 'from-blue-500 to-blue-700'} transition-transform transform hover:scale-105 hover:-rotate-4`}
              >
                <h3 className="text-xl font-bold text-center mb-2">{comp.title}</h3>
                <p className="text-sm text-center">{comp.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Drill down: when a 5 main competition selected (selectedComp is object) but not the years etc */}
      {selectedComp && typeof selectedComp === "object" && selectedComp.status !== "present" && (
        <DrillDownView competition={selectedComp} onBack={() => setSelectedComp(null)} />
      )}
    </section>
  );
}

/* DrillDownView Component */
function DrillDownView({ competition, onBack }) {
  const [year, setYear] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [event, setEvent] = React.useState(null);

  const years = competition.years || [];

  const eventTypes = year !== null
    ? years.find(y => y.year === year)?.eventTypes || []
    : [];

  const events = type !== null
    ? eventTypes.find(t => t.typeName === type)?.events || []
    : [];

  return (
    <>
      <button
        onClick={() => event ? setEvent(null) : type ? setType(null) : year ? setYear(null) : onBack()}
        className="mb-4 px-4 py-1 text-blue-900 font-semibold underline"
      >
        Back
      </button>
      {!year && (
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto text-center">
          {years.map(y => (
            <button
              key={y.year}
              onClick={() => setYear(y.year)}
              className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg py-3 shadow-lg hover:scale-105 transition-transform"
            >
              {y.year}
            </button>
          ))}
        </div>
      )}
      {year && !type && (
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-center">
          {eventTypes.map(t => (
            <button
              key={t.typeName}
              onClick={() => setType(t.typeName)}
              className="bg-gradient-to-tr from-orange-500 to-red-600 text-white rounded-lg py-3 shadow-lg hover:scale-105 transition-transform"
            >
              {t.typeName}
            </button>
          ))}
        </div>
      )}
      {type && !event && (
        <div className="max-w-md mx-auto">
          {events.map(ev => (
            <button
              key={ev.name}
              onClick={() => setEvent(ev)}
              className="block w-full bg-blue-200 hover:bg-blue-300 rounded-md py-2 my-2 font-semibold"
            >
              {ev.name}
            </button>
          ))}
        </div>
      )}
      {event && (
        <div className="overflow-x-auto max-w-3xl mx-auto p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-xl shadow-md">
          <h3 className="text-xl mb-4 text-blue-900">{event.name} Results</h3>
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-3 py-1 text-left">Position</th>
                <th className="border px-3 py-1 text-left">Athlete</th>
                <th className="border px-3 py-1 text-left">Result</th>
                <th className="border px-3 py-1 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {event.results?.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="border px-3 py-1">{r.position}</td>
                  <td className="border px-3 py-1">{r.athlete}</td>
                  <td className="border px-3 py-1">{r.result}</td>
                  <td className="border px-3 py-1">{r.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
