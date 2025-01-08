import React, { useState } from "react";
import ProceedToPayment from "./components/botonRedireccionarAlPago";

const CartPage = () => {
  const [stripeUrl, setStripeUrl] = useState("");

  const initiatePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://comunitech.onrender.com/api/pagos/pagar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setStripeUrl(data.url); // Guarda la URL de Stripe en el estado
      } else {
        console.error("Error al iniciar el pago:", data.mensaje);
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error);
    }
  };

  return (
    <div>
      <button
        onClick={initiatePayment}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        Generar URL de Pago
      </button>

      {stripeUrl && <ProceedToPayment stripeUrl={stripeUrl} />}
    </div>
  );
};

export default CartPage;
