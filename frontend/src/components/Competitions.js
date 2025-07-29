import React, { useState } from "react";

export default function Competitions() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  const competitions = [
    { title: "Inter IIT", image: "interiit.jpg", description: "Nation-wide meet across IITs." },
    { title: "T vs M", image: "tvsm.jpg", description: "Techies vs Managers clash." },
    { title: "Lakshya", image: "lakshya.jpg", description: "Annual sports festival." },
    { title: "Inter Hostel", image: "hostel.jpg", description: "Hostel-wide competitions." },
    { title: "General Championship", image: "gc.jpg", description: "Overall annual GC battle." },
    { title: "Marathon", image: "marathon.jpg", description: "Campus Marathon & runs." },
    { title: "More", image: "more.jpg", description: "Other competitions." },
  ];

  const years = ["2023", "2024", "2025", "2026", "2027"];
  const events = ["100m", "200m", "400m", "800m", "1500m", "5000m", "Javelin Throw", "Discus Throw", "Shot Put", "100m Hurdles", "400m Hurdles", "4x100m Relay", "4x400m Relay", "Long Jump", "High Jump"];

  const sampleData = [
    { rank: 1, name: "Athlete 1", result: "11.10s" },
    { rank: 2, name: "Athlete 2", result: "11.35s" },
    { rank: 3, name: "Athlete 3", result: "11.50s" },
    { rank: 4, name: "Athlete 4", result: "11.62s" },
    { rank: 5, name: "Athlete 5", result: "11.70s" },
  ];

  const openModal = (title) => {
    setActiveModal(title);
    setActiveYear(null);
    setActiveEvent(null);
  };

  const renderTable = () => (
    <div className="table-section">
      {["Boys", "Girls"].map((gender) => (
        <table key={gender} className="record-table">
          <thead>
            <tr><th colSpan="3">{gender}</th></tr>
            <tr><th>Rank</th><th>Name</th><th>Result</th></tr>
          </thead>
          <tbody>
            {sampleData.map((entry, i) => (
              <tr key={i}>
                <td>{entry.rank}</td>
                <td>{entry.name}</td>
                <td>{entry.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );

  return (
    <section style={{ background: '#0a0e1a', padding: '50px 20px' }}>
      <h2 style={{ textAlign: 'center', color: '#00ffcc', fontSize: '2.5rem' }}>Competitions</h2>

      <div className="card-grid">
        {competitions.map((comp, i) => (
          <div
            key={i}
            className="comp-card"
            style={{ backgroundImage: `url(${comp.image})` }}
            onClick={() => openModal(comp.title)}
          >
            <div className="overlay"></div>
            <h3>{comp.title}</h3>
          </div>
        ))}
      </div>

      {activeModal && (
        <div className="modal">
          <h3>{activeModal}</h3>
          <p style={{ color: '#ccc' }}>{competitions.find(c => c.title === activeModal)?.description}</p>

          <div className="years">
            {years.map((y, idx) => (
              <button key={idx} onClick={() => setActiveYear(y)} className={activeYear === y ? 'active' : ''}>{y}</button>
            ))}
          </div>

          {activeYear && (
            <div className="events">
              {events.map((ev, i) => (
                <span key={i} className={activeEvent === ev ? 'event active' : 'event'} onClick={() => setActiveEvent(ev)}>{ev}</span>
              ))}
            </div>
          )}

          {activeEvent && renderTable()}

          <button className="close-btn" onClick={() => setActiveModal(null)}>Close</button>
        </div>
      )}

      <style>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .comp-card {
          height: 180px;
          border-radius: 12px;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 1.4em;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .comp-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0,255,170,0.5);
        }

        .comp-card .overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
        }

        .comp-card h3 {
          position: relative;
          z-index: 1;
        }

        .modal {
          margin-top: 40px;
          background: #141f2e;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 0 10px #00ffcc;
        }

        .years button {
          background: #00ffcc;
          margin: 8px;
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .years .active {
          background: #00b894;
          color: white;
        }

        .events {
          display: flex;
          flex-wrap: wrap;
          margin-top: 15px;
          gap: 10px;
        }

        .event {
          background: #00ffaa;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
        }

        .event.active {
          background: #00b894;
          color: white;
        }

        .table-section {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .record-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          width: 300px;
        }

        .record-table th, .record-table td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ccc;
        }

        .record-table th {
          background: #00ffcc;
        }

        .close-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background: crimson;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
