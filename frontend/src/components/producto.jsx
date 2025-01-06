import React from 'react';

const Producto = ({ nombre, precio, imagen_url, stock }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img
        src={imagen_url}
        alt={nombre}
    
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-2">
        <h2 className="text-lg font-semibold text-gray-800">{nombre}</h2>
        <p className="text-gray-600">{stock}</p>
        <p className="text-green-500 font-bold">${precio}</p>

      </div>
    </div>
  );
};

export default Producto;
