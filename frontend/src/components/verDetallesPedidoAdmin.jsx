import React, { useState, useEffect } from "react";
import axios from "axios";

const VerDetallesPedidoAdmin = ({ pedidoId }) => {
  const [pedido, setPedido] = useState(null); // Detalles del pedido
  const [detalles, setDetalles] = useState([]); // Detalles de productos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const token = localStorage.getItem("token");

  // Fetch order details from API
  useEffect(() => {
    if (isModalOpen) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(
            `https://comunitech.onrender.com/api/pedidos/detallesAdmin/${pedidoId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPedido(response.data.pedido);
          setDetalles(response.data.detalles);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError("Error al cargar los detalles del pedido.");
          setLoading(false);
        }
      };

      fetchOrder();
    }
  }, [isModalOpen, pedidoId, token]);

  const handleOpenModal = () => {
    setLoading(true);
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow-md w-full my-2"
      >
        Ver Detalles
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
              Detalles del Pedido
            </h2>

            {loading ? (
              <p className="text-center">Cargando...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
<div className="space-y-4">
  <div>
    <p>
      <strong>Cliente:</strong> {pedido.usuario_nombre}
    </p>
    <p>
      <strong>Estado:</strong> {pedido.estado}
    </p>
    <p>
      <strong>Fecha del Pedido:</strong>{" "}
      {new Date(pedido.fecha_pedido).toLocaleDateString()}
    </p>
    <p>
      <strong>Total:</strong> ${parseFloat(pedido.total).toLocaleString("es-CO")}
    </p>
    <p>
      <strong>Dirección:</strong>{" "}
      {pedido.direccion
        ? `${pedido.direccion}, ${pedido.ciudad}, ${pedido.estado_direccion}, ${pedido.pais} (${pedido.codigo_postal})`
        : "No especificada"}
    </p>
    <p>
      <strong>Teléfono:</strong> {pedido.telefono || "No especificado"}
    </p>
  </div>

  <div>
    <h3 className="text-lg font-bold">Productos:</h3>
    <ul className="space-y-3">
      {detalles.map((producto) => (
        <li
          key={producto.producto_id}
          className="flex items-center bg-gray-100 dark:bg-[#2A2A2A] p-3 rounded-lg shadow-md"
        >
          {/* Imagen a la izquierda */}
          <img
            src={producto.imagen_url || "https://via.placeholder.com/150"}
            alt={producto.producto_nombre}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />

          {/* Información del producto */}
          <div>
            <p className="font-semibold">{producto.producto_nombre}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <p>
              Precio Unitario: $
              ${Math.floor(producto.precio_unitario / 1).toLocaleString("es-CO")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerDetallesPedidoAdmin;
