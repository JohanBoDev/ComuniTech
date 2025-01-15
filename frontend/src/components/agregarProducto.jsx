import React, { useState, useEffect } from "react";

const AgregarProducto = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    id_categoria: "",
    nombre: "",
    descripcion: "",
    marca: "",
    precio: "",
    stock: "",
    imagen_url: "",
  });

  const token = localStorage.getItem("token"); // Obtener el token desde localStorage


  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("https://comunitech.onrender.com/api/productos/obtenerCategorias");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "id_categoria" ? Number(value) : value, // Convierte a número si es id_categoria
    });
  };
  

  const handleAgregarProducto = async (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", formData); // Verifica aquí
  
    try {
      const response = await fetch("https://comunitech.onrender.com/api/productos/crearProducto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Enviar token en la cabecera
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Producto agregado exitosamente: " + data.mensaje);
        setIsModalOpen(false); // Cierra el modal después de agregar el producto exitosamente
    
        // Opcional: Limpia el formulario después de cerrar el modal
        setFormData({
          id_categoria: "",
          nombre: "",
          descripcion: "",
          marca: "",
          precio: "",
          stock: "",
          imagen_url: "",
        });
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.mensaje);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="py-3 px-6 text-white font-semibold rounded-md bg-green-500 hover:bg-gray-800 transition duration-300 shadow-lg"
      >
        Agregar Producto
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Agregar Producto</h2>
            <form onSubmit={handleAgregarProducto}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Categoría</label>
                <select
                  name="id_categoria"
                  value={formData.id_categoria}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-black"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
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
                  min={1}
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
                  min={1}
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
                  className="py-2 px-4 bg-[#1a1a1a] text-white rounded-md hover:bg-gray-800"
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

export default AgregarProducto;
