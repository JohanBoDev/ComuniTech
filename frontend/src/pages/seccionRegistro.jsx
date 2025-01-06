import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Para manejar el contexto de autenticación
import registerVideo from "../assets/backgrounds/login-comuni.mp4";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Contexto de autenticación
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Realizar el registro
      const response = await axios.post(
        "https://comunitech.onrender.com/api/usuarios/registro",
        {
          nombre,
          email,
          password,
        }
      );

      console.log("Registro exitoso:", response.data);

      // Realizar inicio de sesión automático después del registro
      const loginResponse = await axios.post(
        "https://comunitech.onrender.com/api/usuarios/login",
        {
          email,
          password,
        }
      );

      const { token, usuario } = loginResponse.data;
      console.log("Inicio de sesión exitoso tras registro:", loginResponse.data);

      // Autenticar al usuario en el contexto
      login(token, usuario);

      // Redirigir al home después del inicio de sesión
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error durante el registro o inicio de sesión. Inténtalo de nuevo."
      );
      console.error("Error en el registro o inicio de sesión:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Headers para diferentes tamaños */}
      <div className="hidden xl:block">
        <Header />
      </div>
      <div className="xl:hidden">
        <MobileHeader />
      </div>
      <section className="flex flex-col  mt-20 lg:mt-0  lg:flex-row md:min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-white">
        {/* Video de fondo en dispositivos pequeños */}
        <div className="absolute inset-0 lg:relative lg:w-1/2">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={registerVideo}
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-gray-100/50 to-gray-50/50 dark:from-black dark:via-transparent dark:to-black lg:bg-gradient-to-r lg:from-black lg:via-transparent lg:to-black/80"></div>
        </div>

        {/* Formulario de registro */}
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center p-6">
          <div className="bg-white dark:bg-black/80 border border-gray-300 dark:border-gray-700 rounded-lg p-8 w-full max-w-md shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-6">Crear Cuenta</h2>
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Campo de nombre */}
              <div className="relative">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Nombre
                </label>
                <div className="flex items-center mt-2">
                  <span className="absolute ml-2 text-gray-400 dark:text-gray-500">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full pl-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Campo de correo */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Correo Electrónico
                </label>
                <div className="flex items-center mt-2">
                  <span className="absolute ml-2 text-gray-400 dark:text-gray-500">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo"
                    className="w-full pl-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Campo de contraseña */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Contraseña
                </label>
                <div className="flex items-center mt-2">
                  <span className="absolute ml-2 text-gray-400 dark:text-gray-500">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                    className="w-full pl-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Botón de registro */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {loading ? "Cargando..." : "Registrarse"}
              </button>
            </form>

            {/* Mensajes de error */}
            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
