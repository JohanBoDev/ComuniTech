import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../components/botonTema";
import BuscarProducto from "../components/buscarProducto";
import iconoComunitech from "../assets/icono-comunitech.png";
import { useAuth } from "../context/AuthContext"; // Importar el contexto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faSignOutAlt, faTachometerAlt  } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, isAdmin } = useAuth(); // Accede a los valores y métodos del contexto

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/resultados?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <header className="bg-white text-black dark:bg-[#121212] dark:text-white border-b-2 border-gray-400 p-4 flex items-center justify-between fixed top-0 left-0 w-full z-10">
        {/* Logo */}
        <Link className="flex items-center" to="/">
          <img src={iconoComunitech} className="w-10 h-10" alt="" />
          <h1 className="text-2xl font-semibold font-titulo">ComuniTech</h1>
        </Link>

        {/* Buscar producto */}
        {location.pathname !== "/iniciar-sesion" &&
          location.pathname !== "/registrarse" && (
            <BuscarProducto handleSearch={handleSearch} />
          )}

        {/* Navegación */}
        <nav>
          <ul className="flex gap-x-8 text-lg items-center">
            {isLoggedIn ? (
              // Botones para usuarios autenticados
              <>
                <li>
                  <Link
                    to="/mi-perfil"
                    className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black font-texto transition duration-200"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-xl" />
                    Ver mi Perfil
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/dashboard-admin"
                      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black font-texto transition duration-200"
                    >
                      <FontAwesomeIcon icon={faTachometerAlt } className="text-xl" />
                      Panel de administrador
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white dark:hover:bg-red-800  font-texto transition duration-200"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
                    Cerrar Sesión
                  </button>
                </li>
                <li>
                  <Link
                    to="/carrito"
                    className="hover:text-gray-500 transition duration-200 flex items-center justify-center"
                    title="Ver mi Carrito"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                  </Link>
                </li>
              </>
            ) : (
              // Botones para usuarios no autenticados
              <>
                {location.pathname !== "/iniciar-sesion" && (
                  <li>
                    <Link
                      to="/iniciar-sesion"
                      className="hover:underline hover:text-sky-600 font-texto transition duration-200"
                    >
                      ¿Ya tienes cuenta?{" "}
                      <span className="font-bold">Inicia Sesión</span>
                    </Link>
                  </li>
                )}
                {location.pathname !== "/registrarse" && (
                  <li>
                    <Link
                      to="/registrarse"
                      className="hover:underline hover:text-sky-600 font-texto transition duration-200"
                    >
                      ¿Nuevo aquí? <span className="font-bold">Regístrate</span>
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>

        {/* Botón para cambiar de tema */}
        <ThemeToggleButton />
      </header>

      {/* Espaciador para evitar que el contenido quede detrás del header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
