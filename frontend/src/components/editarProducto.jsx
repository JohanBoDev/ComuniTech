import React, { useState, useEffect } from "react";

const BotonEditarProducto = ({ id, onProductoEditado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null); // Inicialmente null
  const [loading, setLoading] = useState(false);

  const fetchProducto = async () => {
    try {
      const response = await fetch(`https://comunitech.onrender.com/api/productos/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data); // Carga los datos del producto
        setIsModalOpen(true); // Abre el modal
      } else {
        alert("No se pudo obtener la información del producto.");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      alert("Hubo un problema al conectarse al servidor.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "precio" || name === "stock" ? Number(value) : value, // Convierte valores numéricos
    });
  };

  const handleEditarProducto = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://comunitech.onrender.com/api/productos/actualizarProducto/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agregar token en los headers
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.mensaje);
        setIsModalOpen(false); // Cierra el modal

        if (onProductoEditado) {
            onProductoEditado(); // Llama al callback para actualizar la lista de productos
          }
      } else {
        const errorData = await response.json();
        alert("Error al editar el producto: " + errorData.mensaje);
      }
    } catch (error) {
      console.error("Error al editar el producto:", error);
      alert("Hubo un problema al conectarse al servidor.");
    }
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        onClick={fetchProducto}
        className="py-2 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Editar Producto
      </button>

      {/* Modal */}
      {isModalOpen && formData && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Editar Producto</h2>
            <form onSubmit={handleEditarProducto}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-black"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Imagen URL</label>
                <input
                  type="text"
                  name="imagen_url"
                  value={formData.imagen_url}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-black"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotonEditarProducto;
