import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function BuscarProducto({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="relative  max-w-xs">
            <input
                type="text"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
                type="button"
                onClick={() => handleSearch(searchTerm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
        </div>
    );
}
