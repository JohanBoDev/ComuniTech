import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import AddToCartButton from "../components/botonAgregarCarrito";
import Navbar from "../layouts/subNav";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import Footer from "../layouts/footer";


const Resultados = () => {
  const location = useLocation();

  // Extrae el término de búsqueda de la URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [productos, setProductos] = React.useState([]);
  const [messages, setMessages] = React.useState({});

  React.useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          `https://comunitech.onrender.com/api/productos/nombre/${encodeURIComponent(query)}`
        );
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error("Error al obtener los productos");
        }
      } catch (error) {
        console.error("Error en la llamada a la API:", error);
      }
    };

    if (query) {
      fetchProductos();
    }
  }, [query]);

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

  return (
    <main className='bg-white dark:bg-black h-screen'>
    <div className="hidden xl:block">
        <Header />
    </div>

    <div className="xl:hidden">
        <MobileHeader />
    </div>

    <Navbar />
    <div className="p-4 bg-white dark:bg-black">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white mt-10">
        Resultados de búsqueda para: <span className="text-gray-300 font-bold font-titulo">{query}</span>
      </h2>

      {/* Tarjetas de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {productos.length > 0 ? (
          productos.map((product) => (
            <div
              key={product.id_producto}
              className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Imagen del producto */}
              <div className="relative">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="w-full h-48 object-cover bg-gray-200 dark:bg-gray-700"
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

              {/* Detalles del producto */}
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
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>  <Footer />
    </main>
  
  );
};

export default Resultados;
