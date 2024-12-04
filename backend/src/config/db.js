const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno

// Crear la conexión a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Exportar la conexión como una promesa
module.exports = pool.promise();
