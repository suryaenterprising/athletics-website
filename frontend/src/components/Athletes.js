// src/components/Athletes.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Athletes.css";

export default function Athletes() {
  const [activeCategory, setActiveCategory] = useState("student");
  const [profiles, setProfiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Replace with real auth logic

  const categories = [
    { label: "Students", value: "student" },
    { label: "Alumni", value: "alumni" },
    { label: "Coaches", value: "coach" }
  ];

  useEffect(() => {
    fetchProfiles();
  }, [activeCategory]);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(
        `https://your-backend-url.com/api/athletes/${activeCategory}`
      );
      setProfiles(res.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      await axios.delete(`https://your-backend-url.com/api/athletes/${id}`);
      fetchProfiles(); // Refresh list
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <section id="athletes" className="athletes-section">
      <h2>Athletes</h2>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`category-card ${activeCategory === cat.value ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="profiles">
        {profiles.map((person) => (
          <div key={person._id} className="profile-card">
            <img src={person.photo} alt={person.name} />
            <h3>{person.name}</h3>
            <p><strong>Department:</strong> {person.department}</p>
            <p><strong>Events:</strong> {person.events?.join(", ")}</p>
            <p><strong>Achievements:</strong> {person.achievements?.join(", ")}</p>
            {isAdmin && (
              <div className="admin-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(person._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
