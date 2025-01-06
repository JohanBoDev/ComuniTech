import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"

const testimonios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    comentario: "Excelente servicio y productos de calidad. Muy recomendado.",
    imagen: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    nombre: "Ana Gómez",
    comentario: "Entrega rápida y atención personalizada. Volveré a comprar.",
    imagen: "https://images.unsplash.com/photo-1726254290476-680bcc383505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
  },
  {
    id: 3,
    nombre: "Carlos Díaz",
    comentario: "Me encanta la variedad de productos que ofrecen. ¡10/10!",
    imagen: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
  },
];

const Testimonios = () => {
  return (

<section className="bg-white dark:bg-black text-gray-800 dark:text-white py-16 border-t border-gray-200/50 dark:border-gray-800/50">
  <div className="relative container mx-auto px-6 py-8 text-center">
    <h2 className="text-4xl font-extrabold mb-10 text-gray-900 dark:text-white drop-shadow-md">
      Lo que dicen nuestros clientes
    </h2>

    <div className="relative">
      {/* Slider en dispositivos móviles */}
      <div className="flex  md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-6">
        {testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-black/70 dark:to-black/90 text-gray-900 dark:text-white rounded-lg shadow-md dark:shadow-lg p-6 flex flex-col items-center min-w-[90%] snap-center"
          >
            <img
              src={testimonio.imagen}
              alt={`Foto de ${testimonio.nombre}`}
              className="w-32 h-32 rounded-full mb-4 object-cover border border-gray-300 dark:border-gray-700"
            />
            <p className="italic text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
              "{testimonio.comentario}"
            </p>
            <p className="font-bold text-lg text-gray-800 dark:text-white">
              {testimonio.nombre}
            </p>
            {/* Estrellas */}
            <div className="flex gap-1 mt-3">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Grid para pantallas medianas y grandes */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-black/70 dark:to-black/90 text-gray-900 dark:text-white rounded-lg shadow-md dark:shadow-lg p-6 flex flex-col items-center hover:shadow-xl dark:hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            <img
              src={testimonio.imagen}
              alt={`Foto de ${testimonio.nombre}`}
              className="w-40 h-40 rounded-full mb-4 object-cover border border-gray-300 dark:border-gray-700"
            />
            <p className="italic text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
              "{testimonio.comentario}"
            </p>
            <p className="font-bold text-lg text-gray-800 dark:text-white">
              {testimonio.nombre}
            </p>
            {/* Estrellas */}
            <div className="flex gap-1 mt-3">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="dark:text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)] text-black" 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
  
  );
};

export default Testimonios;
