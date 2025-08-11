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
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Load auth from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const handleSignIn = (type) => setModal(type);
  const closeModal = () => setModal(null);

  // Called when login (admin or user) succeeds
  const handleLoginSuccess = (tokenValue, roleValue) => {
    setToken(tokenValue);
    setRole(roleValue);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("role", roleValue);
    setModal(null);
  };

  const handleLogout = () => {
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

      <Hero adminView={role === "admin"} token={token} />
      <Competitions adminView={role === "admin"} token={token} />
      <Achievements adminView={role === "admin"} token={token} />
      <Records adminView={role === "admin"} token={token} />
      <Athletes adminView={role === "admin"} token={token} />
      <Footer />

      <LoginModals
        modal={modal}
        closeModal={closeModal}
        onAdminLoginSuccess={() =>
          handleLoginSuccess(localStorage.getItem("token"), localStorage.getItem("role"))
        }
        // You could also have a similar prop for user login success
      />

      {/* Keep AdminPanel overlay if you still want it */}
      {role === "admin" && (
        <AdminPanel
          token={token}
          role={role}
          onEdit={handleEditSection}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}