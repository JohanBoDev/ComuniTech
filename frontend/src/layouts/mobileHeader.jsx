import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faDesktop,
  faKeyboard,
  faMouse,
  faMicrochip,
  faMemory,
  faVideo,
  faHdd,
  faBatteryFull,
  faUserCircle,
  faShoppingCart,
  faSignOutAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import BuscarProducto from "../components/buscarProducto";
import ThemeToggleButton from "../components/botonTema";
import { useAuth } from "../context/AuthContext";


function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // Obtén estado de autenticación y función logout del contexto
  const closeMenu = () => setIsMenuOpen(false);
  // Función para manejar la búsqueda
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/resultados?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <><header className="p-4 flex justify-between items-center z-50 fixed top-0 left-0 w-full  bg-white dark:bg-black">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/" className="flex items-center gap-2 dark:text-white text-black">
          ComuniTech
        </Link>
      </div>

      {/* Botón de cambio de tema */}
      <ThemeToggleButton />

      {/* Botón de menú hamburguesa */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="z-50 relative"
        aria-label="Toggle Menu"
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" className="dark:text-white text-black" />
      </button>

      {/* Menú lateral */}
      <div
        className={`fixed top-0 right-0 h-full bg-white dark:bg-black shadow-lg w-64 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-40`}
      >
        <div className="p-4 mt-10 overflow-y-scroll">
          {/* Campo de búsqueda */}
          {location.pathname !== "/iniciar-sesion" && location.pathname !== "/registrarse" && (
            <BuscarProducto handleSearch={handleSearch} />
          )}

          {/* Enlaces del menú */}
          <ul className="mt-5 flex flex-col gap-y-4 text-sm dark:text-white text-black">
            {/* Categorías */}
            <li>
              <Link
                to="/monitores"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faDesktop} size="lg" />
                Monitores
              </Link>
            </li>
            <li>
              <Link
                to="/teclados"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faKeyboard} size="lg" />
                Teclados
              </Link>
            </li>
            <li>
              <Link
                to="/mouses"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faMouse} size="lg" />
                Mouses
              </Link>
            </li>
            <li>
              <Link
                to="/procesadores"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faMicrochip} size="lg" />
                Procesadores
              </Link>
            </li>
            <li>
              <Link
                to="/ram"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faMemory} size="lg" />
                RAM
              </Link>
            </li>
            <li>
              <Link
                to="/tarjetas-graficas"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faVideo} size="lg" />
                Tarjetas Gráficas
              </Link>
            </li>
            <li>
              <Link
                to="/motherboards"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faMicrochip} size="lg" />
                MotherBoards
              </Link>
            </li>
            <li>
              <Link
                to="/storage"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faHdd} size="lg" />
                Almacenamiento
              </Link>
            </li>
            <li>
              <Link
                to="/fuentes-poder"
                onClick={closeMenu}
                className="flex items-center gap-2 pb-2 border-b border-gray-700 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faBatteryFull} size="lg" />
                Fuentes de Poder
              </Link>
            </li>
          </ul>

          {/* Botones según el estado de autenticación */}
          {isLoggedIn ? (
            <div className="mt-6 flex flex-col gap-4">
              {/* Ver perfil */}
              <Link
                to="/mi-perfil"
                onClick={closeMenu}
                className="py-2 px-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 text-center"
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                Ver mi Perfil
              </Link>

              {/* Ver carrito */}
              <Link
                to="/carrito"
                onClick={closeMenu}
                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 text-center"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Ver mi Carrito
              </Link>

              {/* Ver panel de administrador */}
              {isAdmin && (
                <Link to="/dashboard-admin" onClick={closeMenu} className="py-2 px-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 text-center">
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                  Panel de Admin
                </Link>
              )}


              {/* Cerrar sesión */}
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                } }
                className="py-2 px-4 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 text-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {/* Iniciar sesión */}
              <Link
                to="/iniciar-sesion"
                onClick={closeMenu}
                className="py-2 px-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 text-center"
              >
                Iniciar Sesión
              </Link>

              {/* Registrarse */}
              <Link
                to="/registrarse"
                onClick={closeMenu}
                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 text-center"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Fondo oscuro al abrir el menú */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        ></div>
      )}
    </header><div className="h-16"></div></>
  );
}

export default MobileHeader;
