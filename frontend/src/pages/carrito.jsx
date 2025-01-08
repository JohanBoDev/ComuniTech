import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import RedirectToStripe from "../components/botonRedireccionarAlPago";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);


  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://comunitech.onrender.com/api/carrito/obtenerCarrito/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Manejar el caso de respuesta vacía o no esperada
      if (Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        setCartItems([]); // Si no es un array, asegúrate de inicializarlo como vacío
      }
    } catch (err) {
      setError("No se pudo cargar el carrito. Inténtalo más tarde.");
      setCartItems([]); // En caso de error, el carrito debe ser un array vacío
    } finally {
      setLoading(false);
    }
  };

const updateQuantity = async (carrito_id, quantity) => {
  try {
    // Encuentra el producto en el carrito para verificar el stock
    const item = cartItems.find((item) => item.carrito_id === carrito_id);

    if (!item) {
      console.error("Producto no encontrado en el carrito.");
      return;
    }

    // Verifica que la cantidad no exceda el stock
    if (quantity > item.stock) {
      alert(`Solo tenemos ${item.stock} unidades en stock.`);
      return; // Salir de la función si la cantidad supera el stock
    }

    const token = localStorage.getItem("token");

    // Actualiza la cantidad en el carrito
    await axios.put(
      `https://comunitech.onrender.com/api/carrito/${carrito_id}`,
      {
        cantidad: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Refresca el carrito después de la actualización
    fetchCart();
  } catch (err) {
    console.error("Error al actualizar la cantidad:", err);
  }
};


  const removeItem = async (carrito_id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://comunitech.onrender.com/api/carrito/${carrito_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
    }
  };
  const vaciarCarrito = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://comunitech.onrender.com/api/carrito/vaciarCarrito/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart(); // Refresca el carrito después de vaciarlo
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
      setError("No se pudo vaciar el carrito. Inténtalo más tarde.");
    }
  };

  const fetchSelectedAddress = async () => {
    const idDireccion = localStorage.getItem("selectedAddress");
    if (!idDireccion) return;

    try {
      const response = await axios.get(
        `https://comunitech.onrender.com/api/direcciones/obtenerDireccion/${idDireccion}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );

      if (response.status === 200) {
        setSelectedAddress(response.data);
      }
    } catch (error) {
      console.error("Error al obtener la dirección seleccionada:", error);
    }
  };


  useEffect(() => {
    fetchCart();
    fetchSelectedAddress();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.subtotal), 0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-all">
      {/* Header */}
      <div className="hidden xl:block">
        <Header />
      </div>
      <div className="xl:hidden">
        <MobileHeader />
      </div>

      <div className="p-4 sm:p-6 mt-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          🛒 Carrito de Compras
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-300 dark:border-gray-800 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center flex flex-col items-center text-gray-600 dark:text-gray-400 mt-10 sm:mt-20">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-5xl sm:text-6xl text-gray-400 dark:text-gray-600 mb-4 animate-pulse"
            />
            <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Tu carrito está vacío.
            </span>
            <span className="text-sm sm:text-base">
              ¡Explora nuestros productos y encuentra lo que necesitas!
            </span>
          </p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
            {/* Lista de productos */}
            <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6">
              {cartItems.map((item) => (
                <div
                  key={item.id_producto}
                  className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6"
                >
                  {/* Imagen */}
                  <div className="w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0">
                    <img
                      src={item.imagen_url || "https://via.placeholder.com/150"}
                      alt={item.nombre}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-300 dark:border-gray-700"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 px-8 space-y-2  text-center md:text-left">
                    <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white break-words">
                      {item.nombre}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-normal break-words">
                      {item.descripcion}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold">Cantidad:</span> {item.cantidad}
                    </p>
                  </div>

                  {/* Controles de cantidad y precio */}
                  <div className="flex justify-between w-full md:w-auto items-center gap-2 mt-3">
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.carrito_id, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                        className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.carrito_id, item.cantidad + 1)}
                        className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        +
                      </button>
                    </div>

                    {/* Precio */}
                    <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                      ${parseFloat(item.subtotal).toLocaleString("es-CO")}
                    </p>

                    {/* Botón de eliminar */}
                    <button
                      onClick={() => removeItem(item.carrito_id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 text-sm sm:text-base"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white text-center">
                Resumen del Pedido
              </h3>
              <div className="space-y-2 sm:space-y-3 text-gray-900 dark:text-white text-center">
                <p className="text-base sm:text-lg">Subtotal:</p>
                <p className="font-bold text-xl sm:text-2xl">
                  ${calculateTotal().toLocaleString("es-CO")}
                </p>
              </div>
              {selectedAddress && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <h4 className="font-bold dark:text-white text-black mb-2">Dirección Seleccionada:</h4>
                  <p className="dark:text-white text-black">{selectedAddress.direccion}</p>
                  <p className="dark:text-white text-black">
                    {selectedAddress.ciudad}, {selectedAddress.estado}, {selectedAddress.pais}
                  </p>
                  <p className="dark:text-white text-black">Código Postal: {selectedAddress.codigo_postal}</p>
                  <p className="dark:text-white text-black">Teléfono: {selectedAddress.telefono}</p>
                  <Link to="/seleccionar-direccion">
                  <button className="w-full mt-5 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md">
                    Cambiar dirección
                  </button>
                  </Link>
                </div>
              )}
<div className="flex flex-col space-y-3 sm:space-y-4 mt-4 sm:mt-6">
  {!localStorage.getItem("selectedAddress") ? (
    // Si no existe una dirección en el localStorage, muestra el botón para seleccionar dirección
    <Link to="/seleccionar-direccion">
      <button className="w-full py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md">
        Seleccionar dirección
      </button>
    </Link>
  ) : (
    // Si ya existe una dirección en el localStorage, muestra el botón para generar URL de pago
    <RedirectToStripe />
  )}

  <button
    className="w-full py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md shadow-md transition-all dark:bg-red-600 dark:hover:bg-red-700 text-sm sm:text-base"
    onClick={() => vaciarCarrito()}
  >
    Vaciar Carrito
  </button>
</div>

            </div>

          </div>
        )}
      </div>
    </main>

  );
};

export default Cart;
