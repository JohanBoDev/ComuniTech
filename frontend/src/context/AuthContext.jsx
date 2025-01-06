import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(); // Named export para AuthContext

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Para guardar datos del usuario
  const navigate = useNavigate();

  // Cargar token y datos del usuario al iniciar la app
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("usuario");
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser); // Asegúrate de que sea un JSON válido
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
      localStorage.setItem("usuario", JSON.stringify(userData)); // Guardar datos del usuario en localStorage
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => useContext(AuthContext);
