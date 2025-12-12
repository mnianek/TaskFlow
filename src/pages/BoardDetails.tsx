import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

interface Board {
  id: string;
  name: string;
}

export default function BoardDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [board, setBoard] = useState<Board | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Klucz w localStorage dla zadań tej tablicy
  const tasksStorageKey = `taskflow_tasks_${id}`;

  // Wczytaj tablicę i zadania
  useEffect(() => {
    if (!id) return;

    const storedBoards = localStorage.getItem("taskflow_boards");
    if (!storedBoards) {
      navigate("/boards");
      return;
    }

    const boards: Board[] = JSON.parse(storedBoards);
    const found = boards.find((b) => b.id === id);

    if (!found) {
      navigate("/boards");
      return;
    }

    setBoard(found);

    const storedTasks = localStorage.getItem(tasksStorageKey);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [id, navigate, tasksStorageKey]);

  function persistTasks(updated: Task[]) {
    setTasks(updated);
    localStorage.setItem(tasksStorageKey, JSON.stringify(updated));
  }

  function addTask() {
    const trimmed = newTaskTitle.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      status: "todo",
    };

    const updated = [...tasks, newTask];
    persistTasks(updated);
    setNewTaskTitle("");
  }
  function deleteTask(taskId: string) {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć to zadanie?"
    );

    if (!confirmDelete) {
      return;
    }

    const updated = tasks.filter((task) => task.id !== taskId);
    persistTasks(updated);
  }

  function editTask(taskId: string) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (!taskToEdit) return;

    const newTitle = window.prompt("Nowy tytuł zadania:", taskToEdit.title);
    if (!newTitle) return;

    const trimmed = newTitle.trim();
    if (!trimmed) return;

    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, title: trimmed } : task
    );

    persistTasks(updated);
  }
  function moveTask(taskId: string, newStatus: TaskStatus) {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    persistTasks(updated);
  }

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  if (!board) {
    return (
      <div className="p-4">
        <p>Ładowanie tablicy...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 ">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{board.name}</h1>
        </div>
        <Link
          to="/boards"
          className="text-sm text-blue-600 hover:text-blue-800 transition"
        >
          ← Powrót do listy tablic
        </Link>
      </div>

      {/* Dodawanie zadania */}
      <div className="max-w-lg flex gap-2">
        <input
          type="text"
          placeholder="Nowe zadanie..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Dodaj
        </button>
      </div>

      {/* Kolumny */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Do zrobienia */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-semibold mb-2">Do zrobienia</h2>
          <div className="space-y-2">
            {todoTasks.length === 0 && (
              <p className="text-sm text-gray-400">Brak zadań.</p>
            )}
            {todoTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border rounded-md p-2 text-sm flex justify-between items-center dark:bg-gray-900 "
              >
                <span>{task.title}</span>
                <div className="flex gap-1">
                  <button
                  onClick={() => editTask(task.id)}
                  className="text-xs px-2 py-1 rounded  bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"
                >
                  Usuń
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveTask(task.id, "in-progress")}
                    className="text-xs px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900"
                  >
                    → W trakcie
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "done")}
                    className="text-xs px-2 py-1 rounded bg-green-100 hover:bg-green-200 dark:bg-green-900"
                  >
                    ✓ Zrobione
                  </button>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* W trakcie */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-semibold mb-2">W trakcie</h2>
          <div className="space-y-2">
            {inProgressTasks.length === 0 && (
              <p className="text-sm text-gray-400">Brak zadań.</p>
            )}
            {inProgressTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border rounded-md p-2 text-sm flex justify-between items-center dark:bg-gray-900"
              >
                <span>{task.title}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => editTask(task.id)}
                    className="text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"
                  >
                    Usuń
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "todo")}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    ← Do zrobienia
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "done")}
                    className="text-xs px-2 py-1 rounded bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800"
                  >
                    ✓ Zrobione
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zrobione  */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-semibold mb-2">Zrobione</h2>
          <div className="space-y-2">
            {doneTasks.length === 0 && (
              <p className="text-sm text-gray-400">Brak zadań.</p>
            )}
            {doneTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border rounded-md p-2 text-sm flex justify-between items-center dark:bg-gray-900"
              >
                <span>{task.title}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => editTask(task.id)}
                    className="text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"
                  >
                    Usuń
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "in-progress")}
                    className="text-xs px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900"
                  >
                    ← W trakcie
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "todo")}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 "
                  >
                    ↺ Do zrobienia
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}