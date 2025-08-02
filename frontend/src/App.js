import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Athletes from "./components/Athletes";
import ProfileForm from "./pages/ProfileForm";
import HomePage from "./pages/HomePage"; // ✅ Make sure this exists and is imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit-profile" element={<ProfileForm />} />
      </Routes>
    </Router>
  );
}

export default App; // ✅ This line is required
