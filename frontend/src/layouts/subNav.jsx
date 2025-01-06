import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,      // Monitores
  faKeyboard,     // Teclados
  faMouse,        // Mouses
  faMicrochip,    // Procesadores
  faMemory,       // RAM
  faVideo,        // Tarjetas gráficas
  faHdd,          // Almacenamiento
  faBatteryFull,  // Fuentes de poder
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="hidden xl:block fixed top-16 left-0 w-full z-10"  >
<div className="bg-[#121212] py-4 overflow-x-auto ">
  <ul className="flex justify-center items-center gap-x-10 text-white text-sm">
    <Link to="/monitores" className="flex items-center gap-2 border-r border-gray-600 pr-4">
      <FontAwesomeIcon icon={faDesktop} size="lg" className="text-gray-400" />
      Monitores
    </Link>
    <Link to="/teclados" className="flex items-center gap-2 border-r border-gray-600 pr-4">
      <FontAwesomeIcon icon={faKeyboard} size="lg" className="text-gray-400" />
      Teclados
    </Link>
    <Link to="/mouses" className="flex items-center gap-2 border-r border-gray-600 pr-4">
      <FontAwesomeIcon icon={faMouse} size="lg" className="text-gray-400" />
      Mouses
    </Link>
    <Link to="/procesadores" className="flex items-center gap-2 border-r border-gray-600 pr-4">
      <FontAwesomeIcon icon={faMicrochip} size="lg" className="text-gray-400" />
      Procesadores
    </Link>
    <Link to="/ram" className="flex items-center gap-2 border-r border-gray-600 pr-4">
      <FontAwesomeIcon icon={faMemory} size="lg" className="text-gray-400" />
      RAM
    </Link>
    <li className="flex items-center gap-2 border-r border-gray-600 pr-4">
  <Link to="/tarjetas-graficas" className="flex items-center gap-2 text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 transition">
    <FontAwesomeIcon icon={faVideo} size="lg" className="text-gray-400" />
    Tarjetas Gráficas
  </Link>
</li>
    <Link to="/motherboards" className="flex items-center gap-2 border-r border-gray-600 pr-4">
      <FontAwesomeIcon icon={faMicrochip} size="lg" className="text-gray-400" />
      MotherBoards
    </Link>
    <Link to="/storage" className="flex items-center gap-2 border-r border-gray-600 pr-4">
      <FontAwesomeIcon icon={faHdd} size="lg" className="text-gray-400" />
      Almacenamiento
    </Link>
    <Link to="/fuentes-poder" className="flex items-center gap-2 pr-4">
      <FontAwesomeIcon icon={faBatteryFull} size="lg" className="text-gray-400" />
      Fuentes de poder
    </Link>
  </ul>
</div>


    </nav>
  );
}

export default Navbar;
