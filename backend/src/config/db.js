const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno

// Crear el pool de conexiones a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
});

// Exportar el pool como una promesa
module.exports = pool.promise();
