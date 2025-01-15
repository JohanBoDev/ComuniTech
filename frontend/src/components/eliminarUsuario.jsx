import React from "react";
import axios from "axios";

const EliminarUsuario = ({ idUsuario, onDelete }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await axios.delete(`https://comunitech.onrender.com/api/usuarios/eliminar/${idUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(); // Llama a la función para actualizar la lista en el componente padre
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <button
      className="flex items-center px-3 py-2 text-sm font-medium bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none"
      onClick={handleDelete}
    >
      <i className="fas fa-trash-alt mr-2"></i> Eliminar
    </button>
  );
};

export default EliminarUsuario;
