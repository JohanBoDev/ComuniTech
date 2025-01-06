import React, { useState, useEffect } from "react";

const PedidoDetallesModal = ({ pedidoId, onClose }) => {
  const [detalles, setDetalles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const response = await fetch(
          `https://comunitech.onrender.com/api/pedidos/obtenerDetallesPedido/${pedidoId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setDetalles(data);
        } else {
          console.error("Error al obtener detalles del pedido:", data.message);
        }
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetalles();
  }, [pedidoId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded shadow-md">
          <p className="text-center">Cargando detalles del pedido...</p>
        </div>
      </div>
    );
  }

  if (!detalles) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Detalles del Pedido
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-lg font-medium">
              <span className="font-semibold">ID Pedido:</span> {detalles.pedido.id}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">
              <span className="font-semibold">Fecha:</span>{" "}
              {new Date(detalles.pedido.fecha_pedido).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">
              <span className="font-semibold">Estado:</span> {detalles.pedido.estado}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium">
              <span className="font-semibold">Total:</span> ${Math.floor(detalles.pedido.total / 1).toLocaleString("es-CO")}
            </p>
          </div>
          <div>
  <h3 className="text-lg font-bold mb-2">Productos:</h3>
  <ul className="space-y-2">
    {detalles.detalles.map((producto) => (
      <li
        key={producto.producto_id}
        className="flex items-center space-x-4 bg-gray-100 dark:bg-[#2A2A2A] p-3 rounded-lg shadow-md"
      >
        <img
          src={producto.imagen_url}
          alt={producto.producto_nombre}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <p className="font-semibold">{producto.producto_nombre}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cantidad: {producto.cantidad}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Precio Unitario: ${Math.floor(producto.precio_unitario / 1 ).toLocaleString("es-CO")}
          </p>
        </div>
      </li>
    ))}
  </ul>
</div>

        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidoDetallesModal;
