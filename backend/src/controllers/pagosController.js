const db = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');

// Crear una sesión de Stripe Checkout
const crearCheckoutSession = async (req, res) => {
    const { usuario_id, direccion_id } = req.body; // Recoger usuario y dirección

    try {
        // Obtener los productos del carrito del usuario
        const [productos] = await db.query(
            `SELECT c.cantidad, p.nombre, p.precio, p.imagen_url
             FROM carrito c
             JOIN productos p ON c.producto_id = p.id_producto
             WHERE c.usuario_id = ?`,
            [usuario_id]
        );

        if (productos.length === 0) {
            return res.status(400).json({ mensaje: 'El carrito está vacío.' });
        }

        // Crear los elementos de la sesión de Stripe a partir del carrito
        const line_items = productos.map((item) => ({
            price_data: {
                currency: 'cop', // Moneda en pesos colombianos
                product_data: {
                    name: item.nombre,
                    images: [item.imagen_url || 'https://via.placeholder.com/150'], // URL de la imagen
                },
                unit_amount: Math.round(item.precio * 100), // Convertir a centavos
            },
            quantity: item.cantidad,
        }));

        // Crear la sesión de Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Métodos de pago admitidos
            line_items,
            mode: 'payment', // Modo de pago completo
            cancel_url: 'http://localhost:5173/carrito', // URL de cancelación
            success_url: 'http://localhost:5173/', // URL de éxito
            metadata: {
                usuario_id: usuario_id, // Pasar el ID del usuario como metadato
                direccion_id: direccion_id, // Pasar el ID de la dirección como metadato
            },
        });

        // Devolver el URL de la sesión de Stripe
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error al crear la sesión de checkout:', error);
        res.status(500).json({ mensaje: 'Error al crear la sesión de checkout.', error });
    }
};

const verPagos = async (req, res) => {
    try {
        // Obtener todos los pagos con la información del usuario
        const [pagos] = await db.query(
            `SELECT p.id_pago, p.fecha_pago, p.monto, p.estado_pago, p.referencia_transaccion, 
                    u.nombre AS usuario
             FROM pagos p
             JOIN usuarios u ON p.id_usuario = u.id_usuario`
        );

        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error al obtener los pagos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los pagos.', error });
    }
};

const obtenerReporteIngresos = async (req, res) => {
    try {
        // Consultar los ingresos por diferentes períodos
        const [ingresos] = await db.query(
            `SELECT 
                SUM(CASE WHEN fecha_pago >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN monto ELSE 0 END) AS ingresos_ultimo_mes,
                SUM(CASE WHEN fecha_pago >= DATE_SUB(NOW(), INTERVAL 3 MONTH) THEN monto ELSE 0 END) AS ingresos_ultimos_3_meses,
                SUM(CASE WHEN fecha_pago >= DATE_SUB(NOW(), INTERVAL 1 YEAR) THEN monto ELSE 0 END) AS ingresos_ultimo_ano,
                SUM(monto) AS ingresos_totales
             FROM pagos
             WHERE estado_pago = 'Exitoso'`
        );

        res.status(200).json(ingresos[0]);  // Devuelve un solo objeto JSON con los totales
    } catch (error) {
        console.error('Error al obtener el reporte de ingresos:', error);
        res.status(500).json({ mensaje: 'Error al obtener el reporte de ingresos.', error });
    }
};



module.exports = { crearCheckoutSession, verPagos, obtenerReporteIngresos };