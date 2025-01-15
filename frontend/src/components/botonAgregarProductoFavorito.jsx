import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const AddToFavoritesButton = ({ id_producto}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
      const fetchFavorites = async () => {
        try {
          const usuario = JSON.parse(localStorage.getItem("usuario"));
          if (!usuario || !usuario.id_usuario) return;
  
          const token = localStorage.getItem("token");
          if (!token) return;
  
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
            // Verifica si el producto está en la lista de favoritos
            const isFav = data.some((fav) => fav.id_producto === id_producto);
            setIsFavorite(isFav);
          }
        } catch (error) {
          console.error("Error al obtener los productos favoritos:", error);
        }
      };
  
      fetchFavorites();
    }, [id_producto]);
    const toggleFavorite = async () => {
        try {
          const usuario = JSON.parse(localStorage.getItem("usuario"));
          if (!usuario || !usuario.id_usuario) {
            alert("No se encontró información del usuario. Por favor, inicia sesión.");
            return;
          }
    
          const token = localStorage.getItem("token");
          if (!token) {
            alert("Por favor, inicia sesión para gestionar favoritos.");
            return;
          }
    
          if (isFavorite) {
            // Eliminar de favoritos
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
              alert(data.mensaje || "Producto eliminado de favoritos correctamente.");
              setIsFavorite(false);
            } else {
              alert(data.mensaje || "Hubo un error al eliminar el producto de favoritos.");
            }
          } else {
            // Agregar a favoritos
            const response = await fetch(
              `https://comunitech.onrender.com/api/productos/agregarFavorito/${id_producto}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id_usuario: usuario.id_usuario }),
              }
            );
    
            const data = await response.json();
    
            if (response.ok) {
              alert(data.mensaje || "Producto agregado a favoritos correctamente.");
              setIsFavorite(true);
            } else {
              alert(data.mensaje || "Hubo un error al agregar el producto a favoritos.");
            }
          }
        } catch (error) {
          console.error("Error al gestionar favoritos:", error);
          alert("Error al intentar gestionar el producto en favoritos.");
        }
      };
      
      

  return (
    <button
      className={`absolute top-2 right-2 transition ${
        isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
      onClick={toggleFavorite}
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
};

export default AddToFavoritesButton;
