// frontend/src/pages/AthleteCategoryPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const AthleteCategoryPage = () => {
  const { category } = useParams();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get(`https://your-backend-url.com/api/athletes/${category}`)
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error("Error fetching profiles:", err));
  }, [category]);

  return (
    <div className="category-page">
      <h2>{category.toUpperCase()} Profiles</h2>
      <Link to={`/submit-profile?category=${category}`}>
        <button>Submit Your Profile</button>
      </Link>
      <div className="profiles">
        {profiles.map((p) => (
          <div className="profile-card" key={p._id}>
            <img src={p.photo} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.department}</p>
            <p>{p.events?.join(", ")}</p>
            <p>{p.achievements?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AthleteCategoryPage;
