import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element: Component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to="/iniciar-sesion" />;
};

export default ProtectedRoute;
