import React from 'react';
import motherboardAsus from '../assets/motherboard/motherboardAsus.png';
import motherboardGigabyte from '../assets/motherboard/motherboardGigabite.png';
import motherboardMSI from '../assets/motherboard/motherboardMSI.png';
import motherboardAsrock from '../assets/motherboard/motherboardAsrock.png';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import ServicesSection from '../layouts/SeccionServicios';
import CategoriaMotherboards from '../layouts/categoriaMotherboard';
import Footer from '../layouts/footer';

export default function MotherboardsSection() {
    return (
        <main className='bg-light dark:bg-dark bg-cover bg-center'>
            {/* Headers */}
            <div className="hidden xl:block">
                <Header />
            </div>

            <div className="xl:hidden">
                <MobileHeader />
            </div>

            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-gray-100 via-gray-200 to-white text-gray-800 py-16 px-8 flex items-center justify-center transition-colors duration-300 dark:from-gray-900 dark:via-gray-900 dark:to-black dark:text-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-sm uppercase tracking-wide text-blue-600 font-bold dark:text-blue-400">
                            Rendimiento, Durabilidad y Estilo
                        </h2>
                        <h1 className="xl:text-5xl text-4xl font-titulo font-extrabold">
                            ASUS ROG STRIX Z790-E
                        </h1>
                        <p className="text-lg font-titulo text-gray-600 dark:text-gray-300">
                            Experimenta la potencia de las mejores motherboards diseñadas para jugadores y creadores que buscan alto rendimiento, compatibilidad y estilo inigualable.
                        </p>
                        <button
                            className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-gray-400 bg-transparent text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:border-gray-500 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300 ease-in-out shadow-md"
                            onClick={() => window.open('https://www.asus.com/', '_blank')}
                        >
                            Conocer más
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src={motherboardAsus}
                            alt="ASUS ROG STRIX Z790-E"
                            className="w-full max-w-md h-auto object-cover drop-shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Grid de motherboards */}
            <section className="grid grid-cols-1 2xl:grid-cols-4 bg-gradient-to-b from-gray-100 via-gray-200 to-white dark:from-gray-900 dark:via-gray-900 dark:to-black transition-colors duration-300">
                {/* Motherboard 1 */}
                <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-r from-white via-gray-200 to-gray-100 text-gray-800 p-6 col-span-1 2xl:col-span-2 h-auto md:h-64 dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
                    <div className="flex-shrink-0">
                        <img
                            src={motherboardGigabyte}
                            alt="Gigabyte Aorus X670"
                            className="w-[400px] h-auto object-fill drop-shadow-md"
                        />
                    </div>
                    <div className="ml-6 space-y-4 text-center md:text-left">
                        <h2 className="text-2xl font-bold font-titulo leading-tight">
                            Gigabyte Aorus X670
                        </h2>
                        <p className="font-titulo text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            Motherboard avanzada con soporte para procesadores de última generación, diseñada para gaming extremo y multitarea eficiente.
                        </p>
                        <button className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-gray-400 bg-transparent text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:border-gray-500 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300 ease-in-out shadow-md">
                            Conocer más
                        </button>
                    </div>
                </div>

                {/* Motherboard 2 */}
                <div className="relative bg-gradient-to-r from-white via-gray-200 to-gray-100 text-gray-800 py-12 px-6 col-span-1 2xl:col-span-2 2xl:row-span-4 flex flex-col-reverse md:flex-row items-center justify-center dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
                    <div className="space-y-4 max-w-full md:max-w-lg text-center md:text-left mt-4 md:mt-0">
                        <h2 className="text-xl md:text-2xl font-titulo font-bold leading-tight">
                            MSI MAG B660M
                        </h2>
                        <p className="text-sm md:text-base font-titulo text-gray-600 dark:text-gray-300 leading-relaxed">
                            La MSI MAG B660M ofrece un diseño robusto con soporte para PCIe 5.0 y tecnología avanzada de refrigeración para largas jornadas de uso.
                        </p>
                        <button className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-gray-400 bg-transparent text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:border-gray-500 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300 ease-in-out shadow-md">
                            Conocer más
                        </button>
                    </div>
                    <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
                        <img
                            src={motherboardMSI}
                            alt="MSI MAG B660M"
                            className="w-[250px] sm:w-[300px] md:w-[450px] h-auto object-fill drop-shadow-lg"
                        />
                    </div>
                </div>

                {/* Motherboard 3 */}
                <div className="relative bg-gradient-to-r from-white via-gray-200 to-gray-100 text-gray-800 py-12 px-6 col-span-1 flex flex-col items-center justify-center dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
                    <div className="flex-shrink-0 flex justify-center w-full md:w-[450px]">
                        <img
                            src={motherboardAsrock}
                            alt="ASRock Z790 Pro"
                            className="w-[200px] sm:w-[250px] md:w-[300px] xl:w-[250px] h-auto object-fill mb-5 drop-shadow-md"
                        />
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-xl font-titulo font-bold">
                            ASRock Z790 Pro
                        </h2>
                        <p className="text-sm font-titulo text-gray-600 dark:text-gray-300 leading-relaxed">
                            Optimiza tu rendimiento con la ASRock Z790 Pro, ideal para creadores y entusiastas que exigen lo mejor.
                        </p>
                        <button className="mt-4 font-titulo px-6 py-2 border border-gray-400 bg-transparent text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:border-gray-500 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300 ease-in-out shadow-md">
                            Conocer más
                        </button>
                    </div>
                </div>


                <div className="relative bg-gradient-to-r from-gray-100 via-gray-200 to-white text-gray-800 py-12 px-6 col-span-1 flex flex-col items-center justify-center dark:from-gray-900 dark:via-gray-900 dark:to-black dark:text-white transition-colors duration-300">
                    <div className="flex-shrink-0 flex justify-center w-full md:w-[450px]">
                        <img
                            src={motherboardGigabyte}
                            alt="Gigabyte Aorus X670"
                            className="w-[200px] sm:w-[250px] md:w-[300px] xl:w-[250px] h-auto object-fill mb-5 drop-shadow-md"
                        />
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-xl font-titulo font-bold">
                            Gigabyte Aorus X670
                        </h2>
                        <p className="text-sm font-titulo text-gray-600 leading-relaxed dark:text-gray-300">
                            Motherboard avanzada con soporte para procesadores de última generación, diseñada para gaming extremo y multitarea eficiente.
                        </p>
                        <button className="mt-4 font-titulo px-6 py-2 border border-gray-400 bg-transparent text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:border-gray-500 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300 ease-in-out shadow-md">
                            Conocer más
                        </button>
                    </div>
                </div>

            </section>


            {/* Additional Sections */}
            <ServicesSection />
            <CategoriaMotherboards />
            <Footer />
        </main>
    );
}
