const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require("cloudinary").v2;
const stripeWebhook = require('./controllers/stripeController');
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


// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Rutas básicas
app.get('/', (req, res) => {
    res.send('¡Bienvenido a ComuniTech API!');
});

app.get('/succes', (req, res) => {
    res.send('Pago exitoso');
});

app.get('/cancel', (req, res) => {
    res.send('Pago cancelado');
});


app.post(
    '/webhook/stripe',
    bodyParser.raw({ type: 'application/json' }), // Middleware para procesar el cuerpo como raw buffer
    stripeWebhook
  );


//  rutas principales 

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


