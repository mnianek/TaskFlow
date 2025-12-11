import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3) {
      setError("Nazwa użytkownika musi mieć co najmniej 3 znaki.");
      return;
    }
    localStorage.setItem("taskflow-username", trimmedUsername);
    setError("");
    navigate("/boards");
  }
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Logowanie
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nazwa użytkownika
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="np. Kowalski"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );   

}