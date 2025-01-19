import React from "react";
import { useAuth } from "../context/AuthContext";
import UserProfile from "../components/informacionUsuario";
import MobileHeader from "../layouts/mobileHeader";
import Header from "../layouts/desktopHeader";
import Footer from "../layouts/footer";
import noPermiso from "../assets/admin_no_permiso.svg";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  const { isAdmin } = useAuth();

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

      {isAdmin ? (
        <main className="flex-grow container mx-auto p-4 md:p-8">    <UserProfile />
          <div className="bg-white dark:bg-black shadow-md rounded-lg p-6 md:p-10">
        
            <h1 className="text-3xl font-bold mb-6 text-center font-titulo">Dashboard Administrador</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/gestionarUsuarios" className="w-full flex justify-center items-center font-titulo py-4 px-6 text-lg bg-gray-200 dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                Gestión de usuarios
              </Link>
              <Link to="/administrarProductos" className="w-full flex justify-center items-center font-titulo py-4 px-6 text-lg bg-gray-200 dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                Gestión de Productos
              </Link>
              <Link to="/administrarPedidos" className="w-full flex justify-center items-center font-titulo py-4 px-6 text-lg bg-gray-200 dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                Gestión de pedidos
              </Link>
              <Link to="/administrarPagos" className="w-full flex justify-center items-center font-titulo py-4 px-6 text-lg bg-gray-200 dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                Gestión de pagos
              </Link>
            </div>
          </div>
        </main>


      ) : (
        <div className="flex-grow container mx-auto mt-10 p-4 md:p-8 h-screen">
          <img src={noPermiso} alt="No tienes permisos" className="mx-auto size-96 mb-10 " />
          <h1 className="text-3xl font-bold mb-6 text-center">¡Ups! No tienes permisos para acceder a esta página</h1>

        </div>
      )
      }



      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-[#1A1A1A]-[#1A1A1A] text-gray-600 dark:text-gray-400 ">
        <Footer />
      </footer>
    </div>
  );
};

export default AdminDashboard;
