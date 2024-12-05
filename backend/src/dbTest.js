const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno

// Crear conexión para prueba
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
    } else {
        console.log('¡Conexión exitosa a la base de datos!');
    }
    connection.end(); // Cierra la conexión después de probarla
});
