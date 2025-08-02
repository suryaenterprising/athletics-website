// frontend/src/components/AthletesLanding.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AthletesLanding.css"; // You can create this for styling

const AthletesLanding = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/athletes/${category}`);
  };

  return (
    <div className="athletes-landing">
      <h2 className="heading">Meet Our Athletes</h2>
      <div className="cards-container">
        {["student", "alumni", "coach"].map((category) => (
          <div
            key={category}
            className="card"
            onClick={() => handleCardClick(category)}
          >
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <p>Click to view and submit profiles</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AthletesLanding;
