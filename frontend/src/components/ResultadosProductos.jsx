import React, { useState } from "react";
import BuscarProducto from "./buscarProducto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import AddToCartButton from "./botonAgregarCarrito";
import useProductosPaginados from "../hooks/useProductosPaginados";

export default function Resultados() {
  const [searchTerm, setSearchTerm] = useState("");
  const { productos, paginaActual, totalPaginas, loading, error, irAPagina } =
    useProductosPaginados(1, searchTerm);

  const [messages, setMessages] = useState({});

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

  const resetSearch = () => {
    setSearchTerm("");
    irAPagina(1);
  };

  return (
    <div className="py-12 bg-cover bg-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-black dark:via-black/90 dark:to-black">
      <h2 className="text-4xl font-titulo font-bold text-center text-black dark:text-white mb-8">
        Explora nuestros productos
      </h2>

      {/* Buscador */}
      <div className="flex justify-center gap-4 mb-6">
        <BuscarProducto handleSearch={handleSearch} />
        <button
          onClick={resetSearch}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Restablecer
        </button>
      </div>

      {loading && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 p-10">
        {productos.length > 0 ? (
          productos.map((product) => (
            <div
              key={product.id_producto}
              className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="w-full h-48 object-fill bg-gray-200 dark:bg-gray-700"
                />
                <div
                  className={`absolute top-2 left-2 text-xs font-bold py-1 px-2 rounded-lg ${
                    product.stock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {product.stock > 0 ? "Disponible" : "Agotado"}
                </div>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold truncate">
                  {product.nombre}
                </h3>
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
                  <AddToCartButton
                    productId={product.id_producto}
                    stock={product.stock}
                    updateMessage={(message) =>
                      updateMessage(product.id_producto, message)
                    }
                  />
                </div>
                {messages[product.id_producto] && (
                  <p
                    className={`mt-2 text-sm ${
                      messages[product.id_producto].type === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {messages[product.id_producto].text}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hay productos disponibles.
          </p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => irAPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2 mx-2 text-black dark:text-white">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => irAPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
