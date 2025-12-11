import { useState } from "react";
import type { FormEvent } from "react";

export default function NoteForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();
        if (!trimmedTitle || !trimmedContent) {
            setError("Tytuł i treść notatki nie mogą być puste.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);
        async function saveNote() {
            try {
                await fetch("https://693b3c079b80ba7262ccca7c.mockapi.io/notes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, content})
                });
                setSuccess("Notatka została zapisana pomyślnie.");
                setTitle("");
                setContent("");
            }
            catch (err) {
                setError("Wystąpił błąd podczas zapisywania notatki.");
            }

        }
        saveNote().finally(() => setLoading(false));
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tytuł notatki"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Treść notatki"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[120px]"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                    {loading ? "Dodawanie notatki..." : "Dodaj notatkę"}
                </button>
            </form>
            {loading && <p>Zapisywanie notatki...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
        </div>
    );

}
