import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Athletes() {
  const [activeTab, setActiveTab] = useState("students");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, [activeTab]);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(
        `https://your-backend-url.com/api/athletes?type=${activeTab}`
      );
      setProfiles(res.data);
    } catch (err) {
      console.error("Failed to fetch profiles", err);
    }
  };

  return (
    <div id="athletes" className="athletes-section">
      <h2>Athletes</h2>
      <div className="tabs">
        {["students", "alumni", "coaches"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={activeTab === type ? "active" : ""}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="profiles">
        {profiles.map((person) => (
          <div key={person._id} className="profile-card">
            <img src={person.photo} alt={person.name} />
            <h3>{person.name}</h3>
            <p>{person.department}</p>
            <p>{person.events?.join(", ")}</p>
            <p>{person.achievements}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
