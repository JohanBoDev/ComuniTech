import React, { useState } from "react";
import axios from "axios";

const EditarUsuario = ({ usuario, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: usuario.nombre,
    email: usuario.email,
    contraseña: "",
    es_admin: usuario.es_admin,
  });
  
  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData };
      
      // Si la contraseña está vacía, elimina ese campo del objeto
      if (!dataToSend.contraseña) {
        delete dataToSend.contraseña;
      }
  
      const response = await axios.put(
        `https://comunitech.onrender.com/api/usuarios/editar/${usuario.id_usuario}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuario actualizado:", response.data);
      setIsModalOpen(false);
      onUpdate(); // Llama una función para actualizar la lista de usuarios
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };
  

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-3 py-2 text-sm font-medium bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none"
      >
        <i className="fas fa-edit mr-2"></i> Editar
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">
              Editar Usuario
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-[#1E1E1E] border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-[#1E1E1E] border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Contraseña */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="contraseña"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contraseña"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-[#1E1E1E] border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Rol */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="es_admin"
                >
                  Rol
                </label>
                <select
                  id="es_admin"
                  name="es_admin"
                  value={formData.es_admin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-[#1E1E1E] border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>Admin</option>
                  <option value={0}>Usuario</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarUsuario;
