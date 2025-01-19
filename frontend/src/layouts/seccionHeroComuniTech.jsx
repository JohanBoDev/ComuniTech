
import fondo_info from '../assets/fondo_info_seccion.mp4';
import guia from '../assets/guia.pdf';

export default function ComoNacioComunitech() {

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sección: ¿No sabes cómo armar tu PC? */}
      <section 
        className="relative text-black dark:text-white bg-white dark:bg-black py-5  sm:px-8 flex items-center justify-center transition-colors duration-300"
        style={{ backgroundImage: `url(${fondo_info})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/80 dark:bg-black/80 p-6 sm:p-10 rounded-lg shadow-lg">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold">¿No sabes cómo armar tu PC?</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              En Comunitech nos preocupamos por todo. Aquí encontrarás todo lo que necesitas para armar tu PC, desde los componentes hasta los periféricos.
              A continuación, haciendo clic en el botón podrás descargar un PDF con la guía de cómo armar tu PC. También puedes ver un tutorial en video de <a className='font-bold' href="https://www.youtube.com/channel/UC_HmnbOUGntK97PGUIXF9HA" target="_blank" rel="noopener noreferrer">Sara's Tech</a> haciendo clic en el reproductor.
            </p>
            <a 
              href={guia} 
              className="inline-block bg-[#1A1A1A] hover:bg-[#414141] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 shadow-md"
              download
            >
              📥 Descargar aquí la guía
            </a>
          </div>
          <div className="flex justify-center">
            <iframe 
              className="w-full max-w-[560px] h-[200px] sm:h-[315px]"
              src="https://www.youtube.com/embed/omrvbgiyyOQ?si=jUIjuRJ43Yn6EpFU" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </section>
    </div>

  );
}
