import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddToCartButton = ({ productId, updateMessage, stock }) => {
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (cantidad > stock) {
      updateMessage({
        type: "error",
        text: `No puedes agregar más productos de los disponibles (${stock} unidades).`,
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        updateMessage({
          type: "error",
          text: "Debe iniciar sesión para agregar productos al carrito.",
        });
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://comunitech.onrender.com/api/carrito/agregarProducto/",
        {
          producto_id: productId,
          cantidad: cantidad,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateMessage({ type: "success", text: "¡Producto agregado al carrito!" });
    } catch (err) {
      updateMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Hubo un error al agregar el producto al carrito.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = () => {
    // Validar cantidad solo cuando se pierde el foco
    if (cantidad < 1) setCantidad(1);
    if (cantidad > stock) setCantidad(stock);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={cantidad}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setCantidad(value === "" ? "" : parseInt(value)); // Permite vacío temporalmente
          }}
          onBlur={handleBlur}
          className="w-16 p-1 text-center border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          min={0}
          max={stock}
          disabled={stock === 0} // Deshabilitar input si no hay stock
        />
        <button
          onClick={handleAddToCart}
          disabled={loading || stock === 0} // Deshabilitar botón si no hay stock
          className={`p-2 rounded-full transition ${
            stock === 0
              ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
              : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
          }`}
          title={stock === 0 ? "Producto agotado" : "Agregar al carrito"}
        >
          {loading ? (
            <span className="loader w-4 h-4 border-2 border-t-transparent border-gray-800 rounded-full animate-spin"></span>
          ) : (
            <FontAwesomeIcon icon={faShoppingCart} />
          )}
        </button>
      </div>
    </div>
  );
};

export default AddToCartButton;
