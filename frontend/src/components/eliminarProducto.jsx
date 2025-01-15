import React from "react";

const BotonEliminarProducto = ({ id, onProductoEliminado }) => {
  const eliminarProducto = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener el token del localStorage

      const response = await fetch(`https://comunitech.onrender.com/api/productos/eliminarProducto/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // Pasar el token en el encabezado
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert("Producto eliminado correctamente: " + data.mensaje);
        
        // Callback para informar al componente padre que el producto fue eliminado
        if (onProductoEliminado) {
          onProductoEliminado(id);
        }
      } else {
        const errorData = await response.json();
        alert("Error al eliminar el producto: " + errorData.mensaje);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un problema al conectarse al servidor.");
    }
  };

  return (
    <button
      onClick={eliminarProducto}
      className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
    >
      Eliminar Producto
    </button>
  );
};

export default BotonEliminarProducto;
