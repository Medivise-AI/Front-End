import React from "react";
import { Link } from "react-router-dom";

function PatientCard({ patient }) {
  return (
    <div className="patient-card">
      <h3>{patient.name}</h3>
      <p>
        Condition: <span className="condition">{patient.condition}</span>
      </p>
      <Link to={`/patient/${patient.id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
}

export default PatientCard;
