import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    medical_history: "",
});
  
  
  const { patientId } = useParams();

  const API_URL = "http://localhost:5000/api";

 

  // تحميل بيانات المريض
  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) {
        setError("Invalid patient ID.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/patients/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(response.data);
        setEditData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  // جلب التحاليل
  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/analyses/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // هنا نصحح البيانات لتكون المصفوفة مباشرة
        setPatient((prev) => ({ ...prev, tests: response.data.analyses }));
      } catch (err) {
        console.error("Error fetching analyses:", err);
      }
    };
    if (patientId) fetchAnalyses();
  }, [patientId]);



  // رفع الملف
  const handleUpload = async () => {
    if (!newFile) return alert("Please select a file first.");
    try {
      const formData = new FormData();
      formData.append("file", newFile);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/analyses/${patientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // نحدث الجدول مباشرة بعد الرفع
      setPatient((prev) => ({
        ...prev,
        tests: [...(prev.tests || []), response.data.analysis],
      }));
      setNewFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed.");
    }
  };



  // تعديل البيانات
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_URL}/patients/${patientId}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPatient(response.data.patient);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update patient info.");
    }
  };

  // حذف المريض
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Patient deleted successfully!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete patient.");
    }
  };

  // المظهر
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-lg text-gray-600 dark:text-gray-300">
        Loading patient data...
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        {error}
      </div>
    );

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
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
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
            <p>
              <strong>Name:</strong> {patient.name}
            </p>
            <p>
              <strong>DOB:</strong> {patient.dob.split("T")[0]}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p>
              <strong>Contact:</strong> {patient.contact}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Medical History
            </h3>
            <p>{patient?.medical_history || "No history available"}</p>
          </div>
        </div>

        {/* Tests */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
            🧪 Uploaded Tests
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-200">
                <tr>
                  <th className="p-3">AI Summary</th>
                </tr>
              </thead>
              <tbody>
                {patient?.tests?.length > 0 ? (
                  patient.tests.map((test, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="p-3 text-gray-900 dark:text-gray-100">{test.ai_summary}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-3 text-gray-500">
                      No tests uploaded yet
                    </td>
                  </tr>
                )}
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
      </div>

      {/* Edit Modal */}
      {isEditing && editData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg transition-all duration-500">
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
              Edit Patient Information
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Full Name"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-2"
              />
              <input
                type="text"
                value={editData.gender}
                onChange={(e) =>
                  setEditData({ ...editData, gender: e.target.value })
                }
                placeholder="Gender"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-2"
              />
              <textarea
                value={editData.medical_history}
                onChange={(e) =>
                  setEditData({ ...editData, medical_history: e.target.value })
                }
                placeholder="Medical History"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-2 h-24"
              />
              <input
                type="date"
                value={editData.dob}
                onChange={(e) =>
                  setEditData({ ...editData, dob: e.target.value })
                }
                placeholder="Date of Birth"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-2"
              />
              <input
                type="text"
                value={editData.contact}
                onChange={(e) =>
                  setEditData({ ...editData, contact: e.target.value })
                }
                placeholder="Contact Information"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-2"
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
