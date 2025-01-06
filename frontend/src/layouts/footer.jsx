import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faKeyboard, faMouse, faMicrochip, faMemory, faVideo, faHdd, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 via-gray-200 to-white text-black dark:from-black/90 dark:via-black dark:to-black dark:text-gray-200 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">ComuniTech</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tu sitio confiable para comprar componentes tecnológicos desde casa. Diseño claro, productos destacados y pagos seguros.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a href="#" className="hover:text-blue-400 transition text-gray-800 dark:text-gray-200">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="hover:text-blue-400 transition text-gray-800 dark:text-gray-200">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="hover:text-pink-400 transition text-gray-800 dark:text-gray-200">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="hover:text-blue-500 transition text-gray-800 dark:text-gray-200">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Categoría: Productos */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Productos</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/monitores" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Monitores</Link>
            </li>
            <li>
              <Link to="/teclados" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Teclados</Link>
            </li>
            <li>
              <Link to="/mouses" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Mouses</Link>
            </li>
            <li>
              <Link to="/procesadores" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Procesadores</Link>
            </li>
            <li>
              <Link to="/ram" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">RAM</Link>
            </li>
          </ul>
        </div>

        {/* Servicios */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Servicios</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Garantías</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Soporte técnico</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Envíos</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Política de devoluciones</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Métodos de pago</a>
            </li>
          </ul>
        </div>

        {/* Categorías adicionales */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Más Categorías</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FontAwesomeIcon icon={faVideo} size="lg" className="text-gray-400" />
              <Link to="/tarjetas-graficas" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Tarjetas Gráficas</Link>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FontAwesomeIcon icon={faMicrochip} size="lg" className="text-gray-400" />
              <Link to="/motherboards" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">MotherBoards</Link>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FontAwesomeIcon icon={faHdd} size="lg" className="text-gray-400" />
              <Link to="/storage" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Almacenamiento</Link>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FontAwesomeIcon icon={faBatteryFull} size="lg" className="text-gray-400" />
              <Link to ="/fuentes-poder" className="hover:text-gray-400 transition text-gray-800 dark:text-gray-200">Fuentes de Poder</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} ComuniTech. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
