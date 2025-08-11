import React, { useState } from "react";

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

  const handleSignIn = (type) => {
    setModal(type);
  };

  const closeModal = () => setModal(null);

  // This will be called after admin login success
  const handleAdminLoginSuccess = () => {
    setAdminVisible(true);
    setModal(null);
  };

  const handleLogout = () => {
    setAdminVisible(false);
  };

  const handleEditSection = (section) => {
    alert(`Edit ${section} clicked! Implement editing UI here.`);
  };

  return (
    <div>
      <Navbar onSignIn={handleSignIn} />
      <Hero />
      <Competitions />
      <Achievements />
      <Records />
      <Athletes />
      <Footer />

      {/* Login Modals */}
      <LoginModals
        modal={modal}
        closeModal={closeModal}
        onAdminLoginSuccess={handleAdminLoginSuccess}  // <-- pass the callback
      />

      {/* Admin Floating Panel */}
      <AdminPanel
        visible={adminVisible}
        onEdit={handleEditSection}
        onLogout={handleLogout}
      />
    </div>
  );
}
