import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isUserLoggedIn } = useAuth();

  // Verifica si el usuario está autenticado
  const isLoggedIn = isUserLoggedIn();

  // Muestra un loader si no se ha determinado el estado
  if (isLoggedIn === null) {
    return <div>Cargando...</div>; // Personaliza este mensaje o agrega un spinner
  }

  // Si está autenticado, permite el acceso a las rutas hijas
  return isLoggedIn ? <Outlet /> : <Navigate to="/iniciar-sesion" replace />;
};

export default ProtectedRoute;
