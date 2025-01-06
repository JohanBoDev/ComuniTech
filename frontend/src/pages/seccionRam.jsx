import React from "react";
import ramCorsair from '../assets/ram/ram-corsair.png';
import ramKingston from '../assets/ram/ram-kingston.png';
import ramGSkill from '../assets/ram/ram-gskill.png';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import Footer from '../layouts/footer';
import CategoriaRam from "../layouts/categoriaRam";

export default function RAMSeccion() {
    return (
<main className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-black">
    {/* Headers */}
    <div className="hidden xl:block">
        <Header />
    </div>
    <div className="xl:hidden">
        <MobileHeader />
    </div>
    <Navbar />

    {/* Hero Section */}
    <section className="relative flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-white dark:from-gray-800 dark:via-gray-900 dark:to-black text-black dark:text-white py-20 px-8">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
            <h2 className="text-lg uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold">
                Rendimiento sin Límites
            </h2>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                Memoria RAM Corsair Vengeance
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Experimenta un rendimiento superior para gaming, multitarea y cargas de trabajo intensas. Dale a tu PC la potencia que merece con la RAM Corsair Vengeance RGB.
            </p>
            <button
                className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-lg bg-transparent hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-black transition-all duration-300"
                onClick={() => window.open('https://www.corsair.com', '_blank')}
            >
                Descubre más
            </button>
        </div>
        <div className="relative">
            <img
                src={ramCorsair}
                alt="Corsair Vengeance RAM"
                className="w-full max-w-lg h-auto object-contain drop-shadow-xl"
            />
        </div>
    </div>
</section>


    {/* Featured RAM */}
    <section className="py-16 px-10 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            RAM Destacadas
        </h2>
        <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2">
            {[{
                name: "RAM Corsair Vengeance RGB Pro",
                image: ramCorsair,
                description: "Personaliza tu experiencia con iluminación RGB y rendimiento extremo.",
                link: "https://www.corsair.com",
                bgColor: "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
            }, {
                name: "RAM Kingston Fury Beast",
                image: ramKingston,
                description: "Fiabilidad y velocidad que impulsan tus aplicaciones más exigentes.",
                link: "https://www.kingston.com",
                bgColor: "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900"
            }, {
                name: "RAM G.Skill Trident Z Neo",
                image: ramGSkill,
                description: "Diseño elegante y optimización para gaming de alto rendimiento.",
                link: "https://www.gskill.com",
                bgColor: "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700"
            }].map((product, index) => (
                <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 ${product.bgColor}`}
                >
                    <div className="relative flex flex-col h-full p-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-10"
                        />
                        <div className="z-10">
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {product.name}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {product.description}
                            </p>
                            <button
                                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg bg-transparent hover:bg-white hover:text-black transition-all duration-300"
                                onClick={() => window.open(product.link, '_blank')}
                            >
                                Más Información
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>

    <div id="productos">
        <CategoriaRam />
    </div>

    {/* Call to Action */}
    <section className="relative py-20 px-8 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-black">
    <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white leading-snug">
            Encuentra la RAM Perfecta para Tu PC
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Descubre la memoria RAM que tu equipo necesita para alcanzar su máximo rendimiento. Ideal para gamers, editores de video y profesionales multitarea.
        </p>
        <button
            className="px-8 py-3 border-2 border-sky-500 text-sky-500 font-semibold rounded-lg bg-transparent hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-md"
            onClick={() => document.getElementById("productos").scrollIntoView({ behavior: "smooth" })}
        >
            Explorar Productos
        </button>
    </div>

    {/* Efectos visuales de fondo */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-full blur-[120px] opacity-30"></div>
    <div className="absolute bottom-0 left-10 w-48 h-48 bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-full blur-[120px] opacity-20"></div>
    <div className="absolute bottom-0 right-10 w-48 h-48 bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-full blur-[120px] opacity-20"></div>
</section>


    <Footer />
</main>
    );
}
