import React from "react";
import axios from "axios";

const RedirectToStripe = () => {
    const handleRedirect = async () => {
        try {
          const token = localStorage.getItem("token");
          
          // Asegúrate de obtener el objeto completo desde el localStorage
          const usuario = JSON.parse(localStorage.getItem("usuario")); 
          const idUsuario = usuario?.id_usuario; // Asegúrate de que existe el campo id_usuario
      
          if (!idUsuario) {
            alert("No se encontró el ID del usuario. Por favor, autentícate.");
            return;
          }
      
          // Solicitar la URL de pago
          const response = await axios.post(
            "https://comunitech.onrender.com/api/pagos/pagar",
            { usuario_id: idUsuario },
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
          console.error("Error al obtener la URL de pago:", error);
          alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
        }
      };
      

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleRedirect}
        className=" w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
      >
        Pagar ahora
      </button>
    </div>
  );
};

export default RedirectToStripe;
