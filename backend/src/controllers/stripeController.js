const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db');

const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        // Verificar el evento recibido desde Stripe
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Error verificando el webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const usuario_id = session.metadata.usuario_id;

            try {
                // Obtener los productos del carrito del usuario
                const [carrito] = await db.query(
                    `SELECT c.producto_id, c.cantidad, p.precio
                     FROM carrito c
                     JOIN productos p ON c.producto_id = p.id_producto
                     WHERE c.usuario_id = ?`,
                    [usuario_id]
                );

                if (carrito.length === 0) {
                    console.error('El carrito está vacío. No se puede crear un pedido.');
                    break; // Salir sin procesar el pedido
                }

                // Calcular el total del pedido
                const total = carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

                // Crear un nuevo pedido en la base de datos
                const [pedido] = await db.query(
                    `INSERT INTO pedidos (usuario_id, fecha_pedido, estado, total, direccion_id)
                     VALUES (?, NOW(), 'Pendiente', ?, ?)`,
                    [usuario_id, total, session.metadata.direccion_id]
                );

                // Mover los productos del carrito a los detalles del pedido
                const detalles = carrito.map(item => [
                    pedido.insertId, item.producto_id, item.cantidad, item.precio
                ]);

                await db.query(
                    `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
                     VALUES ?`,
                    [detalles]
                );

                // Vaciar el carrito del usuario
                await db.query(`DELETE FROM carrito WHERE usuario_id = ?`, [usuario_id]);

                console.log(`Pedido ${pedido.insertId} creado exitosamente para el usuario ${usuario_id}.`);
            } catch (error) {
                console.error('Error al procesar el pedido:', error.message);
            }
            break;

        case 'payment_intent.succeeded':
            console.log('Pago completado con éxito:', event.data.object);
            break;

        case 'payment_intent.payment_failed':
            console.error('El pago falló:', event.data.object);
            break;

        default:
            console.log(`Evento no manejado: ${event.type}`);
    }

    res.status(200).json({ received: true });
};

module.exports = { stripeWebhook };
