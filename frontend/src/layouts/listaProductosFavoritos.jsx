import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FavoritosList = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoritos = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const token = localStorage.getItem("token");

      if (!usuario || !usuario.id_usuario || !token) {
        console.error("No se encontró información del usuario o token.");
        setFavoritos([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://comunitech.onrender.com/api/productos/favoritos/${usuario.id_usuario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setFavoritos(data || []);
      } else {
        console.error("Error al obtener los productos favoritos:", data.mensaje);
        setFavoritos([]);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setFavoritos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFavorito = async (id_producto) => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const token = localStorage.getItem("token");

      if (!usuario || !usuario.id_usuario || !token) {
        console.error("No se encontró información del usuario o token.");
        return;
      }

      const response = await fetch(
        `https://comunitech.onrender.com/api/productos/eliminarFavorito/${id_producto}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id_usuario: usuario.id_usuario }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFavoritos((prevFavoritos) =>
          prevFavoritos.filter((producto) => producto.id_producto !== id_producto)
        );
      } else {
        console.error("Error al eliminar el producto de favoritos:", data.mensaje);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-600 dark:text-gray-300">Cargando favoritos...</p>
      </div>
    );
  }

  return (
<div className="bg-gray-100 dark:bg-[#232323] dark:text-white p-6">
  <h1 className="text-3xl font-bold mb-8 text-center">Mis Productos Favoritos</h1>
  <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-lg">
    {favoritos.length > 0 ? (
      <ul className="space-y-6">
        {favoritos.map((producto) => (
          <li
            key={producto.id_producto}
            className="flex flex-col md:flex-row items-center md:items-start bg-gray-200 dark:bg-[#2A2A2A] p-4 rounded-lg shadow-md gap-4"
          >
            {/* Imagen del Producto */}
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="w-full max-w-[120px] md:max-w-[150px] md:w-36 md:h-36 object-cover rounded-lg"
            />

            {/* Información del Producto */}
            <div className="flex-grow text-center md:text-left w-full">
              <h3 className="text-lg font-semibold truncate max-w-full mb-1">
                {producto.nombre}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 break-words mb-2">
                {producto.descripcion}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <b>Marca:</b> <span className="font-semibold">{producto.marca}</span>
              </p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
                ${Math.floor(producto.precio / 1).toLocaleString("es-CO")}
              </p>
              <p>
                <b>Stock disponible:</b> {producto.stock} unidades
              </p>
            </div>

            {/* Botón Eliminar */}
            <button
              onClick={() => handleDeleteFavorito(producto.id_producto)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center w-full md:w-auto"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No tienes productos favoritos registrados.
      </p>
    )}
  </div>
</div>



  );
};

export default FavoritosList;
