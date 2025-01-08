import React, { useState } from "react";
import useFetchProductsByCategory from "../hooks/useFetchProductsByCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearchMinus } from "@fortawesome/free-solid-svg-icons";
import AddToCartButton from "../components/botonAgregarCarrito";

const CategoriaFuentesPoder = () => {
  const { products: fuentesPoder, loading, error } = useFetchProductsByCategory("fuente");
  const [messages, setMessages] = useState({});
  const [marcaFilter, setMarcaFilter] = useState("");
  const [priceRange, setPriceRange] = useState([100000, 1000000]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFuentesPoder = fuentesPoder.filter((product) => {
    const matchesMarca = marcaFilter ? product.marca === marcaFilter : true;
    const matchesPrice = product.precio >= priceRange[0] && product.precio <= priceRange[1];
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMarca && matchesPrice && matchesSearch;
  });

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

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-black">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-center text-black dark:text-white mb-8">
        Fuentes de Poder
      </h2>

      {/* Filtros */}
      <div className="mb-6 px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <select
          value={marcaFilter}
          onChange={(e) => setMarcaFilter(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#1a1a1aaf] text-gray-700 dark:text-gray-200"
        >
          <option value="">Todas las marcas</option>
          <option value="Corsair">Corsair</option>
          <option value="EVGA">EVGA</option>
          <option value="Cooler Master">Cooler Master</option>
          <option value="Thermaltake">Thermaltake</option>
        </select>

        <div className="flex flex-col items-center gap-10 w-full md:w-auto">
          <div className="flex space-x-5 justify-between w-full">
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Mínimo: ${priceRange[0].toLocaleString("es-CO")}
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Máximo: ${priceRange[1].toLocaleString("es-CO")}
            </label>
          </div>
          <div className="flex items-center gap-2 w-full">
            <input
              type="range"
              min="100000"
              max="1000000"
              step="10000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Math.min(parseInt(e.target.value), priceRange[1]), priceRange[1]])
              }
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="100000"
              max="1000000"
              step="10000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0])])
              }
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre"
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-300 bg-gray-100 dark:bg-[#1a1a1abb] text-gray-700 dark:text-gray-200 w-full md:w-64"
        />
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 p-10">
        {filteredFuentesPoder.length > 0 ? (
          filteredFuentesPoder.map((product) => (
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
                {product.isNew ? (
                  <div className="absolute top-2 left-2 bg-blue-500 text-xs font-bold py-1 px-2 rounded-lg">
                    Nuevo
                  </div>
                ) : (
                  <div
                    className={`absolute top-2 left-2 text-xs font-bold py-1 px-2 rounded-lg ${product.stock > 0
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                      }`}
                  >
                    {product.stock > 0 ? "Disponible" : "Agotado"}
                  </div>
                )}
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
                <div className="flex justify-between">
                  <p className="text-xl font-bold mt-3">
                    ${Math.floor(product.precio).toLocaleString("es-CO")}
                  </p>
                  <AddToCartButton
                    productId={product.id_producto}
                    updateMessage={(message) =>
                      updateMessage(product.id_producto, message)
                    }
                    stock = {product.stock}
                  />
                </div>
                {messages[product.id_producto] && (
                  <p
                    className={`mt-2 text-sm ${messages[product.id_producto].type === "success"
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
          <div className="col-span-full text-center text-gray-500 flex flex-col items-center gap-4">
            <FontAwesomeIcon icon={faSearchMinus} className="text-6xl text-gray-400" />
            <p className="text-lg">
              Ups... ¡Parece que no encontramos lo que buscabas!
              <br />
              Intenta con otra búsqueda o explora nuestras categorías.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriaFuentesPoder;
