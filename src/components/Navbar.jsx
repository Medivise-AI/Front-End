import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 dark:bg-gray-900 text-white py-4 shadow-lg z-50 transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/doctor-logo.png"
            alt="ClinicAI"
            className="w-8 h-8 object-contain"
          />
          <span className="text-2xl font-bold tracking-wide hover:text-blue-200 dark:hover:text-gray-300 transition">
            ClinicAI
          </span>
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/dashboard" className="hover:text-blue-200 dark:hover:text-gray-300 transition">
            Dashboard
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border border-white/50 text-sm px-3 py-1.5 rounded-md hover:bg-white/20 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
