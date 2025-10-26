import React, { useState, useEffect } from "react";

function PatientProfile() {
  const [patient, setPatient] = useState({
    name: "Mohammed Khalid",
    age: 42,
    gender: "Male",
    email: "mohammed.khalid@example.com",
    phone: "+962 79 123 4567",
    history: "Type 2 Diabetes, Hypertension",
    tests: [
      { name: "Blood Sugar Test", summary: "Glucose level slightly elevated", date: "2025-10-18" },
      { name: "Cholesterol Test", summary: "LDL within normal range", date: "2025-10-10" },
    ],
    notes: "Monitor diet and daily exercise. Schedule next test in 3 months.",
  });

  const [newFile, setNewFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(patient);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleUpload = () => {
    if (newFile) {
      const newTest = {
        name: newFile.name,
        summary: "AI summary pending...",
        date: new Date().toISOString().split("T")[0],
      };
      setPatient({ ...patient, tests: [...patient.tests, newTest] });
      setNewFile(null);
    }
  };

  const handleSave = () => {
    setPatient(editData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-28 pb-16 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-blue-100 dark:border-gray-700 p-10 transition-all duration-500">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-gray-200 dark:border-gray-700 pb-5">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4 sm:mb-0 flex items-center gap-2">
            <span className="text-4xl">🧬</span> Patient Profile
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-gray-800 dark:text-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Personal Information
            </h3>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Medical History
            </h3>
            <p>{patient.history}</p>
          </div>
        </div>

        {/* Tests Section */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
            🧪 Uploaded Tests
          </h3>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-200">
                <tr>
                  <th className="p-3 font-semibold border-b border-gray-300 dark:border-gray-600">Test Name</th>
                  <th className="p-3 font-semibold border-b border-gray-300 dark:border-gray-600">Date</th>
                  <th className="p-3 font-semibold border-b border-gray-300 dark:border-gray-600">AI Summary</th>
                </tr>
              </thead>
              <tbody>
                {patient.tests.map((test, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-gray-800 dark:text-gray-200">{test.name}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">{test.date}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">{test.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setNewFile(e.target.files[0])}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2 w-full sm:w-72"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Upload Test
            </button>
          </div>
        </div>

        {/* Doctor Notes */}
        <div>
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
            🩺 Doctor’s Notes
          </h3>
          <p className="text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 leading-relaxed shadow-sm">
            {patient.notes}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg transition-all duration-500">
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
              Edit Patient Information
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
              />
              <input
                type="number"
                value={editData.age}
                onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                placeholder="Age"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
              />
              <input
                type="text"
                value={editData.gender}
                onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                placeholder="Gender"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
              />
              <textarea
                value={editData.history}
                onChange={(e) => setEditData({ ...editData, history: e.target.value })}
                placeholder="Medical History"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2 h-24"
              />
              <textarea
                value={editData.notes}
                onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                placeholder="Doctor's Notes"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2 h-24"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientProfile;
