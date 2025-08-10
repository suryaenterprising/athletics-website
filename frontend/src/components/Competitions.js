import React, { useState } from "react";

// Static data as in HTML (extend if you want more realism)
const COMPETITIONS = [
  {
    key: "tvm",
    title: "T vs M",
    desc: "The annual Technology vs Management sports competition between IIT Indore and IIM Indore.",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    key: "interiit",
    title: "Inter IIT",
    desc: "The prestigious annual sports meet between all Indian Institutes of Technology.",
    gradient: "from-red-500 to-red-700",
  },
  {
    key: "lakshya",
    title: "Lakshya",
    desc: "The institute's annual sports festival with various athletic events and competitions.",
    gradient: "from-green-500 to-green-700",
  },
  {
    key: "shaurya",
    title: "Shaurya",
    desc: "The inter-hostel sports competition showcasing athletic talent across hostels.",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    key: "marathons",
    title: "Marathons",
    desc: "Various marathon events organized throughout the year for fitness enthusiasts.",
    gradient: "from-orange-500 to-orange-700",
  },
];

const COMPETITION_YEARS = ["2023", "2024", "2025", "2026"];
const EVENT_TYPES = [
  {
    key: "track",
    label: "Track Events",
    color: "bg-green-100 hover:bg-green-200 text-green-800",
  },
  {
    key: "field",
    label: "Field Events",
    color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
  },
];

const TRACK_EVENTS = [
  "100m Dash",
  "200m Dash",
  "400m Dash",
  "800m Run",
  "1500m Run",
  "5000m Run",
  "110m Hurdles",
  "4x100m Relay",
  "4x400m Relay",
];
const FIELD_EVENTS = [
  "Long Jump",
  "High Jump",
  "Triple Jump",
  "Pole Vault",
  "Shot Put",
  "Discus Throw",
  "Javelin Throw",
  "Hammer Throw",
  "Decathlon",
];

// Dummy result data for display only
const SAMPLE_RESULTS = [
  { position: "Gold", athlete: "Rohan Sharma", result: "10.8s", points: "10" },
  { position: "Silver", athlete: "Amit Patel", result: "11.2s", points: "8" },
  { position: "Bronze", athlete: "Vikram Joshi", result: "11.5s", points: "6" },
  { position: "4th", athlete: "Neha Gupta", result: "11.7s", points: "4" },
  { position: "5th", athlete: "Priya Singh", result: "11.9s", points: "2" },
];

export default function Competitions() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [chosenComp, setChosenComp] = useState(null);
  const [chosenYear, setChosenYear] = useState(null);
  const [chosenType, setChosenType] = useState(null);
  const [chosenEvent, setChosenEvent] = useState(null);

  const beginDetail = (compKey) => {
    setChosenComp(compKey);
    setDetailsOpen(true);
    setChosenYear(null);
    setChosenType(null);
    setChosenEvent(null);
    setTimeout(() => {
      const anchor = document.getElementById("competitionDetails");
      if (anchor)
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  const compTitle =
    COMPETITIONS.find((c) => c.key === chosenComp)?.title || "";
  const compYears = COMPETITION_YEARS;
  const events =
    chosenType === "track"
      ? TRACK_EVENTS
      : chosenType === "field"
      ? FIELD_EVENTS
      : [];

  function handleBack() {
    if (chosenEvent) setChosenEvent(null);
    else if (chosenType) setChosenType(null);
    else if (chosenYear) setChosenYear(null);
    else setDetailsOpen(false);
  }

  return (
    <section
      id="competitions"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white relative"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-900">
          Competitions
        </h2>

        {/* Upcoming Competition Card */}
        <div className="glass p-6 rounded-xl shadow-lg mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Inter-IIT Logo"
                className="rounded-lg w-full"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                Inter-IIT Sports Meet 2023
              </h3>
              <div className="flex items-center text-blue-600 mb-4">
                <i className="fas fa-calendar-alt mr-2"></i> December 15-22,
                2023
              </div>
              <div className="flex items-center text-blue-600 mb-4">
                <i className="fas fa-map-marker-alt mr-2"></i> IIT Bombay,
                Mumbai
              </div>
              <p className="text-gray-700 mb-6">
                The prestigious annual sports competition between all IITs. Our
                athletes are training hard to bring glory to IIT Indore.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Athletics
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Swimming
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Basketball
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  More...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Competition Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPETITIONS.map((comp) => (
            <div
              key={comp.key}
              className={`box-3d bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer`}
              onClick={() => beginDetail(comp.key)}
              tabIndex={0}
              aria-label={`See details for ${comp.title}`}
            >
              <div
                className={`h-48 bg-gradient-to-r ${comp.gradient} flex items-center justify-center`}
              >
                <h3 className="text-2xl font-bold text-white text-center">
                  {comp.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{comp.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Drilldown Details */}
        <div
          id="competitionDetails"
          className={`mt-12 transition-all duration-300 ${
            detailsOpen ? "" : "hidden"
          }`}
        >
          <div className="glass p-6 rounded-xl">
            {/* 1. Select Year */}
            {!chosenYear && (
              <div>
                <h3 className="text-xl font-bold mb-4">Select Year:</h3>
                <div className="flex flex-wrap gap-4">
                  {compYears.map((y) => (
                    <button
                      key={y}
                      className="year-btn bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition"
                      onClick={() => setChosenYear(y)}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Select Event Type */}
            {chosenYear && !chosenType && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Select Event Type:</h3>
                <div className="flex gap-4">
                  {EVENT_TYPES.map((t) => (
                    <button
                      key={t.key}
                      className={`type-btn ${t.color} px-4 py-2 rounded-lg transition`}
                      onClick={() => setChosenType(t.key)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Events List */}
            {chosenType && !chosenEvent && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Events:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {events.map((name) => (
                    <button
                      key={name}
                      className="event-btn bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition"
                      onClick={() => setChosenEvent(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Event Results */}
            {chosenEvent && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Results:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">Position</th>
                        <th className="py-3 px-4 text-left">Athlete</th>
                        <th className="py-3 px-4 text-left">Time/Distance</th>
                        <th className="py-3 px-4 text-left">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_RESULTS.map((r, i) => (
                        <tr
                          className="border-b border-gray-200 hover:bg-blue-50"
                          key={i}
                        >
                          <td className="py-3 px-4">{r.position}</td>
                          <td className="py-3 px-4">{r.athlete}</td>
                          <td className="py-3 px-4">{r.result}</td>
                          <td className="py-3 px-4">{r.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Back Button */}
            <button
              className={`mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition ${
                chosenYear === null ? "hidden" : ""
              }`}
              onClick={handleBack}
            >
              <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
