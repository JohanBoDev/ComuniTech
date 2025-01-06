const db = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');

// Crear una sesión de Stripe Checkout
const crearCheckoutSession = async (req, res) => {
    const { usuario_id } = req.body; // Recoger el ID del usuario

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
            cancel_url : 'http://localhost:5173/carrito', // URL de cancelación
            success_url : 'http://localhost:5173/', // URL de éxito
            metadata: {
                usuario_id: usuario_id, // Pasar el ID del usuario como metadato
            },
        });

        // Devolver el URL de la sesión de Stripe
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error al crear la sesión de checkout:', error);
        res.status(500).json({ mensaje: 'Error al crear la sesión de checkout.', error });
    }
};

module.exports = { crearCheckoutSession };