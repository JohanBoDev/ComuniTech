import React, { useState, useEffect } from "react";
import PedidoDetallesModal from "../components/PedidoDetallesModal";
import DeleteButton from "../components/botonEliminarPedido";


const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const fetchPedidos = async (page = 1, limit = 5) => {
    try {
      const response = await fetch(
        `https://comunitech.onrender.com/api/pedidos/obtenerPedidos?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setPedidos(data.pedidos);
        setPaginaActual(data.paginaActual);
        setTotalPaginas(data.totalPaginas);
      } else {
        console.error("Error al obtener los pedidos:", data.mensaje);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual((prevPage) => prevPage - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual((prevPage) => Math.min(prevPage + 1, totalPaginas));
    }
  };

  const handleShowDetails = (pedidoId) => {
    setSelectedPedido(pedidoId);
    setIsModalOpen(true);
  };

  const handleDeletePedido = async (pedidoId) => {
    if (!pedidoId) {
      console.error("No se proporcionó un ID de pedido.");
      return;
    }
  
    try {
      await fetchPedidos(paginaActual); // Refrescar después de eliminar
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
    }
  };

  useEffect(() => {
    fetchPedidos(paginaActual, 5);
  }, [paginaActual]);

  return (
    <div className="bg-gray-100 dark:bg-[#232323] dark:text-white p-6 ">
      <h1 className="text-2xl font-semibold mb-6 text-center">Mis Pedidos</h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-md">
        {pedidos.length > 0 ? (

          <ul className="space-y-4">
            {pedidos.map((pedido) => (
              <li
                key={pedido.pedido_id}
                className="flex flex-col lg:flex-row justify-between items-center bg-gray-200 dark:bg-[#2A2A2A] p-4 rounded-lg shadow-md space-y-4 lg:space-y-0"
              >
                <div className="w-full lg:w-auto text-center lg:text-left">
                  <p className="font-semibold">ID Pedido: {pedido.pedido_id}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fecha: {new Date(pedido.fecha_pedido).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estado: {pedido.estado}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total: ${Math.floor(pedido.total / 1).toLocaleString("es-CO")}
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row w-full lg:w-auto items-center space-y-2 lg:space-y-0 lg:space-x-2">
                  <button
                    onClick={() => handleShowDetails(pedido.pedido_id)}
                    className="w-full lg:w-auto bg-[#343B44] hover:bg-[#404852] text-white px-4 py-2 rounded text-sm lg:text-base"
                  >
                    Mostrar Detalles
                  </button>
                  <DeleteButton
                    pedidoId={pedido.pedido_id}
                    onDelete={handleDeletePedido}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No tienes pedidos registrados.
          </p>
        )}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePaginaAnterior}
          disabled={paginaActual === 1}
          className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2 mx-2 text-black dark:text-white">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={handlePaginaSiguiente}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {isModalOpen && (
        <PedidoDetallesModal
          pedidoId={selectedPedido}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PedidosList;
