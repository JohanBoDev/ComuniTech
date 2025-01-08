const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db');
const nodemailer = require("nodemailer");

const stripeWebhook = async (req, res) => {
    console.log("Webhook iniciado...");

    const sig = req.headers['stripe-signature'];
    if (!sig) {
        console.error("Error: No se encontró la firma del webhook ('stripe-signature').");
        return res.status(400).send("Webhook Error: Missing 'stripe-signature' header.");
    }

    let event;

    try {
        if (!req.body || !(req.body instanceof Buffer)) {
            console.error("Error: No se recibió el cuerpo 'rawBody' como Buffer.");
            return res.status(400).send("Webhook Error: Missing or invalid rawBody.");
        }

        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Error verificando el webhook:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const usuario_id = session.metadata?.usuario_id;

            if (!usuario_id) {
                console.error("Error: No se encontró 'usuario_id' en la metadata del evento.");
                break;
            }

            try {
                const [carrito] = await db.query(
                    `SELECT c.producto_id, c.cantidad, p.precio
                     FROM carrito c
                     JOIN productos p ON c.producto_id = p.id_producto
                     WHERE c.usuario_id = ?`,
                    [usuario_id]
                );

                if (carrito.length === 0) {
                    console.error("El carrito está vacío. No se puede crear un pedido.");
                    break;
                }

                const total = carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

                const [pedido] = await db.query(
                    `INSERT INTO pedidos (usuario_id, fecha_pedido, estado, total, direccion_id)
                     VALUES (?, NOW(), 'Pendiente', ?, ?)`,
                    [usuario_id, total, session.metadata.direccion_id]
                );

                const detalles = carrito.map(item => [
                    pedido.insertId, item.producto_id, item.cantidad, item.precio
                ]);

                await db.query(
                    `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
                     VALUES ?`,
                    [detalles]
                );

                await db.query(`DELETE FROM carrito WHERE usuario_id = ?`, [usuario_id]);

                // Resta el stock de los productos
                for (const item of carrito) {
                    await db.query(
                        `UPDATE productos SET stock = stock - ? WHERE id_producto = ?`,
                        [item.cantidad, item.producto_id]
                    );
                }

                console.log("Stock actualizado para los productos del pedido.");

                // Configurar el transporte de nodemailer
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "empresacomunitech@gmail.com", // Correo oficial
                      pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación de Gmail
                    },
                  });

                // Enviar correo de confirmación al cliente
                const mailOptions = {
                    from: `"Comunitech" <${process.env.EMAIL_USER}>`,
                    to: session.customer_details.email,
                    subject: "Confirmación de tu pedido",
                    html: `
                    <h1>¡Gracias por tu compra en Comunitech!</h1>
                    <p>Tu pedido ha sido recibido y está siendo procesado.</p>
                    <ul>
                        ${carrito
                            .map(
                                (item) => `
                                <li style="margin-bottom: 10px;">
                                    <img src="${item.imagen_url}" alt="Producto" style="width: 100px; height: 100px; object-fit: cover; margin-right: 10px;" />
                                    ${item.cantidad} x ${item.producto_id} - $${item.precio} cada uno
                                </li>`
                            )
                            .join("")}
                    </ul>
                    <p>Total: <strong>$${total}</strong></p>
                    <p>¡Gracias por confiar en nosotros!</p>
                `,
                };

                await transporter.sendMail(mailOptions);
                console.log("Correo de confirmación enviado al usuario:", session.customer_details.email);
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
