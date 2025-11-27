import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Board {
  id: string;
  name: string;
}

export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("taskflow_boards");
    if (stored) {
      setBoards(JSON.parse(stored));
    }
  }, []);

  function addBoard() {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newBoard: Board = {
      id: crypto.randomUUID(),
      name: trimmed,
    };

    const updated = [...boards, newBoard];
    setBoards(updated);
    localStorage.setItem("taskflow_boards", JSON.stringify(updated));
    setName("");
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-white dark:bg-gray-900 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">Twoje tablice</h1>

      {/* Formularz dodawania tablicy */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nazwa tablicy..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addBoard}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Dodaj
        </button>
      </div>

      {/* Lista tablic */}
      <div className="space-y-3">
        {boards.length === 0 && (
          <p className="text-gray-500">Nie masz jeszcze żadnych tablic.</p>
        )}

        {boards.map((board) => (
          <Link
            key={board.id}
            to={`/boards/${board.id}`}
            className="block p-3 border rounded-md hover:border-blue-500 hover:text-blue-600 transition"
          >
            {board.name}
          </Link>
        ))}
      </div>
    </div>
  );
}