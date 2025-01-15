import React, { useState } from "react";
import axios from "axios";

const RedirectToStripe = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleRedirect = async () => {
    setIsLoading(true); // Inicia la carga
    try {
      const token = localStorage.getItem("token");
      const usuario = JSON.parse(localStorage.getItem("usuario")); // Obtener usuario del localStorage
      const selectedAddress = localStorage.getItem("selectedAddress"); // Obtener dirección seleccionada

      const idUsuario = usuario?.id_usuario;

      if (!idUsuario || !selectedAddress) {
        alert(
          "Por favor, selecciona una dirección válida antes de proceder al pago."
        );
        setIsLoading(false);
        return;
      }

      // Solicitar la URL de pago
      const response = await axios.post(
        "https://comunitech.onrender.com/api/pagos/pagar",
        {
          usuario_id: idUsuario,
          direccion_id: selectedAddress, // Enviar la dirección seleccionada
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.url) {
        // Redirigir a la URL recibida
        window.location.href = response.data.url;
      } else {
        console.error("No se pudo obtener la URL de pago:", response.data);
        alert("Hubo un problema al generar la URL de pago.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else {
        console.error("Error al obtener la URL de pago:", error);
        alert("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleRedirect}
        disabled={isLoading} // Deshabilitar mientras está cargando
        className={`w-full ${
          isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        } text-white font-bold py-2 px-4 rounded shadow-md`}
      >
        {isLoading ? "Procesando..." : "Pagar ahora"}
      </button>
    </div>
  );
};

export default RedirectToStripe;
