import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const navigate = useNavigate();
  const location = useLocation();

  // Sprawdzamy, czy user jest zalogowany
  useEffect(() => {
    const user =
      localStorage.getItem("taskflow_user") ??
      localStorage.getItem("taskflow-username");
    setIsLoggedIn(!!user);
  }, [location.pathname]);

  function handleLogout() {
    localStorage.removeItem("taskflow_user");
    localStorage.removeItem("taskflow-username");
    setIsLoggedIn(false);
    navigate("/");
  }

  // Jedyne miejsce, gdzie ruszamy klasę "dark" na <html>
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
    <header className="flex justify-between items-center p-4 mb-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 dark:text-gray-100 shadow-sm sticky top-0 z-50">
      <Link
        to="/"
        className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        TaskFlow
      </Link>

      <nav className="flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
        {/* Przycisk zmiany motywu */}
        <button
          onClick={toggleTheme}
          className="text-sm px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Logowanie / Boards + Logout */}
        {!isLoggedIn && (
          <Link
            className="px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 transition"
            to="/login"
          >
            Logowanie
          </Link>
        )}

        {isLoggedIn && (
          <>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 transition"
            >
              Wyloguj
            </button>
          </>
        )}
      </nav>
    </header>
  );
}