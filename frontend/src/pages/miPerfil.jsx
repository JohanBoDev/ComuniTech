import UserProfile from "../components/informacionUsuario";
import UserAddresses from "../layouts/direccionDeUsuario";
import MobileHeader from "../layouts/mobileHeader";
import Header from "../layouts/desktopHeader";
import PedidosList from "../layouts/listaDePedidos";
import Footer from "../layouts/footer";

const MiPerfil = () => {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="hidden xl:block">
          <Header />
        </div>
        <div className="xl:hidden">
          <MobileHeader />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="bg-white dark:bg-black shadow-md rounded-lg p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>
          <UserProfile />
          <UserAddresses />
          <PedidosList />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ">
        <Footer />
      </footer>
    </div>
  );
};

export default MiPerfil;
