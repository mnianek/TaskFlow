import { useEffect, useState } from "react";

type Note = {
    id: string;
    title: string;
    content: string;
}

export default function Notes() {

    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNotes() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("https://693b3c079b80ba7262ccca7c.mockapi.io/notes");
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania notatek.");
                }
                const data = await response.json();
                setNotes(data.slice(0, 5)); // Pobiera pierwsze 5 notatek
            } catch (err) {
                setError("Błąd podczas połączenia z API");
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, []);

    return (
        <div className="mt-10 max-w-3xl mx-auto">
            {/* Ładowanie */}
            {loading && <p className="text-gray-600 dark:text-gray-300">Ładowanie notatek...</p>}

            {/* Błąd */}
            {error && !loading && <p className="text-sm text-red-500">{error}</p>}

            {/* Lista notatek */}
            {!loading && !error && notes.length > 0 && (
                <div className="space-y-3 " >
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {note.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                {note.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && notes.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Brak notatek do wyświetlenia.
                </p>
            )}

        </div>
    )
}