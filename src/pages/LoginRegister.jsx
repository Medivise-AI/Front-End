import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./LoginRegister.css";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      window.location.href = "/dashboard";
    } else {
      alert("Account created successfully! Please login.");
      setIsLogin(true);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 border border-gray-400 dark:border-gray-600 text-sm px-3 py-1.5 rounded-md hover:bg-white/20 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <motion.div
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-blue-100 dark:border-gray-700 transition-colors duration-500"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/doctor-logo.png"
            alt="ClinicAI Doctor Logo"
            className="w-24 h-24 object-contain mb-2"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-300 mt-1">
            ClinicAI
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
          {isLogin ? "Doctor Login" : "Doctor Registration"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle */}
        <p
          onClick={toggleForm}
          className="text-center text-blue-600 dark:text-blue-400 mt-6 cursor-pointer hover:underline transition"
        >
          {isLogin
            ? "Don’t have an account? Register here"
            : "Already registered? Login here"}
        </p>
      </motion.div>
    </div>
  );
}

export default LoginRegister;
