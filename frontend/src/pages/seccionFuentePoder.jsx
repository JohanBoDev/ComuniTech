import React from "react";
import corsairImage from '../assets/power/fuente-corsair.png';
import evgaImage from '../assets/power/fuente-eva.png';
import thermaltakeImage from '../assets/power/fuente-pylon.png';
import seasonicImage from '../assets/power/fuente-termal.png';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import Footer from '../layouts/footer';
import CategoriaFuentesPoder from '../layouts/categoriaFuentePoder';
import ServicesSection from "../layouts/SeccionServicios";

export default function FuentesPoderSeccion() {
    return (
        <main className="bg-gradient-to-b from-black via-[#1A1A1A] to-black text-white">
            {/* Headers */}
            <div className="hidden xl:block">
                <Header />
            </div>
            <div className="xl:hidden">
                <MobileHeader />
            </div>
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-16 px-8 flex items-center justify-center bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-sm uppercase tracking-wide text-red-500 font-bold">
                            Fiabilidad y Potencia
                        </h2>
                        <h1 className="xl:text-6xl text-5xl font-titulo font-extrabold text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-gray-100 dark:to-gray-400 bg-gradient-to-l from-gray-800 to-gray-900">
                            Fuente de Poder Corsair RM850
                        </h1>
                        <p className="text-lg font-titulo dark:text-gray-300 leading-relaxed text-gray-400">
                            Descubre la fuente de poder ideal para tu setup. Confiabilidad, potencia y eficiencia para equipos de alto rendimiento.
                        </p>
                        <button
                            className="mt-6 px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
                            onClick={() => window.open('https://www.corsair.com', '_blank')}
                        >
                            Conocer más
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src={corsairImage}
                            alt="Fuente de Poder Corsair RM850"
                            className="w-full h-auto object-cover drop-shadow-xl"
                        />
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-48 h-48 bg-gray-700/50 rounded-full blur-3xl opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/40 rounded-full blur-3xl opacity-70"></div>
            </section>

            {/* Productos Destacados */}
            <section className="py-16 px-10 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-black relative">
                <h2 className="text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                    Fuentes de Poder Destacadas
                </h2>
                <div className="grid gap-10 md:grid-cols-3">
                    {[{
                        name: "Corsair RM850",
                        image: corsairImage,
                        description: "Eficiencia 80+ Gold y operación silenciosa para equipos exigentes.",
                        link: "https://www.corsair.com",
                        bgColor: "bg-gradient-to-br from-red-500/70 via-red-600/60 to-red-700/70 shadow-lg shadow-red-800/30"
                    }, {
                        name: "EVGA SuperNOVA 750",
                        image: evgaImage,
                        description: "Diseño modular y eficiencia Platinum para setups avanzados.",
                        link: "https://www.evga.com",
                        bgColor: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
                    }, {
                        name: "Thermaltake Smart 600W",
                        image: thermaltakeImage,
                        description: "Rendimiento confiable para configuraciones económicas y eficientes.",
                        link: "https://www.thermaltake.com",
                        bgColor: "bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700"
                    }, {
                        name: "Seasonic Focus 850W",
                        image: seasonicImage,
                        description: "Compacta y totalmente modular con certificación 80+ Gold.",
                        link: "https://www.seasonic.com",
                        bgColor: "bg-gradient-to-br from-green-500 via-green-600 to-green-700"
                    }].map((product, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 ${product.bgColor}`}
                        >
                            {/* Background image with overlay */}
                            <div
                                className="absolute inset-0 w-full h-full bg-black/40"
                                style={{
                                    backgroundImage: `url(${product.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                            {/* Content */}
                            <div className="relative p-6 flex flex-col justify-end h-96 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>
                                <p className="text-gray-200 mb-5 leading-relaxed">{product.description}</p>
                                <button
                                    className="self-start px-6 py-3 border-2 border-white text-white text-lg font-medium rounded-lg bg-transparent hover:bg-white hover:text-black transition-all duration-300"
                                    onClick={() => window.open(product.link, '_blank')}
                                >
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Decorations */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gray-300 rounded-full blur-[150px] opacity-40 dark:bg-gray-800"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full blur-[150px] opacity-40 dark:bg-gray-800"></div>
            </section>

            {/* Productos */}
            <div id="productos">
                <CategoriaFuentesPoder />
            </div>
          
            {/* Servicios */}   
            <ServicesSection />
            
            {/* Footer */}  

            <Footer />
        </main>
    );
}
