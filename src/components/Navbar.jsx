import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>🩺 ClinicAI</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Login</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
