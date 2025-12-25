import { useState, useRef, useCallback } from "react";

// This hook handles Loading AND Timeouts automatically
export function useAsyncAction(timeoutMs: number = 10000) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Function to start the action
    const start = useCallback(() => {
        setIsLoading(true);
        setError(""); // Clear old errors

        // 1. Set a "Doomsday Timer"
        // If the action takes too long, this will force-stop it and show an error
        timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            setError("Server took too long to respond. Please try again.");
        }, timeoutMs);
    }, [timeoutMs]);

    // Function to stop the action (Success)
    const stop = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // Kill the timer
        setIsLoading(false);
    }, []);

    // Function to stop with an error (Failure)
    const fail = useCallback((message: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // Kill the timer
        setIsLoading(false);
        setError(message);
    }, []);

    return { isLoading, error, start, stop, fail };
}