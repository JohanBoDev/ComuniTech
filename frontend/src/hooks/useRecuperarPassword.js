import { useState } from "react";
import axios from "axios";

const useRecuperarPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const recuperarPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "https://comunitech.onrender.com/api/usuarios/recuperar-password",
        { email }
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Hubo un error al recuperar la contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return { recuperarPassword, loading, error, success };
};

export default useRecuperarPassword;
