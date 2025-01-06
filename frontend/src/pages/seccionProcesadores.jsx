import React from "react";
import processorIntel from '../assets/processors/intel.webp';
import RyzenAndIntel from '../assets/processors/ryzen-intel.png';
import processorAMD from '../assets/processors/amd.webp';
import processorApple from '../assets/processors/apple.png';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import Footer from '../layouts/footer';
import CategoriaProcesadores from '../layouts/categoriaProcesadores';

export default function ProcesadoresSeccion() {
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
            <section className="relative  from-gray-50 to-gray-200 dark:bg-black text-center py-20">
                <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6">
                    {/* Texto */}
                    <div className="text-left space-y-6">
                        <h2 className="text-xs sm:text-sm font-titulo uppercase tracking-widest text-red-500 font-bold">
                            La Batalla de Procesadores
                        </h2>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-titulo text-gray-800 dark:text-white leading-tight">
                            Intel Core i9 vs AMD Ryzen 9
                        </h1>
                        <p className="text-sm sm:text-base lg:text-lg font-titulo text-gray-600 dark:text-gray-300">
                            Descubre cuál es el procesador perfecto para ti. Potencia y rendimiento de Intel Core i9 enfrentados a la innovación y eficiencia del AMD Ryzen 9.
                            Elige según tus necesidades, ya sea gaming extremo, diseño creativo o multitarea avanzada.
                        </p>
                        <div className="flex space-x-4">
                            <button
                                className="px-6 py-3 border-2 border-blue-600 text-blue-600 text-sm sm:text-base lg:text-lg font-medium rounded-lg shadow-md bg-transparent hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                                onClick={() => window.open('https://www.intel.com', '_blank')}
                            >
                                Conocer Intel
                            </button>
                            <button
                                className="px-6 py-3 border-2 border-red-600 text-red-600 text-sm sm:text-base lg:text-lg font-medium rounded-lg shadow-md bg-transparent hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                                onClick={() => window.open('https://www.amd.com', '_blank')}
                            >
                                Conocer AMD
                            </button>
                        </div>
                    </div>



                    {/* Imagen */}
                    <div className="relative">
                        <div className="relative">
                            <img
                                src={RyzenAndIntel} // Cambiar a tu imagen
                                alt="Intel y AMD Procesadores"
                                className="w-full h-auto  hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-500/40 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/40 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    </div>
                </div>

                {/* Elementos decorativos */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-[150px] opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-[150px] opacity-30"></div>
            </section>


            {/* Featured Products */}
            <section className="py-16 px-10 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-black relative">
                <h2 className="text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                    Procesadores Destacados
                </h2>
                <div className="grid gap-10 md:grid-cols-3">
                    {[{
                        name: "Procesador AMD Ryzen 9 7950X",
                        image: processorAMD,
                        description: "Potencia insuperable con 16 núcleos, ideal para creadores y gamers extremos.",
                        link: "https://www.amd.com",
                        bgColor: "bg-gradient-to-br from-red-500/70 via-red-600/60 to-red-700/70 shadow-lg shadow-red-800/30"
                    }, {
                        name: "Procesador Apple M3 Pro",
                        image: processorApple,
                        description: "Eficiencia y velocidad revolucionarias en dispositivos compactos.",
                        link: "https://www.apple.com",
                        bgColor: "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
                    }, {
                        name: "Procesador Intel Core i9 13th Gen",
                        image: processorIntel,
                        description: "Diseño robusto para manejar aplicaciones multitarea con facilidad.",
                        link: "https://www.intel.com",
                        bgColor: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
                    }].map((product, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 ${product.bgColor}`}
                        >
                            {/* Fondo de imagen con gradiente para oscurecer */}
                            <div
                                className="absolute inset-0 w-full h-full bg-black/40"
                                style={{
                                    backgroundImage: `url(${product.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                            {/* Contenido */}
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
                {/* Decoraciones */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gray-300 rounded-full blur-[150px] opacity-40 dark:bg-gray-800"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full blur-[150px] opacity-40 dark:bg-gray-800"></div>
            </section>



            {/* Productos */}
            <div id="productos">
                <CategoriaProcesadores />
            </div>

            {/* Call to Action */}
            <section className="relative py-20 px-10 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-black dark:to-black text-center">
                <div className="relative max-w-4xl mx-auto">
                    <h2 className="text-5xl font-extrabold leading-tight text-gray-800 dark:text-white">
                        Encuentra el Procesador Ideal para Ti
                    </h2>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Diseñado para potenciar tu creatividad, mejorar tu productividad o elevar tus juegos al siguiente nivel. Elige tu aliado perfecto.
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
                        title: "Rendimiento Máximo",
                        description: "Procesadores diseñados para manejar las tareas más exigentes con facilidad.",
                        icon: "⚡"
                    }, {
                        title: "Eficiencia Energética",
                        description: "Innovación que reduce el consumo energético sin comprometer el rendimiento.",
                        icon: "🌱"
                    }, {
                        title: "Versatilidad",
                        description: "Desde gaming hasta diseño profesional, tenemos el procesador que necesitas.",
                        icon: "🔧"
                    }].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#171717] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
