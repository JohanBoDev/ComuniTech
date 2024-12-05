const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');
const pagosRoutes = require('./routes/pagos');
const direccionesRoutes = require('./routes/direcciones');
const pedidosRoutes = require('./routes/pedidos');

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para procesar JSON

// Rutas básicas
app.get('/', (req, res) => {
    res.send('¡Bienvenido a ComuniTech API!');
});

// Importa rutas principales (pronto las crearemos)
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/direcciones', direccionesRoutes);
app.use('/api/pedidos', pedidosRoutes);


// Iniciar servidor
const PORT = process.env.PORT || 3306; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


