import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Athletes from "./components/Athletes";
import ProfileForm from "./pages/ProfileForm";
import Home from "./pages/HomePage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit-profile" element={<ProfileForm />} />
      </Routes>
    </Router>
  );
}

export default App;
  