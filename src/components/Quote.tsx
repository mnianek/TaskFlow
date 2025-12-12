import { useEffect, useState } from "react";

type QuoteData = {
    text: string;
    author: string;
}
type adviceResponse = {
    slip: {
        id: number;
        advice: string;
    }
}

export default function Quote() {
    const [quote, setQuote] = useState<QuoteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    async function fetchQuote() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("https://api.adviceslip.com/advice");
            if (!response.ok) {
                throw new Error("Błąd podczas pobierania cytatu.");
            }
            const data = (await response.json()) as adviceResponse;
            if (data.slip && data.slip.advice) {
                setVisible(false);
                setQuote({
                    text: data.slip.advice,
                    author: "AdviceSlip", 
                });
            } else {
                setError("Nieprawidłowe dane z serwera.");
            }
        } catch (err) {
            setError("Błąd podczas połączenia z API");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchQuote();
        const interval = setInterval(() => { fetchQuote(); }, 15000); // Odświeżenie co 15 sekund
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (quote) {
            const timeout = setTimeout(() => setVisible(true), 10); // Małe opóźnienie 
            return () => clearTimeout(timeout);
        }
    }, [quote]);
    return (
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">

            

            {error && !loading && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {quote && !loading && !error && (
                <div
                    className={`transition-opacity duration-1500 ${visible ? "opacity-100" : "opacity-0"}`}>
                    <p className="text-lg italic text-gray-800 dark:text-gray-100">
                        „{quote.text}”
                    </p>
                </div>
            )}
        </div>
    );
}