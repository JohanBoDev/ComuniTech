import { useState, useEffect } from "react";

export default function useProductosPaginados(paginaInicial = 1, searchTerm = "") {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(paginaInicial);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          searchTerm
            ? `https://comunitech.onrender.com/api/productos/nombre/${encodeURIComponent(searchTerm)}`
            : `https://comunitech.onrender.com/api/productos/paginados/?pagina=${paginaActual}`
        );
        if (response.ok) {
          const data = await response.json();
          setProductos(data.productos || data); // Usa la estructura correcta de datos
          setTotalPaginas(data.totalPaginas || 1); // Asegúrate de manejar las páginas
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [paginaActual, searchTerm]);

  const irAPagina = (pagina) => {
    if (pagina > 0 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  return { productos, paginaActual, totalPaginas, loading, error, irAPagina };
}
