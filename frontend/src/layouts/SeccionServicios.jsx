import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast, faShieldAlt, faDollarSign, faTools, faUsers, faHeadset } from "@fortawesome/free-solid-svg-icons";

const ServicesSection = () => {
  const services = [
    { icon: faShippingFast, title: "Envío rápido", description: "Entrega rápida y segura para todos tus pedidos." },
    { icon: faShieldAlt, title: "Seguridad", description: "Compras protegidas con las mejores garantías." },
    { icon: faDollarSign, title: "Precios competitivos", description: "Ofrecemos productos a precios accesibles." },
    { icon: faTools, title: "Soporte técnico", description: "Asesoría técnica para tus componentes tecnológicos." },
    { icon: faUsers, title: "Atención personalizada", description: "Nuestro equipo está listo para ayudarte." },
    { icon: faHeadset, title: "Servicio al cliente", description: "Soporte disponible 24/7 para resolver tus dudas." },
  ];

  return (
<section
    className="px-6 py-12 bg-cover bg-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-black dark:via-black/90 dark:to-black"
>
  <h2 className="lg:text-4xl md:text-3xl text-2xl font-titulo font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
    ¿Por qué elegir ComuniTech?
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
    {services.map((service, index) => (
      <div
        key={index}
        className="flex flex-col text-center justify-center items-center bg-white/80 dark:bg-[#1A1A1A] p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <div className="text-black dark:text-white text-5xl mb-4 transition-colors duration-300 ">
          <FontAwesomeIcon icon={service.icon} />
        </div>
        <h3 className="text-lg font-texto font-semibold text-gray-700 dark:text-gray-100 mb-2 transition-colors duration-300 hover:text-gray-900 dark:hover:text-white">
          {service.title}
        </h3>
      </div>
    ))}
  </div>
</section>


  );
};

export default ServicesSection;
