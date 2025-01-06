import React from "react";
import storageSamsung from '../assets/storage/storage-samsung.png';
import storageWD from '../assets/storage/storage-wd.png';
import storageSeagate from '../assets/storage/storage-seagate.png';
import storageCrucial from '../assets/storage/storage-crucial.png';
import storageKingston from '../assets/storage/storage-kingston.png';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import Footer from '../layouts/footer';
import CategoriaAlmacenamiento from '../layouts/categoriaAlmacenamiento';

export default function AlmacenamientoSeccion() {
    return (
        <main className="bg-gradient-to-b from-black via-[#0D1117] to-black text-white">
            {/* Headers */}
            <div className="hidden xl:block">
                <Header />
            </div>
            <div className="xl:hidden">
                <MobileHeader />
            </div>
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-16 px-8 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-sm uppercase tracking-wide text-red-500 font-bold">
                            Rendimiento de Nivel Superior
                        </h2>
                        <h1 className="xl:text-6xl text-5xl font-titulo font-extrabold text-transparent bg-clip-text bg-gradient-to-r dark:from-gray-100 dark:to-gray-400 from-gray-800 to-gray-900">
                            SSD Samsung 980 PRO 4TB
                        </h1>
                        <p className="text-lg font-titulo dark:text-gray-300 text-black leading-relaxed">
                            Experimenta velocidad, confiabilidad y capacidad excepcionales con los SSD de Samsung. Optimiza tu equipo con la última tecnología en almacenamiento.
                        </p>
                        <button
                            className="mt-6 px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
                            onClick={() => window.open('https://www.samsung.com', '_blank')}
                        >
                            Conocer más
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src={storageSamsung}
                            alt="SSD Samsung 970 EVO Plus"
                            className="w-full h-auto object-cover drop-shadow-xl"
                        />
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-48 h-48 bg-gray-700/50 rounded-full blur-3xl opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/40 rounded-full blur-3xl opacity-70"></div>
            </section>


            {/* Featured Products */}
            <section className="py-16 px-10 dark:bg-gradient-to-b bg-white dark:from-[#1A1A1A] dark:to-black  relative">
                <h2 className="text-5xl font-bold text-center mb-12 dark:text-white text-black">
                    Almacenamiento Destacado
                </h2>
                <div className="grid gap-12 sm:grid-cols-12 items-center">
                    {[{
                        name: "WD Red SA500",
                        image: storageWD,
                        description: "Optimizado para NAS, ofrece almacenamiento fiable y eficiente.",
                        link: "https://www.wd.com",
                        bgColor: "bg-red-500",
                    }, {
                        name: "Seagate Barracuda",
                        image: storageSeagate,
                        description: "Capacidades masivas y rendimiento confiable para todos.",
                        link: "https://www.seagate.com",
                        bgColor: "bg-green-500",
                    }, {
                        name: "Crucial P3 NVMe",
                        image: storageCrucial,
                        description: "Rendimiento NVMe con velocidades de hasta 3500 MB/s.",
                        link: "https://www.crucial.com",
                        bgColor: "bg-blue-500",
                    }, {
                        name: "Kingston A2000",
                        image: storageKingston,
                        description: "Ideal para sistemas avanzados con almacenamiento rápido.",
                        link: "https://www.kingston.com",
                        bgColor: "bg-gray-500",
                    }].map((product, index) => (
                        <div
                            key={index}
                            className={`relative sm:col-span-6 lg:col-span-3 h-[28rem] ${product.bgColor} bg-no-repeat bg-cover bg-center rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-500 hover:scale-105 ease-in-out`}
                            style={{ backgroundImage: `url(${product.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {product.name}
                                </h3>
                                <p className="text-base text-gray-200 leading-relaxed mb-6">
                                    {product.description}
                                </p>
                                <button
                                    className="self-start px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition-colors duration-300"
                                    onClick={() => window.open(product.link, '_blank')}
                                >
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-gray-700/20 rounded-full blur-[150px] opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-[150px] opacity-50"></div>
            </section>



            {/* Productos */}
            <div id="productos">
                <CategoriaAlmacenamiento />
            </div>

            {/* Call to Action */}
            <section className="relative py-20 px-10 dark:bg-gradient-to-b dark:from-[#0D1117] dark:to-black bg-white text-center">
                <div className="relative max-w-4xl mx-auto">
                    <h2 className="text-5xl font-extrabold leading-tight dark:text-white text-black">
                        Encuentra el Almacenamiento Ideal para Tus Necesidades
                    </h2>
                    <p className="mt-6 text-xl dark:text-gray-400 leading-relaxed text-black">
                        Diseñado para ofrecerte velocidad, capacidad y confiabilidad. Elige la mejor opción para tu setup.
                    </p>
                    <button
                        className="mt-8 px-8 py-3 text-lg bg-[#00A1E3] text-white font-semibold rounded-full hover:bg-[#0078AC] transition-all duration-300"
                        onClick={() => document.getElementById("productos").scrollIntoView({ behavior: "smooth" })}
                    >
                        Ir a Productos
                    </button>

                    <div className="absolute top-[-50px] left-[-80px] w-64 h-64 bg-[#00A1E3]/20 rounded-full blur-[120px] opacity-50"></div>
                    <div className="absolute bottom-[-50px] right-[-80px] w-64 h-64 bg-[#00A1E3]/20 rounded-full blur-[120px] opacity-50"></div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {[{
                        title: "Velocidades Extremas",
                        description: "Transferencias rápidas para un flujo de trabajo más eficiente.",
                        icon: "🚀"
                    }, {
                        title: "Gran Capacidad",
                        description: "Almacenamiento amplio para todos tus archivos y proyectos.",
                        icon: "💾"
                    }, {
                        title: "Fiabilidad Garantizada",
                        description: "Dispositivos construidos para durar en el tiempo.",
                        icon: "🔒"
                    }].map((feature, index) => (
                        <div
                            key={index}
                            className="dark:bg-[#0D1117] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white text-black">
                            <div className="text-4xl mb-4 text-[#00A1E3]">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold dark:text-white text-black">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-gray-400 leading-relaxed">
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
