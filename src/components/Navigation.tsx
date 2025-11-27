import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const navigate = useNavigate();

  // 🔹 Sprawdzamy TYLKO, czy user jest zalogowany
  useEffect(() => {
    const user =
      localStorage.getItem("taskflow_user") ??
      localStorage.getItem("taskflow-username");
    setIsLoggedIn(!!user);
  }, []);

  function handleLogout() {
    localStorage.removeItem("taskflow_user");
    localStorage.removeItem("taskflow-username");
    setIsLoggedIn(false);
    navigate("/");
  }

  // 🔹 JEDYNE miejsce, gdzie ruszamy klasę "dark" na <html>
  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("taskflow_theme", next);

    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300 mb-6 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
      <Link
        to="/"
        className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        TaskFlow
      </Link>

      <nav className="flex items-center gap-4 text-gray-700 dark:text-gray-200 font-medium">
        {/* Przycisk zmiany motywu */}
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Logowanie / Boards + Logout */}
        {!isLoggedIn && (
          <Link
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            to="/login"
          >
            Login
          </Link>
        )}

        {isLoggedIn && (
          <>
            <Link
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              to="/boards"
            >
              Boards
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-600 dark:hover:text-red-400 transition"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}