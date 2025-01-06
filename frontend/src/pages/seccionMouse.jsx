import React from "react";
import mouseLogitech from '../assets/mouse/mouse-logitech.webp';
import mouseRazer from '../assets/mouse/mouse-razer.webp';
import mouseCorsair from '../assets/mouse/mouse-corsair.png';
import mouseSteelSeries from '../assets/mouse/mouse-steelSeries.webp';
import mouseHyperX from '../assets/mouse/mouse-hyperX.png';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import Footer from '../layouts/footer';
import CategoriaMouses from '../layouts/categoriaMouses';

export default function MouseSeccion() {
    return (
        <main className="bg-light dark:bg-dark bg-cover bg-center">
            {/* Headers */}
            <div className="hidden xl:block">
                <Header />
            </div>
            <div className="xl:hidden">
                <MobileHeader />
            </div>
            <Navbar />

            {/* Hero Section */}
            <section className="relative dark:bg-black bg-white text-black dark:text-white py-16 px-8 flex items-center justify-center">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center justify-center">
                    <div className="space-y-6">
                        <h2 className="text-sm uppercase tracking-wide text-[#00A1E3] font-bold">
                            Precisión. Ergonomía. Estilo.
                        </h2>
                        <h1 className="xl:text-5xl text-4xl font-titulo font-extrabold text-[#00A1E3]">
                            Mouse Logitech G502 HERO
                        </h1>
                        <p className="text-lg font-titulo text-gray-600 dark:text-gray-300 leading-relaxed">
                            Experimenta precisión avanzada con el Logitech G502 HERO. Perfecto para gamers y profesionales que exigen lo mejor en rendimiento y comodidad.
                        </p>
                        <button
                            className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-[#00A1E3] bg-transparent dark:bg-[#00A1E3]/40 text-[#00A1E3] dark:text-gray-100 font-medium rounded-lg hover:bg-[#00A1E3]/20 dark:hover:bg-[#00A1E3]/60 hover:text-[#0086C1] dark:hover:text-white transition-all duration-300 ease-in-out shadow-sm dark:shadow-md"
                            onClick={() => window.open('https://www.logitechg.com', '_blank')}
                        >
                            Conocer más
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src={mouseLogitech}
                            alt="Mouse Logitech G502 HERO"
                            className="w-full h-auto object-cover drop-shadow-xl"
                        />
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#00A1E3]/60 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00A1E3]/60 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            </section>


            {/* Featured Products */}
            <section className="py-16 px-10 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-black relative">
                <h2 className="text-5xl font-bold text-center mb-12 text-black dark:text-white">
                    Mouses Destacados
                </h2>
                <div className="grid gap-12 sm:grid-cols-12 items-center">
                    {[{
                        name: "Mouse Razer DeathAdder V2",
                        image: mouseRazer,
                        description: "Diseño ergonómico con iluminación RGB y switches ópticos.",
                        link: "https://www.razer.com",
                    }, {
                        name: "Mouse Corsair M65 Elite",
                        image: mouseCorsair,
                        description: "Sensor de 18,000 DPI y diseño duradero para los gamers más exigentes.",
                        link: "https://www.corsair.com",
                    }, {
                        name: "Mouse SteelSeries Rival 600",
                        image: mouseSteelSeries,
                        description: "Sistema de pesos ajustables y sensor de doble precisión.",
                        link: "https://steelseries.com",
                    }, {
                        name: "Mouse HyperX Pulsefire FPS Pro",
                        image: mouseHyperX,
                        description: "Iluminación RGB personalizable y sensor óptico avanzado.",
                        link: "https://www.hyperxgaming.com",
                    }].map((product, index) => (
                        <div
                            key={index}
                            className={`relative sm:col-span-6 lg:col-span-3 h-[28rem] bg-no-repeat bg-cover bg-center rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-500 hover:scale-105 ease-in-out`}
                            style={{ backgroundImage: `url(${product.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {product.name}
                                </h3>
                                <p className="text-base text-gray-300 leading-relaxed mb-6">
                                    {product.description}
                                </p>
                                <button
                                    className="self-start px-6 py-3 bg-[#00A1E3] text-white font-semibold rounded-lg shadow-lg hover:bg-[#0078AC] transition-colors duration-300"
                                    onClick={() => window.open(product.link, '_blank')}
                                >
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-gray-300 rounded-full blur-[150px] opacity-40 dark:bg-gray-800"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full blur-[150px] opacity-40 dark:bg-gray-800"></div>
            </section>


            {/* Productos */}
            <div id="productos">
                <CategoriaMouses />
            </div>

            {/* Call to Action */}
            <section className="relative py-20 px-10 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-black dark:to-black text-center">
                <div className="relative max-w-4xl mx-auto">
                    <h2 className="text-5xl font-extrabold leading-tight text-gray-800 dark:text-white">
                        Encuentra el Mouse Perfecto para Ti
                    </h2>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Diseñado para satisfacer tus necesidades, ya seas gamer, diseñador o profesional. Elige calidad y precisión.
                    </p>
                    <button
                        className="mt-8 px-8 py-3 text-lg bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 transition-all duration-300"
                        onClick={() => document.getElementById("productos").scrollIntoView({ behavior: "smooth" })}
                    >
                        Ir a Productos
                    </button>


                    <div className="absolute top-[-50px] left-[-80px] w-64 h-64 bg-gray-300 rounded-full blur-[120px] opacity-50 dark:bg-gray-700"></div>
                    <div className="absolute bottom-[-50px] right-[-80px] w-64 h-64 bg-gray-300 rounded-full blur-[120px] opacity-50 dark:bg-gray-700"></div>

                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {[{
                        title: "Precisión Avanzada",
                        description: "Los mejores sensores para garantizar cada movimiento.",
                        icon: "🎯"
                    }, {
                        title: "Ergonomía Perfecta",
                        description: "Diseñados para largas sesiones sin molestias.",
                        icon: "🖐️"
                    }, {
                        title: "Estilo Profesional",
                        description: "Complementa tu setup con diseños elegantes.",
                        icon: "✨"
                    }].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="text-4xl mb-4 text-gray-800 dark:text-white">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </main>
    );
}
