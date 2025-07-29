import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Data States
  const [achievements, setAchievements] = useState({ events: [], records: {} });
  const [competitions, setCompetitions] = useState({});
  const [athletes, setAthletes] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const API = "http://localhost:5000";

  /* ========= ✅ LOGIN ========= */
  const handleLogin = () => {
    if (password === "admin123") setLoggedIn(true);
    else alert("❌ Wrong Password!");
  };

  /* ========= ✅ LOAD ALL DATA ========= */
  const loadData = async () => {
    try {
      const ach = await axios.get(`${API}/achievements/events`);
      const comp = await axios.get(`${API}/competitions`);
      const ath = await axios.get(`${API}/athletes`);
      setAchievements(ach.data);
      setCompetitions(comp.data);
      setAthletes(ath.data);
    } catch (err) {
      console.error("Error loading data", err);
    }
  };

  useEffect(() => { if (loggedIn) loadData(); }, [loggedIn]);

  /* ========= ✅ SAVE ACHIEVEMENTS ========= */
  const saveAchievement = async (event, newData) => {
    await axios.post(`${API}/achievements/${event}`, newData);
    loadData();
  };

  /* ========= ✅ SAVE COMPETITIONS ========= */
  const saveCompetition = async (comp, year, event, newData) => {
    await axios.post(`${API}/competitions/${comp}/${year}/${event}`, newData);
    loadData();
  };

  /* ========= ✅ ADD OR UPDATE ATHLETE ========= */
  const saveAthlete = async (ath) => {
    if (ath.id) {
      // For editing: Delete old & Add new
      await axios.delete(`${API}/athletes/${ath.id}`);
    }
    await axios.post(`${API}/athletes`, ath);
    loadData();
  };

  /* ========= ✅ DELETE ATHLETE ========= */
  const deleteAthlete = async (id) => {
    await axios.delete(`${API}/athletes/${id}`);
    loadData();
  };

  /* ========= ✅ EDIT FORM ========= */
  const handleEditChange = (field, value) => {
    setEditItem({ ...editItem, [field]: value });
  };

  const handleSaveEdit = () => {
    if (editItem.type === "athlete") saveAthlete(editItem);
    // Similar logic can be extended for achievements & competitions edit
    setEditItem(null);
  };

  /* ========= ✅ RENDER ========= */
  if (!loggedIn) {
    return (
      <section style={styles.container}>
        <h2 style={styles.title}>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.btn} onClick={handleLogin}>Login</button>
      </section>
    );
  }

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Admin Panel</h2>

      {/* ========= ✅ EDIT FORM ========= */}
      {editItem && (
        <div style={styles.editBox}>
          <h3>Edit {editItem.type}</h3>
          {Object.keys(editItem).map((key) => key !== "type" && (
            <input
              key={key}
              style={styles.input}
              value={editItem[key]}
              onChange={(e) => handleEditChange(key, e.target.value)}
            />
          ))}
          <button style={styles.btn} onClick={handleSaveEdit}>Save</button>
          <button style={styles.btnDanger} onClick={() => setEditItem(null)}>Cancel</button>
        </div>
      )}

      {/* ========= ✅ ACHIEVEMENTS ========= */}
      <h3 style={styles.subTitle}>Achievements</h3>
      {achievements.events?.map((ev) => (
        <div key={ev} style={styles.card}>
          <h4>{ev}</h4>
          <button style={styles.btn} onClick={() => saveAchievement(ev, [{ rank: 1, name: "Updated", result: "10s" }])}>Update Sample</button>
        </div>
      ))}

      {/* ========= ✅ COMPETITIONS ========= */}
      <h3 style={styles.subTitle}>Competitions</h3>
      {Object.keys(competitions.records || {}).map((comp) => (
        <div key={comp} style={styles.card}>
          <h4>{comp}</h4>
          <button style={styles.btn} onClick={() => saveCompetition(comp, "2023", "100m", [{ rank: 1, name: "Updated", result: "11s" }])}>Update Sample</button>
        </div>
      ))}

      {/* ========= ✅ ATHLETES ========= */}
      <h3 style={styles.subTitle}>Athletes</h3>
      {athletes.map((ath) => (
        <div key={ath.id} style={styles.card}>
          <p><b>{ath.name}</b> - {ath.event} ({ath.achievement})</p>
          <button style={styles.btn} onClick={() => setEditItem({ ...ath, type: "athlete" })}>Edit</button>
          <button style={styles.btnDanger} onClick={() => deleteAthlete(ath.id)}>Delete</button>
        </div>
      ))}

      <button
        style={styles.btn}
        onClick={() => setEditItem({ id: "", name: "", event: "", achievement: "", type: "athlete" })}
      >
        ➕ Add Athlete
      </button>
    </section>
  );
}

/* ========= ✅ STYLES ========= */
const styles = {
  container: { padding: "30px", background: "#0d1b2a", color: "white", minHeight: "100vh" },
  title: { fontSize: "2.5em", textAlign: "center", color: "#00ff6a" },
  subTitle: { fontSize: "1.5em", color: "#00ffcc", marginTop: "20px" },
  input: { padding: "8px", margin: "5px", borderRadius: "5px", border: "1px solid #ccc" },
  btn: { background: "#00ff6a", padding: "8px 15px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer" },
  btnDanger: { background: "red", padding: "8px 15px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer", color: "white" },
  card: { background: "#1e272e", padding: "10px", margin: "10px 0", borderRadius: "5px" },
  editBox: { background: "#222", padding: "15px", margin: "15px 0", borderRadius: "5px" }
};
