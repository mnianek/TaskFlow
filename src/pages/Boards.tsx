import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import Notes from "../components/Notes";

interface Board {
  id: string;
  name: string;
}

export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

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

  function toggleMenu(boardId: string) {
    setMenuOpen((prev) => (prev === boardId ? null : boardId));
  }

  function deleteBoard(boardId: string) {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć tę tablicę i powiązane zadania?"
    );
    if (!confirmDelete) return;

    const updated = boards.filter((board) => board.id !== boardId);
    setBoards(updated);
    localStorage.setItem("taskflow_boards", JSON.stringify(updated));

    // Usuwamy zadania powiązane z tablicą
    localStorage.removeItem(`taskflow_tasks_${boardId}`);

    setMenuOpen(null);
  }

  function renameBoard(boardId: string) {
    const boardToEdit = boards.find((board) => board.id === boardId);
    if (!boardToEdit) return;

    const newName = window.prompt("Nowa nazwa tablicy:", boardToEdit.name);
    if (!newName) return;

    const trimmed = newName.trim();
    if (!trimmed) return;

    const updated = boards.map((board) =>
      board.id === boardId ? { ...board, name: trimmed } : board
    );
    setBoards(updated);
    localStorage.setItem("taskflow_boards", JSON.stringify(updated));
    setMenuOpen(null);
  }
  const filteredAndSortedBoards = [...boards]
    .filter((board) =>
      board.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  return (
    <div>



      <div className="max-w-2xl mx-auto p-4 space-y-6 bg-white dark:bg-gray-900 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition">Twoje tablice</h1>
        <p></p>
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

        {/* Wyszukiwanie i sortowanie */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Szukaj tablic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-100">Sortowanie:</span>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value === "asc" ? "asc" : "desc")
              }
              className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">A–Z</option>
              <option value="desc">Z–A</option>
            </select>
          </div>
        </div>

        {/* Lista tablic */}
        <div className="space-y-3">
          {boards.length === 0 && (
            <p className="text-gray-500">Nie masz jeszcze żadnych tablic.</p>
          )}
          {boards.length > 0 && filteredAndSortedBoards.length === 0 && (
            <p className="text-gray-500">Brak tablic pasujących do wyszukiwania.</p>
          )}

          {filteredAndSortedBoards.map((board) => (
            <div
              key={board.id}
              className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 hover:shadow-md transition bg-gray-50 dark:bg-gray-800"
            >
              {/* Kliknięcie w nazwę tablicy wchodzi do środka */}
              <Link
                to={`/boards/${board.id}`}
                className="flex-1 font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {board.name}
              </Link>

              {/* Menu z trzema kropkami */}
              <div className="relative ml-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMenu(board.id);
                  }}
                  className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300"
                >
                  &#8230;
                </button>

                {menuOpen === board.id && (
                  <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 text-sm">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        renameBoard(board.id);
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Zmień nazwę
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteBoard(board.id);
                      }}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40"
                    >
                      Usuń tablicę
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-4 space-y-6 bg-white dark:bg-gray-900 rounded-lg mt-[2vh]">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition">Notatki</h1>
        <NoteForm />
        <Notes />
      </div>
    </div>

  );
}