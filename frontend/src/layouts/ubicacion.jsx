import React from "react";

const Ubicacion = () => {
  return (
<section className="bg-gray-50 dark:bg-black text-gray-800 dark:text-white py-16 border-t border-gray-200 dark:border-gray-800">
  {/* Contenido principal */}
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow-md">
      ¿Dónde estamos ubicados?
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-light">
      Encuéntranos en nuestra tienda física o contáctanos para obtener más información.
    </p>
  </div>

  {/* Contenedor del mapa */}
  <div className="relative container mx-auto px-6 h-96 shadow-lg rounded-lg overflow-hidden bg-gray-100 dark:bg-black">
    <iframe
      title="Mapa de Ubicación"
      className="absolute inset-0 w-full h-full border-none rounded-lg"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.211492221136!2d-74.38287942432335!3d5.069440888349206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e408fb69e7d2941%3A0xaee8a9afd940b180!2sNocaima%2C%20Cundinamarca!5e0!3m2!1ses!2sco!4v1734070362340!5m2!1ses!2sco"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>

  {/* Dirección */}
  <div className="container mx-auto px-6 text-center mt-6">
    <p className="text-lg font-medium text-gray-800 dark:text-white">
      📍 Dirección: Calle 4A 23 45, Nocaima, Cundinamarca
    </p>
    <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
      Horario: Lunes a Viernes, 9:00 AM - 7:00 PM
    </p>
  </div>
</section>

  );
};

export default Ubicacion;
