import monitorLG from '../assets/LG_ultragear.webp';
import monitorSamsung from '../assets/monitor-samsung.png';
import monitorDell from '../assets/monitor-dell.png';
import monitorAsus from '../assets/monitor-asus.png';
import monitorAcer from '../assets/monitor-acer.png';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import Footer from '../layouts/footer';
import ServicesSection from '../layouts/SeccionServicios';
import CategoriaMonitores from '../layouts/categoriaMonitores';

export default function MonitoresSeccion() {
    return (
        <main className='bg-light dark:bg-dark bg-cover bg-center'>
            <div className="hidden xl:block">
                <Header />
            </div>

            <div className="xl:hidden">
                <MobileHeader />
            </div>

            <Navbar />
            <section className="relative bg-white dark:bg-black text-black dark:text-white py-16 px-8 flex items-center justify-center transition-colors duration-300">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center justify-center">
                    <div className="space-y-6">
                        <h2 className="text-sm uppercase tracking-wide text-red-500 font-bold">
                            Clear. Bright. Sharp.
                        </h2>
                        <h1 className="xl:text-5xl text-4xl font-titulo font-extrabold text-red-600">
                            Monitor LG UltraGear
                        </h1>
                        <p className="text-lg font-titulo text-gray-700 dark:text-gray-300 leading-relaxed">
                            Disfruta de una calidad visual impresionante con el monitor LG UltraGear, ideal para gaming y trabajos creativos.
                            Rendimiento sin igual, fluidez extrema y colores vibrantes para tus sesiones más exigentes.
                        </p>
                        <button
                            className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-red-300 dark:border-red-400 bg-transparent dark:bg-red-500/20 text-red-600 dark:text-gray-100 font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-400/40 hover:text-red-800 dark:hover:text-white transition-all duration-300 ease-in-out shadow-sm dark:shadow-md"
                            onClick={() => window.open('https://www.lg.com/global/ultragear', '_blank')}
                        >
                            Conocer más
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src={monitorLG}
                            alt="Monitor LG UltraGear"
                            className="w-full h-auto object-cover lg:mt-10 drop-shadow-xl"
                        />
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/60 rounded-full blur-3xl opacity-50  animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/60 rounded-full blur-3xl opacity-50  animate-pulse"></div>
            </section>



            <section className="grid grid-cols-1 2xl:grid-cols-4 ">
                {/* Monitor Samsung Odyssey */}
                <div className="relative overflow-hidden flex flex-col md:flex-row items-center bg-white dark:bg-[#121212] text-black dark:text-white p-6 col-span-1 2xl:col-span-2 h-auto md:h-64 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="flex-shrink-0">
                        <img
                            src={monitorSamsung}
                            alt="Monitor Samsung"
                            className="w-[400px] h-auto object-fill rounded-md hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="ml-6 space-y-4 text-center md:text-left">
                        <h2 className="text-2xl font-bold font-titulo leading-tight">
                            Monitor Samsung Odyssey
                        </h2>
                        <p className="font-titulo text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            Sumérgete en una experiencia inmersiva con la tecnología curva de Samsung y una calidad de imagen inigualable.
                        </p>
                        <button className="mt-4 rounded-lg font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border bg-transparent border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-500/50 dark:hover:text-white transition-all duration-300 ease-in-out shadow-md">
                            Conocer más
                        </button>
                    </div>
                </div>

                {/* Monitor Dell UltraSharp */}
                <div className="relative bg-gray-100 dark:bg-[#1c1c1c] text-black dark:text-white py-12 px-6 col-span-1 2xl:col-span-2 2xl:row-span-4 flex flex-col-reverse md:flex-row items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="space-y-4 max-w-full md:max-w-lg text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-titulo font-bold leading-tight">
                            Monitor Dell UltraSharp
                        </h2>
                        <p className="text-sm md:text-base font-titulo text-gray-600 dark:text-gray-400 leading-relaxed">
                            Perfecto para profesionales que buscan precisión en colores y detalles excepcionales.
                        </p>
                        <button className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-gray-300 dark:border-blue-400/40 bg-gray-200 dark:bg-blue-300/20 text-gray-800 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-blue-300/40 dark:hover:text-white transition-all duration-300 ease-in-out shadow-sm">
                            Conocer más
                        </button>
                    </div>
                    <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
                        <img
                            src={monitorDell}
                            alt="Monitor Dell UltraSharp"
                            className="w-[250px] sm:w-[300px] md:w-[450px] h-auto object-fill drop-shadow-lg rounded-md hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Monitor Asus ProArt */}
                <div className="relative bg-[#EEF0F3] dark:bg-[#242424] text-black dark:text-white py-12 px-6 col-span-1 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="flex-shrink-0 flex justify-center w-full md:w-[450px]">
                        <img
                            src={monitorAsus}
                            alt="Monitor Asus"
                            className="w-[200px] sm:w-[250px] md:w-[300px] h-auto object-fill drop-shadow-md rounded-md hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="space-y-4 text-center">
                        <h2 className="text-xl font-titulo font-bold">
                            Monitor Asus ProArt
                        </h2>
                        <p className="text-sm font-titulo text-gray-600 dark:text-gray-400 leading-relaxed">
                            Diseñado para creadores que exigen precisión y colores perfectos en cada detalle.
                        </p>
                        <button className="mt-4 font-titulo px-6 py-2 border border-gray-400 dark:border-gray-500 bg-gray-300 dark:bg-gray-500/20 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white/10 hover:text-black transition-all duration-300 ease-in-out shadow-md">
                            Conocer más
                        </button>
                    </div>
                </div>

                {/* Monitor Acer Predator */}
                <div className="relative bg-[#F7F9FE] dark:bg-[#1e1e1e] text-black dark:text-white py-12 px-6 col-span-1 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                    <div className="flex-shrink-0 flex justify-center w-full md:w-[450px]">
                        <img
                            src={monitorAcer}
                            alt="Monitor Acer Predator"
                            className="w-[200px] sm:w-[250px] md:w-[300px] h-auto object-fill drop-shadow-md rounded-md hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="space-y-4 text-center">
                        <h2 className="text-xl font-titulo font-bold">
                            Monitor Acer Predator
                        </h2>
                        <p className="text-sm font-titulo text-gray-600 dark:text-gray-400 leading-relaxed">
                            Rendimiento extremo para gamers que buscan fluidez y precisión en cada partida.
                        </p>
                        <button className="mt-4 font-titulo px-6 py-2 border border-gray-400 dark:border-gray-500 bg-gray-100/30 dark:bg-gray-500/20 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white/10 hover:text-black transition-all duration-300 ease-in-out shadow-md">
                            Conocer más
                        </button>
                    </div>
                </div>
            </section>
            <ServicesSection />
            <CategoriaMonitores />
            

            <Footer />
        </main>
    );
}
