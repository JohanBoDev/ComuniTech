import React, { useState } from "react";
import axios from "axios";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import recoveryVideo from "../assets/backgrounds/fondo-componentes.mp4"; // Cambia la ruta según la ubicación de tu video

const EnviarRecuperacion = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Enviar el correo al backend
      const response = await axios.post(
        "https://comunitech.onrender.com/api/usuarios/correo-recuperar",
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Hubo un error al enviar el correo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hidden xl:block">
        <Header />
      </div>
      <div className="xl:hidden">
        <MobileHeader />
      </div>

      <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
        {/* Fondo de video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={recoveryVideo}
          autoPlay
          loop
          muted
          playsInline
        ></video>


        {/* Contenido principal */}
        <div className="relative z-20 mx-10 md:mx-5 lg:mx-0 bg-white/70 dark:bg-black/70 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-gray-200 text-black">
            Recuperar Contraseña
          </h2>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            Ingresa tu correo electrónico y te enviaremos un enlace para
            restablecer tu contraseña.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input de correo */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                required
                className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Botón de enviar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 disabled:bg-gray-400"
            >
              {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
            </button>
          </form>

          {/* Mensaje de éxito o error */}
          {message && (
            <p className="mt-4 text-center text-green-500">{message}</p>
          )}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}

          {/* Vuelve a Iniciar Sesión */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿Recordaste tu contraseña?{" "}
            <a
              href="/iniciar-sesion"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Iniciar Sesión
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default EnviarRecuperacion;
