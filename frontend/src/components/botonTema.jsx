import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" // Lee la preferencia del usuario al cargar
  );

  // Actualiza la clase "dark" en <html> cuando cambia el estado
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // Guarda preferencia
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // Guarda preferencia
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)} // Cambia el estado al hacer clic
      className="py-2 px-3 rounded-full border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-100 dark:bg-black dark:text-gray-100 dark:border-gray-600 dark:hover:bg-black transition duration-200"
    >
      {/* Muestra el ícono de luna o sol según el estado */}
      {isDarkMode ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
}
