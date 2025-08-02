import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Achievements from "./components/Achievements";
import Competitions from "./components/Competitions";
import Athletes from "./components/Athletes";
import ProfileForm from "./pages/ProfileForm";
import ScrollToTop from "./utils/ScrollToTop"; // Optional: ensures routing scrolls to top

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
      </Routes>
    </Router>
  );
}

export default App;
