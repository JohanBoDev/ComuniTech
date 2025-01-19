import useProductosPaginados from "../hooks/useProductosPaginados";
import BuscarProducto from "../components/buscarProducto";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import Footer from "../layouts/footer";
import AgregarProducto from "../components/agregarProducto";
import BotonEliminarProducto from "../components/eliminarProducto";
import BotonEditarProducto from "../components/editarProducto";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import noPermiso from "../assets/admin_no_permiso.svg";


export default function AdministrarProductos() {
  const [searchTerm, setSearchTerm] = useState("");
  const { productos, paginaActual, totalPaginas, loading, error, irAPagina } =
    useProductosPaginados(1, searchTerm);

  const [messages, setMessages] = useState({});
  const { isAdmin } = useAuth();

  const updateMessage = (productId, message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [productId]: message,
    }));
    setTimeout(() => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[productId];
        return newMessages;
      });
    }, 3000);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    irAPagina(1); // Reinicia a la primera página al buscar
  };

  const actualizarListaProductos = () => {
    irAPagina(paginaActual); // Recarga la página actual de productos
  };

  const resetSearch = () => {
    setSearchTerm("");
    irAPagina(1);
  };
  return (
    <>
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
        <motion.div
          className="flex flex-col bg-gray-100 dark:bg-black text-gray-800 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >

          {/* Contenido principal */}
          <motion.div
            className="py-12 bg-cover bg-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-black dark:via-black/90 dark:to-black"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          >
            <motion.h2
              className="text-4xl font-titulo font-bold text-center text-black dark:text-white mb-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              Gestiona tus productos
            </motion.h2>

            {/* Buscador */}
            <motion.div
              className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <BuscarProducto handleSearch={handleSearch} />
              <button
                onClick={resetSearch}
                className="py-3 px-12 text-white font-semibold rounded-md bg-red-500 hover:bg-gray-800 transition duration-300 shadow-lg"
              >
                Restablecer
              </button>
              <AgregarProducto updateMessage={updateMessage} />
              {Object.keys(messages).map((productId) => (
                <motion.p
                  key={productId}
                  className="text-center text-green-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {messages[productId]}
                </motion.p>
              ))}
            </motion.div>

            {loading && <p className="text-center">Cargando productos...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}

            {/* Lista de productos */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {productos.length > 0 ? (
                productos.map((product, index) => (
                  <motion.div
                    key={product.id_producto}
                    className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: index * 0.1, // Animación progresiva
                    }}
                  >
                    <div className="relative">
                      <img
                        src={product.imagen_url}
                        alt={product.nombre}
                        className="w-full h-48 object-fill bg-gray-200 dark:bg-gray-700"
                      />
                      <div
                        className={`absolute top-2 left-2 text-xs font-bold py-1 px-2 rounded-lg ${product.stock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          }`}
                      >
                        {product.stock > 0 ? "Disponible" : "Agotado"}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-base font-semibold truncate">{product.nombre}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {product.descripcion}
                      </p>
                      <p className="text-sm mt-1">
                        Marca: <span className="font-semibold">{product.marca}</span>
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold mt-3">
                          ${Math.floor(product.precio / 1).toLocaleString("es-CO")}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <BotonEliminarProducto
                          id={product.id_producto}
                          onProductoEliminado={() => irAPagina(paginaActual)}
                        />
                        <BotonEditarProducto
                          id={product.id_producto}
                          onProductoEditado={actualizarListaProductos}
                        />
                      </div>
                    </div>
                    

                  </motion.div>
                  
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No hay productos disponibles.
                </p>
              )}
            </motion.div>
            
            {/* Paginación */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => irAPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
              >
                Anterior
              </button>
              <span className="text-lg font-semibold text-gray-700 dark:text-white">
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                onClick={() => irAPagina(paginaActual + 1)}
                disabled={paginaActual >= totalPaginas}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
              >
                Siguiente
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex-grow dark:bg-black bg-white container mx-auto p-4 md:p-8 ">
          <img src={noPermiso} alt="No tienes permisos" className="mx-auto size-96 mb-10 " />
          <h1 className="text-3xl dark:text-white text-black font-bold mb-6 text-center">¡Ups! No tienes permisos para acceder a esta página</h1>
        </div>
      )}
      {/* Footer */}
      <Footer />

    </>

  )
}