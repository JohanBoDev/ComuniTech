import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import bannerPerfil from "../assets/banner-mi-perfil.png";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(user?.nombre || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");

  // Maneja el cambio de archivo en el input
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Maneja la subida de la foto de perfil
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Por favor selecciona un archivo.");
     
      return;
    }

    const formData = new FormData();
    formData.append("fotoPerfil", selectedFile);

    try {
      console.log("Iniciando subida de foto...");
      const response = await fetch(
        `https://comunitech.onrender.com/api/usuarios/${user.id_usuario}/foto`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      

      if (response.ok) {
        setUploadStatus("Foto subida correctamente.");
        

        // Actualiza el contexto del usuario con la nueva URL
        if (setUser) {
          setUser((prevUser) => ({
            ...prevUser,
            foto_perfil: data.fileUrl,
          }));
         
        } else {
          console.warn("setUser no está disponible en el contexto.");
        }

        setSelectedFile(null); // Reinicia el archivo seleccionado
      } else {
        setUploadStatus(data.message || "Error al subir la foto.");
        console.error("Error al subir la foto:", data.message);
      }
    } catch (error) {
      setUploadStatus("Ocurrió un error al subir la foto.");
      console.error("Error al subir la foto:", error);
    }
  };

  // Maneja la actualización del nombre y email del perfil
  const handleSave = async () => {
    try {
      console.log("Guardando cambios de perfil...");
      const response = await fetch(
        `https://comunitech.onrender.com/api/usuarios/${user.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: newName,
            email: newEmail,
          }),
        }
      );

      const data = await response.json();
     

      if (response.ok) {
        

        // Actualiza el contexto del usuario con el nuevo nombre y email
        if (setUser) {
          setUser((prevUser) => ({
            ...prevUser,
            nombre: newName,
            email: newEmail,
          }));
        } else {
          console.warn("setUser no está disponible en el contexto.");
        }

        setIsModalOpen(false); // Cierra el modal
      } else {
        console.error(data.message || "Error al actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  // Si no hay información del usuario, muestra un mensaje de carga
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 mt-10 dark:bg-[#232323] dark:text-white ">
      <div className="max-w-4xl px-6 -mt-12 mx-auto p-5">
        <div className="bg-white dark:bg-[#1A1A1A] relative rounded-lg shadow-md p-6 flex flex-col lg:flex-row items-center gap-x-5">
          <div className="relative">
            <img
              src={user.foto_perfil || "/default-avatar.png"}
              alt="Foto de perfil"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200 dark:border-gray-800 shadow-lg"
            />
            <label
              htmlFor="file-upload"
              className="absolute bottom-5 left-0 bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-semibold p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 flex items-center justify-center border-2 border-gray-200 dark:border-gray-800"
              style={{ transform: "translate(30%, 30%)" }}
            >
              <FontAwesomeIcon icon={faCamera} className="text-sm" />
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="text-center flex flex-col items-center lg:items-start mt-4">
            <h1 className="lg:text-2xl text-xl font-semibold">{user.nombre}</h1>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {user.email}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:gap-6 lg:absolute lg:right-6">
  <button
    onClick={handleUpload}
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow-md w-full md:w-auto"
  >
    Subir Foto
  </button>
  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-[#1F2937] hover:bg-[#343b44] text-white font-semibold py-2 px-6 rounded shadow-md w-full md:w-auto"
  >
    Editar Perfil
  </button>
</div>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#232323] rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nombre"
              className="w-full mb-4 p-2 border rounded dark:bg-black dark:text-white"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              className="w-full mb-4 p-2 border rounded dark:bg-black dark:text-white"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-[#1F2937] hover:bg-[#343b44] text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
