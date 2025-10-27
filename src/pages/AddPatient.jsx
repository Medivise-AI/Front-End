import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddPatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "", 
    gender: "",
    email: "",
    phone: "",
    history: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/patients", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Patient added successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to add patient.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-28 pb-16 px-6 transition-colors duration-500">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-blue-100 dark:border-gray-700 p-10">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-8 flex items-center gap-2">
          <span className="text-4xl">➕</span> Add New Patient
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
              />
            </div>

            {/* ✅ Date of Birth field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
            />
          </div>

          {/* Medical History */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Medical History
            </label>
            <textarea
              name="history"
              value={formData.history}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Doctor’s Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
