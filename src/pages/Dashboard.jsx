import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientCard from "../components/PatientCard";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ استدعاء قائمة المرضى من الـ API عند تحميل الصفحة
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // لو عندك JWT من تسجيل الدخول
        const response = await axios.get("https://yourapi.com/patients", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        setPatients(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const addPatient = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      const newPatient = {
        name: `New Patient ${patients.length + 1}`,
        condition: "N/A",
      };

      const response = await axios.post("https://yourapi.com/patients", newPatient, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      setPatients([...patients, response.data]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add patient");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-28 pb-16 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-blue-100 dark:border-gray-700">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-4xl">📋</span>
            <span>ClinicAI - Patients Dashboard</span>
          </h2>

          <button
            onClick={addPatient}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all"
          >
            + Add Patient
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            Loading patients...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {patients.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <PatientCard patient={p} />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
