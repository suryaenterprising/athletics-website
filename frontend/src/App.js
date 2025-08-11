import React, { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Competitions from "./components/Competitions";
import Achievements from "./components/Achievements";
import Athletes from "./components/Athletes";
import Records from "./components/Records";
import Footer from "./components/Footer";
import LoginModals from "./components/LoginModals";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [modal, setModal] = useState(null); // "user", "admin", or null
  const [adminVisible, setAdminVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Load token and role from localStorage on app start
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      if (storedRole === "admin") {
        setAdminVisible(true);
      }
    }
  }, []);

  const handleSignIn = (type) => {
    setModal(type);
  };

  const closeModal = () => setModal(null);

  // Called after admin login success inside LoginModals
  const handleAdminLoginSuccess = () => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setToken(storedToken);
    setRole(storedRole);
    if (storedRole === "admin") {
      setAdminVisible(true);
    }
    setModal(null);
  };

  const handleLogout = () => {
    setAdminVisible(false);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully");
  };

  const handleEditSection = (section) => {
    alert(`Edit ${section} clicked! Implement editing UI here.`);
  };

  return (
    <div>
      <Navbar onSignIn={handleSignIn} onLogout={handleLogout} role={role} />

      <Hero />
      <Competitions />
      <Achievements />
      <Records />
      <Athletes />
      <Footer />

      <LoginModals
        modal={modal}
        closeModal={closeModal}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />

      <AdminPanel
        visible={adminVisible}
        token={token}
        role={role}
        onEdit={handleEditSection}
        onLogout={handleLogout}
      />
    </div>
  );
}
