import React, { useState } from "react";
import axios from "axios";

const EditarEstadoPedido = ({ orderId, currentStatus, onStatusUpdate }) => {
  const [newStatus, setNewStatus] = useState(currentStatus); // Estado nuevo
  const estadosValidos = ["Pendiente", "Enviado", "Entregado", "Cancelado"]; // Estados válidos

  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");



      if (!orderId) {
        alert("No se encontró un ID válido para el pedido.");
        return;
      }

      const response = await axios.put(
        "https://comunitech.onrender.com/api/pedidos/actualizarEstadoPedido",
        {
          id_pedido: orderId,
          nuevo_estado: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Estado actualizado correctamente.");

      // Llamamos a la función de actualización del estado
      onStatusUpdate(orderId, newStatus);
    } catch (err) {
      if (err.response) {
        console.error("Error del servidor:", err.response.data);
        alert(`Error: ${err.response.data.mensaje || "No se pudo actualizar el estado"}`);
      } else {
        console.error("Error de conexión:", err);
        alert("Error al conectar con el servidor.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="px-4 py-2 border rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-[#1E1E1E] border-gray-300 dark:border-gray-600"
      >
        {estadosValidos.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>
      <button
        onClick={handleStatusChange}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
      >
        Guardar
      </button>
    </div>
  );
};

export default EditarEstadoPedido;
