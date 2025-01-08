import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(); // Named export para AuthContext

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar token y datos del usuario al iniciar la app
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("usuario");
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario desde localStorage:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // Función de inicio de sesión
  const login = (token, userData) => {
    if (userData) {
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
    } else {
      console.error("Datos de usuario no válidos para iniciar sesión:", userData);
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  // Función para verificar si el usuario está autenticado
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const userData = JSON.parse(localStorage.getItem("usuario"));
      return !!(token && userData); // Retorna true si el token y los datos del usuario están presentes
    } catch (error) {
      console.error("Error verificando el estado de autenticación:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, login, logout, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
