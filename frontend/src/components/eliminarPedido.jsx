import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EliminarPedido = ({ pedidoId, onPedidoEliminado }) => {
  const handleEliminarPedido = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://comunitech.onrender.com/api/pedidos/eliminarPedidoAdmin/${pedidoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Pedido eliminado con éxito.");
        onPedidoEliminado(pedidoId); // Llamar a la función de actualización
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        alert("Hubo un error al intentar eliminar el pedido.");
      }
    }
  };

  return (
    <div className="flex justify-center p-2 bg-red-500 hover:bg-red-700 rounded-md cursor-pointer">
    <button
      onClick={handleEliminarPedido}
      className="text-white rounded-full "
      title="Eliminar pedido"
    >
      <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
    </button>
    </div>
  );
};

export default EliminarPedido;
