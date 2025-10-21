import React, { useState } from "react";
import PatientCard from "../components/PatientCard";

function Dashboard() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Mohammed", condition: "Diabetes" },
    { id: 2, name: "Samer", condition: "Asthma" },
  ]);

  const addPatient = () => {
    const newPatient = {
      id: Date.now(),
      name: "New Patient",
      condition: "N/A",
    };
    setPatients([...patients, newPatient]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          🏥 Patients Dashboard
        </h2>

        <div className="text-center mb-6">
          <button
            onClick={addPatient}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Patient
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {patients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
