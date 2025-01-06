import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../layouts/desktopHeader";
import recoveryVideo from "../assets/backgrounds/fondo-componentes.mp4"; // Cambia la ruta según la ubicación de tu video

const RestablecerPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Captura el token de la URL

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    try {
      const response = await axios.post(
        "https://comunitech.onrender.com/api/usuarios/recuperar-password",
        { token, newPassword }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError("Error al restablecer la contraseña.");
    }
  };

  return (
    <>
      <Header />
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
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200 text-black">
            Restablecer Contraseña
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nueva contraseña */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                required
                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 focus:outline-none"
            >
              Actualizar Contraseña
            </button>
          </form>

          {/* Mensaje de éxito o error */}
          {message && (
            <p className="mt-4 text-green-500 text-center">{message}</p>
          )}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default RestablecerPassword;
