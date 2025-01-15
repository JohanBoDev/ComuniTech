import React from "react";
import { useAuth } from "../context/AuthContext"; // Importa el hook de autenticación
import "../home.css";

const HomeSection = () => {
  const { user, isLoggedIn } = useAuth(); // Obtén datos del usuario y el estado de autenticación

  return (
    <section className="home-section relative bg-cover bg-center text-white h-screen">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="src/assets/backgrounds/buildComunitech.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Barrera para contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 dark:from-black/50 dark:via-black/70 dark:to-black/90"></div>

      {/* Contenido */}
      <div className="relative container mx-auto px-6 py-20 text-center flex flex-col justify-center items-center h-full">
        {/* Mostrar el saludo solo si el usuario está autenticado */}
        {isLoggedIn && user?.nombre && (
          <h1 className="text-3xl font-extrabold mb-4 text-gray-200">
            Hola, {user.nombre} 👋
          </h1>
        )}

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-md tracking-wide">
          Bienvenido a <span className="text-gray-300">ComuniTech</span>
        </h1>
        <p className="text-lg md:text-2xl mb-6 font-light text-gray-700 dark:text-gray-300 font-texto drop-shadow-[1px_1px_10px_black] max-w-2xl leading-relaxed">
          Los mejores componentes de PC al alcance de tu mano. Garantía, calidad
          y envíos rápidos.
        </p>

        <div className="flex justify-center gap-4">
          <button className="py-3 px-6 md:px-8 bg-gradient-to-r from-black/70 to-black/90 text-white font-texto font-semibold rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 dark:drop-shadow-[0_4px_6px_rgba(255,255,255,0.2)]">
            Explorar Productos
          </button>

        </div>
      </div>
    </section>
  );
};

export default HomeSection;
