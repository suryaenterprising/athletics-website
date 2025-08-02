import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Athletes.css"; // create custom styles

const API_URL = "https://your-backend-url.com/api/athletes"; // replace with your backend URL

export default function Athletes() {
  const [activeTab, setActiveTab] = useState("student");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, [activeTab]);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/${activeTab}`);
      setProfiles(res.data);
    } catch (err) {
      console.error("Failed to fetch profiles", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this profile?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProfiles();
      } catch (err) {
        console.error("Error deleting profile", err);
      }
    }
  };

  const renderCategoryCards = () => (
    <div className="athlete-cards">
      {["student", "alumni", "coach"].map((type) => (
        <div
          key={type}
          className={`athlete-card ${activeTab === type ? "active" : ""}`}
          onClick={() => setActiveTab(type)}
        >
          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        </div>
      ))}
    </div>
  );

  return (
    <section id="athletes" className="athletes-section">
      <h2>Athletes</h2>
      {renderCategoryCards()}
      <div className="profiles">
        {profiles.map((person) => (
          <div key={person._id} className="profile-card">
            <img src={person.photo} alt={person.name} />
            <h3>{person.name}</h3>
            <p>{person.department}</p>
            <p>{person.events?.join(", ")}</p>
            <p>{person.achievements}</p>
            <button onClick={() => handleDelete(person._id)}>Delete</button>
          </div>
        ))}
      </div>
      <a href={`/submit-profile?category=${activeTab}`} className="submit-link">
        + Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </a>
    </section>
  );
}
