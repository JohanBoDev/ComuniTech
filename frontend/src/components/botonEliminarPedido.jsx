import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
    </button>
  );
};

export default DeleteButton;
