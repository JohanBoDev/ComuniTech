const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db');

const stripeWebhook = async (req, res) => {
    console.log("Webhook iniciado...");

    const sig = req.headers['stripe-signature'];
    if (!sig) {
        console.error("Error: No se encontró la firma del webhook ('stripe-signature').");
        return res.status(400).send("Webhook Error: Missing 'stripe-signature' header.");
    }

    console.log("Firma del webhook recibida:", sig);

    let event;

    try {
        // Verificar si se recibió el rawBody como Buffer
        if (!req.body || !(req.body instanceof Buffer)) {
            console.error("Error: No se recibió el cuerpo 'rawBody' como Buffer.");
            return res.status(400).send("Webhook Error: Missing or invalid rawBody.");
        }

        console.log("Cuerpo del webhook recibido (Buffer):", req.body);

        // Verificar el evento recibido desde Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("Evento construido correctamente:", event);
    } catch (err) {
        console.error("Error verificando el webhook:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Procesando evento:", event.type);

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const usuario_id = session.metadata?.usuario_id;

            console.log("Evento 'checkout.session.completed' recibido para usuario_id:", usuario_id);
            console.log("Datos de la sesión:", session);

            if (!usuario_id) {
                console.error("Error: No se encontró 'usuario_id' en la metadata del evento.");
                break;
            }

            try {
                // Obtener los productos del carrito del usuario
                const [carrito] = await db.query(
                    `SELECT c.producto_id, c.cantidad, p.precio
                     FROM carrito c
                     JOIN productos p ON c.producto_id = p.id_producto
                     WHERE c.usuario_id = ?`,
                    [usuario_id]
                );

                console.log("Productos del carrito obtenidos:", carrito);

                if (carrito.length === 0) {
                    console.error("El carrito está vacío. No se puede crear un pedido.");
                    break;
                }

                // Calcular el total del pedido
                const total = carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
                console.log("Total calculado para el pedido:", total);

                // Crear un nuevo pedido en la base de datos
                const [pedido] = await db.query(
                    `INSERT INTO pedidos (usuario_id, fecha_pedido, estado, total, direccion_id)
                     VALUES (?, NOW(), 'Pendiente', ?, ?)`,
                    [usuario_id, total, session.metadata.direccion_id]
                );

                console.log("Pedido creado con ID:", pedido.insertId);

                // Mover los productos del carrito a los detalles del pedido
                const detalles = carrito.map(item => [
                    pedido.insertId, item.producto_id, item.cantidad, item.precio
                ]);

                await db.query(
                    `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
                     VALUES ?`,
                    [detalles]
                );

                console.log("Detalles del pedido insertados:", detalles);

                // Vaciar el carrito del usuario
                await db.query(`DELETE FROM carrito WHERE usuario_id = ?`, [usuario_id]);
                console.log("Carrito vaciado para usuario_id:", usuario_id);
            } catch (error) {
                console.error("Error al procesar el pedido:", error.message);
            }
            break;

        case 'payment_intent.succeeded':
            console.log("Evento 'payment_intent.succeeded' recibido:", event.data.object);
            break;

        case 'payment_intent.payment_failed':
            console.error("Evento 'payment_intent.payment_failed':", event.data.object);
            break;

        default:
            console.log(`Evento no manejado: ${event.type}`);
    }

    res.status(200).json({ received: true });
};

module.exports = stripeWebhook;
