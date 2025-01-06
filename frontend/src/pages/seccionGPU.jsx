import nvidia3090 from '../assets/nvidia3090.webp';
import nvidia4070ti from '../assets/nvidia4070ti.webp';
import radeon6800xt from '../assets/Radeon RX 6800 XT Phantom Gaming 16GB.png';
import rx7900 from '../assets/rx7900.webp';
import tarjeta4090 from '../assets/nvidia4090.webp';
import Header from '../layouts/desktopHeader';
import MobileHeader from '../layouts/mobileHeader';
import Navbar from '../layouts/subNav';
import SeccionBusqueda from "./seccionBusqueda";
import useSearch from "../hooks/useSearch";
import ServicesSection from '../layouts/SeccionServicios';
import CategoriaTarjetaVideo from '../layouts/categoriaTarjetaVideo';
import Footer from '../layouts/footer';

export default function GpuSection() {
    const { results, isLoading, showResults, handleSearch } = useSearch();

    return (
        
        <main className='bg-light dark:bg-dark bg-cover bg-center'
       
        >
            <div className="hidden xl:block">
                <Header handleSearch={handleSearch} />
            </div>

            <div className="xl:hidden">
                <MobileHeader handleSearch={handleSearch} />
            </div>

            <Navbar />
            <section className="relative bg-white dark:bg-black text-black dark:text-white py-16 px-8 flex items-center justify-center transition-colors duration-300">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-sm uppercase tracking-wide text-green-500 font-bold">
                            Power. Beyond.
                        </h2>
                        <h1 className="xl:text-5xl text-4xl  font-titulo font-extrabold">
                            NVIDIA RTX 4090
                        </h1>
                        <p className="text-lg font-titulo text-gray-700 dark:text-gray-300">
                            Experimenta la potencia y rendimiento de la GPU más avanzada del mercado.
                            Diseñada para entusiastas, creadores y gamers que buscan llevar la experiencia al siguiente nivel.
                        </p>
                        <button
                            className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-gray-300 dark:border-green-400/40 bg-transparent dark:bg-green-300/20 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-green-300/40 hover:text-gray-800 dark:hover:text-white transition-all duration-300 ease-in-out shadow-sm dark:shadow-md"
                            onClick={() => window.open('https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/', '_blank')}
                        >
                            Conocer más
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src={tarjeta4090}
                            alt="NVIDIA RTX 4090"
                            className="w-full h-auto object-cover drop-shadow-xl" />
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 2xl:grid-cols-4">
            <div className="relative flex flex-col md:flex-row items-center bg-white dark:bg-[#121212] text-black dark:text-white p-6 col-span-1 2xl:col-span-2 h-auto md:h-64">
    <div className="flex-shrink-0">
        <img
            src={nvidia3090}
            alt="NVIDIA RTX 3090"
            className="w-[400px] h-auto object-fill"
        />
    </div>
    <div className="ml-6 space-y-4 text-center md:text-left">
        <h2 className="text-2xl font-bold font-titulo leading-tight">
            NVIDIA RTX 3090
        </h2>
        <p className="font-titulo text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Potente GPU diseñada para ofrecer gráficos inmersivos en 4K y capacidades de renderizado ultrarrápidas, ideal para creadores y gamers.
        </p>
        <button className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border bg-transparent border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-500/50 dark:hover:text-white transition-all duration-300 ease-in-out shadow-md">
            Conocer más
        </button>
    </div>
</div>

<div className="relative bg-gray-100 dark:bg-[#1c1c1c] text-black dark:text-white py-12 px-6 col-span-1 2xl:col-span-2 2xl:row-span-4 2xl:flex-col-reverse 2xl:text-center flex flex-col-reverse md:flex-row items-center justify-center">
    <div className="space-y-4 2xl:space-y-10 max-w-full md:max-w-lg text-center 2xl:flex 2xl:flex-col 2xl:items-center md:text-left mt-4 md:mt-0">
        <h2 className="text-xl md:text-2xl font-titulo font-bold leading-tight 2xl:text-center">
            NVIDIA RTX 4070 Ti
        </h2>
        <p className="text-sm md:text-base font-titulo text-gray-600 dark:text-gray-400 leading-relaxed 2xl:text-center">
            La NVIDIA RTX 4070 Ti ofrece un equilibrio perfecto entre potencia y eficiencia. Ofrece un rendimiento superior, con capacidades avanzadas de ray tracing y DLSS 3.
        </p>
        <button className="mt-4 font-titulo md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-gray-300 dark:border-green-400/40 bg-gray-200 dark:bg-green-300/20 text-gray-800 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-green-300/40 dark:hover:text-white transition-all duration-300 ease-in-out shadow-sm dark:shadow-md">
            Conocer más
        </button>
    </div>
    <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
        <img
            src={nvidia4070ti}
            alt="NVIDIA RTX 4070 Ti"
            className="w-[250px] sm:w-[300px] md:w-[450px] h-auto object-fill drop-shadow-lg"
        />
    </div>
</div>

<div className="relative bg-[#EEF0F3] dark:bg-[#242424] text-black dark:text-white py-12 px-6 col-span-1 md:flex-row 2xl:flex-col-reverse flex flex-col items-center justify-center">
    <div className="flex-shrink-0 flex justify-center w-full md:w-[450px] 2xl:w-auto">
        <img
            src={radeon6800xt}
            alt="Radeon RX 6800 XT"
            className="w-[200px] sm:w-[250px] md:w-[300px] xl:w-[250px] xl:mt-5 h-auto object-fill mb-5 drop-shadow-md"
        />
    </div>
    <div className="space-y-4 text-center md:text-left">
        <h2 className="text-xl font-titulo font-bold">
            Radeon RX 6800 XT
        </h2>
        <p className="text-sm font-titulo text-gray-600 dark:text-gray-400 leading-relaxed">
            Excelente rendimiento para gaming 4K y experiencias visuales inmersivas.
        </p>
        <button className="mt-4 font-titulo px-6 py-2 border border-gray-400 dark:border-gray-500 bg-gray-300 dark:bg-gray-500/20 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white/10 hover:text-black transition-all duration-300 ease-in-out shadow-md xl:block 2xl:hidden">
            Conocer más
        </button>
    </div>
</div>

<div className="relative bg-[#F7F9FE] dark:bg-[#1e1e1e] text-black dark:text-white py-12 px-6 col-span-1 md:flex-row-reverse 2xl:flex-col-reverse flex flex-col items-center justify-center">
    <div className="flex-shrink-0 flex justify-center w-full md:w-[450px] 2xl:w-auto">
        <img
            src={rx7900}
            alt="Radeon RX 7900"
            className="w-[200px] sm:w-[250px] md:w-[300px] xl:w-[250px] xl:mt-5 h-auto object-fill mb-5 drop-shadow-md"
        />
    </div>
    <div className="space-y-4 text-center md:text-left">
        <h2 className="text-xl font-titulo font-bold">
            Radeon RX 7900
        </h2>
        <p className="text-sm font-titulo text-gray-600 dark:text-gray-400 leading-relaxed">
            Potente GPU para creadores y gamers con tecnología de próxima generación.
        </p>
        <button className="font-titulo px-6 py-2 border border-gray-400 dark:border-gray-500 bg-gray-100/30 dark:bg-gray-500/20  text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white/10 hover:text-black transition-all duration-300 ease-in-out shadow-md xl:block 2xl:hidden">
            Conocer más
        </button>
    </div>
</div>


            </section>
            <ServicesSection />

            <CategoriaTarjetaVideo />
            <Footer />
        </main>
    );
}
