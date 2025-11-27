import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user =
      localStorage.getItem("taskflow_user") ??
      localStorage.getItem("taskflow-username");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl text-center space-y-6 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          TaskFlow – Twoja tablica zadań w stylu Kanban
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Organizuj swoje projekty, przenoś zadania między kolumnami i miej
          pełną kontrolę nad tym, co jest do zrobienia, w trakcie i skończone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          {!isLoggedIn && (
            <Link
              to="/login"
              className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              Przejdź do logowania
            </Link>
          )}
        {isLoggedIn && (
          <Link
            to="/boards"
            className="px-6 py-3 rounded-md border border-gray-300 text-gray-800 dark:text-gray-200 dark:border-gray-600 font-medium hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400 transition"
          >
            Zobacz tablice
          </Link>
        )}
        </div>

        <div className="mt-8 text-sm text-gray-500 space-y-1">
          <p>✔ Logowanie i wylogowanie użytkownika</p>
          <p>✔ Chronione trasy (Protected Routes)</p>
          <p>✔ Zapisywanie danych w LocalStorage</p>
          <p>✔ Widok tablic i zadań (Kanban)</p>
          <p>✔ Nowoczesny interfejs w Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}