import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Achievements from "./components/Achievements";
import Competitions from "./components/Competitions";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import Athletes from "./components/Athletes";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Achievements />
      <Competitions />
      <Athletes/>
      <AdminPanel />
      <Footer />
    </>
  );
}
