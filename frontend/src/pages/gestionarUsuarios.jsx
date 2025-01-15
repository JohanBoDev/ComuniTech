import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import EditarUsuario from "../components/editarUsuario";
import EliminarUsuario from "../components/eliminarUsuario";
import { motion } from "framer-motion";

const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const token = localStorage.getItem("token");

  // Función para obtener la lista de usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(
        "https://comunitech.onrender.com/api/usuarios/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Llama a fetchUsuarios al cargar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Filtrar usuarios por nombre y fecha de registro
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesName = usuario.nombre
      .toLowerCase()
      .includes(searchName.toLowerCase());

    // Convertir fecha de registro a formato "YYYY-MM-DD" para compararlo con searchDate
    const usuarioFecha = new Date(usuario.fecha_registro)
      .toISOString()
      .split("T")[0];
    const matchesDate = searchDate === "" || usuarioFecha === searchDate;

    return matchesName && matchesDate;
  });

  return (
    <motion.div
      className="min-h-screen p-4 bg-gray-100 dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <header className="sticky top-0 z-50">
        <div className="hidden xl:block">
          <Header />
        </div>
        <div className="xl:hidden">
          <MobileHeader />
        </div>
      </header>

      <div className="flex text-center justify-center items-center mb-6 mt-5">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          Gestionar Usuarios
        </motion.h1>
      </div>

      {/* Filtros */}
      <motion.div
        className="flex flex-col lg:flex-row gap-4 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 border rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-[#1E1E1E] border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full lg:w-1/2"
        />
        <input
          type="date"
          placeholder="Buscar por fecha de registro"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="px-4 py-2 border rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-[#1E1E1E] border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 w-full lg:w-1/2"
        />
      </motion.div>

      {/* Lista de usuarios */}
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="min-w-full border-collapse border border-gray-200 dark:border-gray-700"
          layout
        >
          {filteredUsuarios.map((usuario, index) => (
            <motion.div
              key={usuario.id_usuario}
              className={`flex flex-col lg:flex-row items-center p-4 ${
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-[#1E1E1E]"
                  : "bg-white dark:bg-[#2A2A2A]"
              } border-b border-gray-300 dark:border-gray-600`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.4, // Duración aumentada para suavidad
                ease: [0.25, 0.8, 0.25, 1], // Bezier curve para un efecto más suave
                delay: index * 0.15, // Retraso progresivo más lento
              }}
            >
              {/* Imagen */}
              <div className="flex-shrink-0 lg:mr-4">
                <img
                  src={
                    usuario.foto_perfil ||
                    "https://us.123rf.com/450wm/salamatik/salamatik1801/salamatik180100019/92979836-perfil-an%C3%B3nimo-icono-de-la-cara-persona-silueta-gris-avatar-masculino-por-defecto-foto-de.jpg"
                  }
                  alt={usuario.nombre}
                  className="w-16 h-16 rounded-full border object-contain border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Información */}
              <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:justify-between w-full">
                <div className="lg:w-1/3 text-center lg:text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {usuario.nombre}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {usuario.email}
                  </p>
                </div>
                <div className="lg:w-1/3 text-center lg:text-left">
                  <p
                    className={`font-medium ${
                      usuario.es_admin === 1
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {usuario.es_admin === 1 ? "Es Admin" : "No es Admin"}
                  </p>
                </div>
                <div className="lg:w-1/3 text-center lg:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">
                    Fecha de registro:{" "}
                    {new Date(usuario.fecha_registro).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex space-x-2 mt-4 lg:mt-0">
                <EditarUsuario usuario={usuario} onUpdate={fetchUsuarios} />
                <EliminarUsuario
                  idUsuario={usuario.id_usuario}
                  onDelete={fetchUsuarios}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GestionarUsuarios;
