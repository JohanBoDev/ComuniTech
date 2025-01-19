import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(); // Named export para AuthContext

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos
      return decoded.exp > currentTime; // Verifica si el token no ha expirado
    } catch (error) {
      console.error("Token inválido:", error);
      return false;
    }
  };
  

  // Cargar token y datos del usuario al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      verificarAdmin(token);
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      }
    } else {
      logout(); // Si el token no es válido, cerrar sesión automáticamente
    }
  }, []);
  

  // Verificar si el usuario es administrador
  const verificarAdmin = (token) => {
    try {
      // Decodificar el token
      const decoded = jwtDecode(token);
      
      // Actualizar el estado de isAdmin según el campo es_admin
      if (decoded && decoded.es_admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      setIsAdmin(false);
    }
  };

  // Función de inicio de sesión
  const login = (token, userData) => {
    if (userData) {
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
      verificarAdmin(token);
    } else {
      console.error("Datos de usuario no válidos para iniciar sesión:", userData);
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("selectedAddress");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    navigate("/");
    //mensaje de exito 
    alert("Sesión cerrada exitosamente");
  
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
      value={{ isLoggedIn, user, isAdmin, setUser, login, logout, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
