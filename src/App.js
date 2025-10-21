import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";          
import LoginRegister from "./pages/LoginRegister"; 
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient/:id" element={<PatientProfile />} />
      </Routes>
    </Router>
  );

}

export default App;
