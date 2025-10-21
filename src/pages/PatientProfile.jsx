import React, { useState } from "react";
import "./PatientProfile.css";

function PatientProfile() {
  const [patient, setPatient] = useState({
    name: "mohammed",
    age: 42,
    history: "Diabetes Type 2",
    tests: ["Blood Sugar Test", "Cholesterol Test"],
    notes: "Monitor diet and exercise.",
  });

  const [newTestFile, setNewTestFile] = useState(null);

  const addTest = () => {
    if (newTestFile) {
      setPatient({ ...patient, tests: [...patient.tests, newTestFile.name] });
      setNewTestFile(null);
    }
  };

  const deletePatient = () => {
    alert("Patient deleted.");
  };

  return (
    <div className="patient-profile">
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>History: {patient.history}</p>

      <h3>Uploaded Tests</h3>
      <ul>
        {patient.tests.map((test, i) => (
          <li key={i}>{test}</li>
        ))}
      </ul>

      <input
        type="file"
        accept="application/pdf" 
        onChange={(e) => setNewTestFile(e.target.files[0])}
      />
      <button onClick={addTest}>Upload Test</button>

      <h3>Doctor’s Notes</h3>
      <p>{patient.notes}</p>

      <button onClick={() => alert("Edit modal opens")}>Edit Patient</button>
      <button className="delete-btn" onClick={deletePatient}>
      Delete Patient
      </button>

    </div>
  );
}

export default PatientProfile;
