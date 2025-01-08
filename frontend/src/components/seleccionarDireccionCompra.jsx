import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SelectAddressForPayment = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook para navegar
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    direccion: "",
    ciudad: "",
    estado: "",
    codigo_postal: "",
    pais: "",
    telefono: "",
  });
  const [isAdding, setIsAdding] = useState(false);

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

  const handleAddAddress = async () => {
    try {
      const response = await fetch(
        `https://comunitech.onrender.com/api/direcciones/crearDireccion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newAddress),
        }
      );
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
        setIsAdding(false);
        console.log(data.mensaje);
      } else {
        console.error(data.mensaje);
      }
    } catch (error) {
      console.error("Error al agregar la dirección:", error);
    }
  };

  const handleSelectAddress = (address) => {
    localStorage.setItem("selectedAddress", address.id_direccion); // Guardar en localStorage
    alert(`Dirección seleccionada: ${address.direccion}`);
    navigate("/carrito"); // Redirigir al carrito
  };

  return (
    <div className="bg-gray-100 dark:bg-[#232323] dark:text-white p-6 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center">Seleccionar Dirección</h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-md">
        {addresses.length > 0 ? (
          <ul className="space-y-4">
            {addresses.map((address) => (
              <li
                key={address.id_direccion}
                className="flex justify-between items-center bg-gray-200 dark:bg-[#2A2A2A] p-4 rounded-lg shadow-md"
              >
                <div>
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
                <button
                  onClick={() => handleSelectAddress(address)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Seleccionar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No tienes direcciones registradas. Por favor agrega una.
          </p>
        )}

        {isAdding || addresses.length === 0 ? (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Agregar Nueva Dirección</h2>
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
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddAddress}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Guardar Dirección
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Agregar Nueva Dirección
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectAddressForPayment;
