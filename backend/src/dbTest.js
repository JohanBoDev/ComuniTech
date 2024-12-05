const mysql = require('mysql2');
require('dotenv').config(); // Carga las variables de entorno

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.MYSQL_URL
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
    } else {
        console.log('¡Conexión exitosa a la base de datos!');
    }
    connection.end(); // Cierra la conexión después de probarla
});
