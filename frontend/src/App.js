import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Achievements from "./components/Achievements";
import Competitions from "./components/Competitions";
import Athletes from "./components/Athletes";
import AdminPanel from "./pages/AdminPanel";
import ProfileForm from "./pages/ProfileForm";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Achievements />
              <Competitions />
              <Athletes />
            </>
          }
        />
        <Route path="/submit-profile" element={<ProfileForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;