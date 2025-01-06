import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProductsByCategory = (category) => {
  const [products, setProducts] = useState([]); // Estado inicial vacío
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return; // Verifica que se pase una categoría
      setLoading(true);
      try {
        const response = await axios.get(
          `https://comunitech.onrender.com/api/productos/categoria/${encodeURIComponent(category)}`
        );
        console.log("API Response:", response.data); // Debug: Verifica la respuesta
        setProducts(Array.isArray(response.data) ? response.data : []); // Asegura que sea un arreglo
        setError(null);
      } catch (err) {
        console.error("API Error:", err); // Debug: Imprime el error
        setError(err.message || "Error al obtener productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Ejecuta cuando cambia la categoría

  return { products, loading, error };
};

export default useFetchProductsByCategory;
