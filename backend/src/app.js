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

// Middleware de CORS
app.use(cors());

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ruta del webhook configurada con `bodyParser.raw`
app.post(
    '/webhook/stripe',
    bodyParser.raw({ type: 'application/json' }), // Procesar el cuerpo como raw buffer
    (req, res, next) => {
        console.log("Headers recibidos en el webhook:", req.headers);
        console.log("Cuerpo recibido antes del controlador:", req.body); // Esto debería ser un Buffer
        next();
    },
    stripeWebhook
);

// Otros middlewares (se procesan después del webhook)
app.use(express.json());

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
