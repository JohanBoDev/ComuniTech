import { useState } from "react";

export default function useSearch() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async (searchTerm) => {
        if (!searchTerm.trim()) return;
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://comunitech.onrender.com/api/productos/nombre/${encodeURIComponent(searchTerm)}`
            );
            if (response.ok) {
                const data = await response.json();
                setResults(data);
                setShowResults(true);
            } else {
                console.error("Error al buscar productos:", response.status);
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { results, isLoading, showResults, handleSearch };
}
