import React, { useState, useEffect } from "react";

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("All");

  // Sample athlete data (replace with API later)
  useEffect(() => {
    setAthletes([
      {
        name: "Bhukya Suresh",
        photo: "suresh profile.jpg",
        events: ["100m", "200m"],
        achievements: ["Gold - Inter IIT 2023", "Silver - Lakshya 2024"],
        year: "2023"
      },
      {
        name: "Megha Patel",
        photo: "megha.jpg",
        events: ["Long Jump", "4x100m Relay"],
        achievements: ["Bronze - IIT vs IIM 2023"],
        year: "2023"
      },
      {
        name: "Ajay Kumar",
        photo: "ajay.jpg",
        events: ["400m", "800m"],
        achievements: ["Gold - Lakshya 2024", "Gold - Inter Hostel 2023"],
        year: "2024"
      }
    ]);
  }, []);

  const filteredAthletes = athletes.filter((a) =>
    (filterYear === "All" || a.year === filterYear) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{ background: "#0d1b2a", padding: "40px 20px" }}>
      <h2 style={{ color: "#00ffcc", fontSize: "2.5em", textAlign: "center", marginBottom: "20px" }}>
        Athletes
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px"
          }}
        />
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        >
          <option value="All">All Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {filteredAthletes.map((athlete, idx) => (
          <div key={idx} style={{
            background: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            color: "#000"
          }}>
            <img src={athlete.photo} alt={athlete.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px", color: "#0d1b2a" }}>{athlete.name}</h3>
              <p><strong>Events:</strong> {athlete.events.join(", ")}</p>
              <p><strong>Achievements:</strong></p>
              <ul>
                {athlete.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
              </ul>
              <p><strong>Year:</strong> {athlete.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
