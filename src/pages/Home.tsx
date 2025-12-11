import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Quote from "../components/Quote";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user =
      localStorage.getItem("taskflow_user") ??
      localStorage.getItem("taskflow-username");
    setIsLogged(!!user);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Górna sekcja: hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center min-h-[70vh]">
          {/* Tekst po lewej */}
          <div className="space-y-6 text-gray-900 dark:text-gray-100">


            <h1 className="text-4xl md:text-5xl font-bold">
              Ogarnij swoje zadania z TaskFlow!
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Nie zapomnij ju o niczym dzięki TaskFlow. Twórz własne tablice, zarządzaj zadaniami i zwiększ swoją produktywność już dziś!
            </p>

            {/* Przyciski akcji */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start mt-2">
              {!isLogged && (
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition shadow-sm"
                >
                  Przejdź do logowania
                </Link>
              )}

              {isLogged && (
                <Link
                  to="/boards"
                  className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition shadow-sm"
                >
                  Przejdź do tablic
                </Link>
              )}
            </div>

            
          </div>

          {/* Prawa strona – „podgląd” tablicy */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Przykładowa tablica
                </h2>
                
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                {/* To Do */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2 space-y-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    To Do
                  </p>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1">
                    Zrobić obiad
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1">
                    Pójść na zakupy
                  </div>
                </div>

                {/* In Progress */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2 space-y-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    In Progress
                  </p>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1">
                    Prasowanie
                  </div>
                </div>

                {/* Done */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2 space-y-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    Done
                  </p>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 line-through text-gray-500 dark:text-gray-400">
                    Umyć okna
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 line-through text-gray-500 dark:text-gray-400">
                    Pranie
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
        <div>
          <Quote />
        </div>
        {/* Dolna sekcja: lista funkcji */}
        {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-200">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold">Funkcje techniczne</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>✔ React + TypeScript</li>
              <li>✔ React Router (SPA)</li>
              <li>✔ Protected Routes</li>
              <li>✔ LocalStorage</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold">Logika aplikacji</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>✔ Logowanie / wylogowanie</li>
              <li>✔ Tablice + zadania (Kanban)</li>
              <li>✔ Edycja i usuwanie zadań</li>
              <li>✔ Stan przypisany do konkretnego użytkownika</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold">Wygląd i UX</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>✔ Tailwind CSS</li>
              <li>✔ Dark Mode z przełącznikiem</li>
              <li>✔ Responsywny layout</li>
              <li>✔ Przygotowane pod dalszą rozbudowę</li>
            </ul>
          </div>
        </div> */}
      </div>
      
    </div>
      
  );
}