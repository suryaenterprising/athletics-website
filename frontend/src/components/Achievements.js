import React, { useState } from "react";

export default function Achievements() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  const cards = [
    { title: "Ever Best Records", image: "bestrecords.jpg", desc: "Accepted Best Performances." },
    { title: "IIT vs IIM", image: "iitvsiim.jpg", desc: "Overall cup records in IIT vs IIM." },
    { title: "Lakshya", image: "lakshya.jpg", desc: "Annual records from Lakshya Meet." }
  ];

  const events = [
    "100m", "200m", "400m", "800m", "1500m", "5000m", "Discus Throw", "Javelin Throw",
    "Shotput", "Long Jump", "High Jump", "110m Hurdles", "400m Hurdles",
    "4x100m Relay", "4x400m Relay"
  ];

  const sampleData = Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    name: `Athlete ${i + 1}`,
    result: `${(10 + i * 0.3).toFixed(2)}s`,
    remarks: i % 2 === 0 ? "Strong Finish" : "Personal Best"
  }));

  const handleCardClick = (title) => {
    setActiveCard(title === activeCard ? null : title);
    setActiveEvent(null);
  };

  const handleEventClick = (event) => {
    setActiveEvent(event === activeEvent ? null : event);
  };

  const renderTable = () => (
    <div className="table-container">
      {['Boys', 'Girls'].map((gender) => (
        <table key={gender} className="record-table">
          <thead>
            <tr><th colSpan="4">{gender}</th></tr>
            <tr><th>Rank</th><th>Name</th><th>Result</th><th>Remarks</th></tr>
          </thead>
          <tbody>
            {sampleData.map((entry, i) => (
              <tr key={i}>
                <td>{entry.rank}</td>
                <td>{`${gender} ${entry.name}`}</td>
                <td>{entry.result}</td>
                <td>{entry.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );

  return (
    <section style={{ background: '#0d1b2a', padding: '40px 20px' }}>
      <h2 style={{ color: '#00ffcc', fontSize: '2.5em', textAlign: 'center', marginBottom: '20px' }}>Achievements</h2>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="achievement-card"
            style={{ backgroundImage: `url(${card.image})` }}
            onClick={() => handleCardClick(card.title)}
          >
            <div className="overlay"></div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>

      {activeCard && (
        <div className="events-section">
          <h3 style={{ color: '#00ffcc', marginTop: '20px' }}>{activeCard} Events</h3>
          <div className="events-grid">
            {events.map((event, idx) => (
              <span
                key={idx}
                className={`event-pill ${activeEvent === event ? 'active' : ''}`}
                onClick={() => handleEventClick(event)}
              >
                {event}
              </span>
            ))}
          </div>
          {activeEvent && renderTable()}
        </div>
      )}

      <style>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 15px;
        }

        .achievement-card {
          position: relative;
          height: 200px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          color: white;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0,0,0,0.4);
          background-size: cover;
          background-position: center;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
        }

        .achievement-card:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,255,106,0.5);
        }

        .achievement-card .overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          transition: background 0.3s ease;
        }

        .achievement-card:hover .overlay {
          background: rgba(0,0,0,0.2);
        }

        .achievement-card h3, .achievement-card p {
          position: relative;
          z-index: 1;
        }

        .events-section {
          text-align: center;
        }

        .events-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
        }

        .event-pill {
          background: #00ffcc;
          color: black;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .event-pill.active, .event-pill:hover {
          background: #00b894;
          color: white;
        }

        .table-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 30px;
          margin-top: 20px;
        }

        .record-table {
          width: 340px;
          background: white;
          color: black;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #ccc;
        }

        .record-table th, .record-table td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }

        .record-table th {
          background: #00ffcc;
          color: black;
        }
      `}</style>
    </section>
  );
}
