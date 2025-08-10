import React, { useState } from "react";

const TABS = [
  { key: "best", label: "Best Ever" },
  { key: "2023", label: "2023" },
  { key: "2024", label: "2024" },
  { key: "2025", label: "2025" }
];

const BEST_RECORDS = {
  track: [
    { event: "100m Dash", record: "10.8s", athlete: "Rohan Sharma", year: "2023" },
    { event: "200m Dash", record: "22.1s", athlete: "Vikram Joshi", year: "2021" },
    { event: "400m Dash", record: "49.5s", athlete: "Neha Gupta", year: "2017" },
    { event: "800m Run", record: "1:58.3", athlete: "Anjali Mishra", year: "2019" },
    { event: "1500m Run", record: "4:05.7", athlete: "Amit Patel", year: "2022" }
  ],
  field: [
    { event: "Long Jump", record: "7.2m", athlete: "Amit Patel", year: "2022" },
    { event: "High Jump", record: "2.05m", athlete: "Rahul Verma", year: "2015" },
    { event: "Triple Jump", record: "14.8m", athlete: "Rahul Verma", year: "2016" },
    { event: "Javelin Throw", record: "58.3m", athlete: "Priya Singh", year: "2023" },
    { event: "Shot Put", record: "14.5m", athlete: "Priya Singh", year: "2023" }
  ]
};

export default function Records() {
  const [activeTab, setActiveTab] = useState("best");

  const renderTable = (records) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Event</th>
            <th className="py-3 px-4 text-left">Record</th>
            <th className="py-3 px-4 text-left">Athlete</th>
            <th className="py-3 px-4 text-left">Year</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-blue-50">
              <td className="py-3 px-4">{rec.event}</td>
              <td className="py-3 px-4">{rec.record}</td>
              <td className="py-3 px-4">{rec.athlete}</td>
              <td className="py-3 px-4">{rec.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section id="records" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-900">
          Records
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
           {TABS.map(tab => (
  <button
    key={tab.key}
    className={`${activeTab === tab.key ? "bg-blue-600 text-white" : "bg-white text-blue-600"} px-6 py-2 rounded-lg transition`}
    onClick={() => setActiveTab(tab.key)}
  >
    {tab.label}
  </button>
))}

    
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "best" && (
          <div className="glass p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Best Ever Records at IIT Indore
            </h3>
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-blue-800">Track Events</h4>
              {renderTable(BEST_RECORDS.track)}
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-blue-800">Field Events</h4>
              {renderTable(BEST_RECORDS.field)}
            </div>
          </div>
        )}

        {activeTab !== "best" && (
          <div className="glass p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Records Set in {activeTab}
            </h3>
            <p className="text-center">{activeTab} records will be displayed here</p>
          </div>
        )}
      </div>
    </section>
  );
}