import React from "react";
import axios from "axios";

const DeleteButton = ({ pedidoId, onDelete }) => {
  const handleDelete = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este pedido?"
    );

    if (!confirmacion) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://comunitech.onrender.com/api/pedidos/eliminar/${pedidoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Pedido eliminado correctamente.");
        onDelete(pedidoId); // Llamar a la función para actualizar la lista
      } else {
        console.error("Error al eliminar el pedido:", response.data);
        alert("No se pudo eliminar el pedido.");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("Ocurrió un error al eliminar el pedido.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-1 14H6L5 7m5 0V5a1 1 0 112 0v2m4 0h-6m0 0H6a1 1 0 00-1 1v1m0 0h16v1a1 1 0 01-1 1m-4 0h-6"
        />
      </svg>
    </button>
  );
};

export default DeleteButton;
