import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import loginVideo from "../assets/backgrounds/login-comuni.mp4";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Estado para "Recordarme"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar el correo si está guardado en localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://comunitech.onrender.com/api/usuarios/login",
        { email, password }
      );
      const { token, usuario } = response.data;

      login(token, usuario); // Actualizar el contexto
      localStorage.setItem("token", token); // Guardar token

      // Guardar o eliminar el correo según "Recordarme"
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.");
      } else {
        setError(err.response?.data?.message || "Error al iniciar sesión.");
      }
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

      <section className="flex flex-col mt-20 lg:mt-0 lg:flex-row md:min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-white">
        <div className="absolute inset-0 lg:relative lg:w-1/2">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={loginVideo}
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>

        <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center p-6">
          <div className="bg-white dark:bg-black/80 border border-gray-300 dark:border-gray-700 rounded-lg p-8 w-full max-w-md shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-5"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo"
                  className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-5"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  required
                />
              </div>

              {/* Recordarme Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  Recordarme
                </label>
              </div>
{/* Recuperar contrasena  */}
              <div className="flex justify-end">
  <Link
    to="/enviar-correo"
    className="text-blue-500 text-sm hover:underline"
  >
    ¿Olvidaste tu contraseña?
  </Link>
</div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg"
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </form>

            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
            )}

            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
              ¿No tienes una cuenta?{" "}
              <Link to="/registrarse" className="text-blue-500 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
