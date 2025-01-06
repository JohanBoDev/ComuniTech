import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    direccion: "",
    ciudad: "",
    estado: "",
    codigo_postal: "",
    pais: "",
    telefono: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `https://comunitech.onrender.com/api/direcciones/obtenerDirecciones`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAddresses(data.direcciones);
      } else {
        console.error(data.mensaje);
      }
    } catch (error) {
      console.error("Error al obtener direcciones:", error);
    }
  };

  const handleCreateOrUpdate = async () => {
    const endpoint = isEditing
      ? `https://comunitech.onrender.com/api/direcciones/actualizarDireccion/${selectedAddress.id_direccion}`
      : `https://comunitech.onrender.com/api/direcciones/crearDireccion`;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newAddress),
      });
      const data = await response.json();
      if (response.ok) {
        fetchAddresses();
        setNewAddress({
          direccion: "",
          ciudad: "",
          estado: "",
          codigo_postal: "",
          pais: "",
          telefono: "",
        });
        setIsEditing(false);
        setSelectedAddress(null);
        console.log(data.mensaje);
      } else {
        console.error(data.mensaje);
      }
    } catch (error) {
      console.error("Error al crear o actualizar la dirección:", error);
    }
  };

  const handleDelete = async (id_direccion) => {
    try {
      const response = await fetch(
        `https://comunitech.onrender.com/api/direcciones/eliminarDireccion/${id_direccion}`,
        {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          fetchAddresses();
          console.log(data.mensaje);
        } else {
          console.error(data.mensaje);
        }
      } catch (error) {
        console.error("Error al eliminar la dirección:", error);
      }
    };
  
    const handleEdit = (address) => {
      setNewAddress({ ...address });
      setIsEditing(true);
      setSelectedAddress(address);
    };
  
    return (
      <div className=" bg-gray-100 dark:bg-[#232323] dark:text-white p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Mis Direcciones</h1>
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-md">
          {/* Lista de direcciones */}
          {addresses.length > 0 ? (
            <ul className="space-y-4">
              {addresses.map((address) => (
                <li
  key={address.id_direccion}
  className="flex flex-col lg:flex-row justify-between items-center bg-gray-200 dark:bg-[#2A2A2A] p-4 rounded-lg shadow-md space-y-4 lg:space-y-0"
>
  <div className="w-full lg:w-auto text-center lg:text-left">
    <p className="font-semibold">{address.direccion}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      {address.ciudad}, {address.estado}, {address.pais}
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Código Postal: {address.codigo_postal}
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Teléfono: {address.telefono}
    </p>
  </div>
  <div className="flex flex-col lg:flex-row w-full lg:w-auto items-center space-y-2 lg:space-y-0 lg:space-x-2">
    <button
      onClick={() => handleEdit(address)}
      className="w-full lg:w-auto bg-[#343B44] hover:bg-[#414852] text-white px-4 py-2 rounded text-sm lg:text-base"
    >
      Editar
    </button>
    <button
      onClick={() => handleDelete(address.id_direccion)}
      className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm lg:text-base"
    >
      Eliminar
    </button>
  </div>
</li>

              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No tienes direcciones registradas.
            </p>
          )}
  
          {/* Formulario para crear/editar direcciones */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              {isEditing ? "Editar Dirección" : "Nueva Dirección"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                value={newAddress.direccion}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, direccion: e.target.value })
                }
                placeholder="Dirección"
                className="p-2 border rounded dark:bg-black dark:text-white"
              />
              <input
                type="text"
                value={newAddress.ciudad}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, ciudad: e.target.value })
                }
                placeholder="Ciudad"
                className="p-2 border rounded dark:bg-black dark:text-white"
              />
              <input
                type="text"
                value={newAddress.estado}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, estado: e.target.value })
                }
                placeholder="Departamento"
                className="p-2 border rounded dark:bg-black dark:text-white"
              />
              <input
                type="text"
                value={newAddress.codigo_postal}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, codigo_postal: e.target.value })
                }
                placeholder="Código Postal"
                className="p-2 border rounded dark:bg-black dark:text-white"
              />
              <input
                type="text"
                value={newAddress.pais}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pais: e.target.value })
                }
                placeholder="País"
                className="p-2 border rounded dark:bg-black dark:text-white"
              />
              <input
                type="text"
                value={newAddress.telefono}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, telefono: e.target.value })
                }
                placeholder="Teléfono"
                className="p-2 border rounded dark:bg-black dark:text-white"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewAddress({
                      direccion: "",
                      ciudad: "",
                      estado: "",
                      codigo_postal: "",
                      pais: "",
                      telefono: "",
                    });
                  }}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={handleCreateOrUpdate}
                className="bg-[#16A34A] hover:bg-[#16a355] text-white px-4 py-2 rounded"
              >
                {isEditing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserAddresses;
  