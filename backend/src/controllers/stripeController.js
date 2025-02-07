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

            // Recuperar usuario_id y direccion_id desde la metadata
            const usuario_id = session.metadata?.usuario_id;
            const direccion_id = session.metadata?.direccion_id;

            if (!usuario_id || !direccion_id) {
                console.error("Error: No se encontraron 'usuario_id' o 'direccion_id' en la metadata del evento.");
                break;
            }

            try {
                // Obtener los datos del carrito del usuario
                const [carrito] = await db.query(
                    `SELECT c.producto_id, c.cantidad, p.precio, p.nombre, p.imagen_url
                     FROM carrito c
                     JOIN productos p ON c.producto_id = p.id_producto
                     WHERE c.usuario_id = ?`,
                    [usuario_id]
                );

                if (carrito.length === 0) {
                    console.error("El carrito está vacío. No se puede crear un pedido.");
                    break;
                }

                // Calcular el total del pedido
                const total = carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

                // Crear el pedido en la base de datos
                const [pedido] = await db.query(
                    `INSERT INTO pedidos (usuario_id, fecha_pedido, estado, total, direccion_id)
                     VALUES (?, NOW(), 'Pendiente', ?, ?)`,
                    [usuario_id, total, direccion_id]
                );

                // Insertar los detalles del pedido
                const detalles = carrito.map(item => [
                    pedido.insertId, // ID del pedido
                    item.producto_id, // ID del producto
                    item.cantidad, // Cantidad comprada
                    item.precio // Precio unitario
                ]);

                await db.query(
                    `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
                     VALUES ?`,
                    [detalles]
                );

                // Limpiar el carrito del usuario
                await db.query(`DELETE FROM carrito WHERE usuario_id = ?`, [usuario_id]);

                // Resta el stock de los productos
                for (const item of carrito) {
                    await db.query(
                        `UPDATE productos SET stock = stock - ? WHERE id_producto = ?`,
                        [item.cantidad, item.producto_id]
                    );
                }

                console.log("Carrito procesado con éxito.");
                console.log("Stock actualizado para los productos del pedido.");


                try {
                    // Insertar el pago en la base de datos con el id_usuario
                    await db.query(
                        `INSERT INTO pagos (metodo_pago, estado_pago, referencia_transaccion, monto, fecha_pago, id_usuario)
                         VALUES (?, ?, ?, ?, NOW(), ?)`,
                        [
                            session.payment_method_types[0], // Método de pago (Ejemplo: 'card')
                            'Exitoso', // Estado del pago
                            session.payment_intent, // Referencia de la transacción
                            session.amount_total / 100, // Monto en formato decimal
                            usuario_id // ID del usuario recuperado de la metadata de la sesión
                        ]
                    );
                
                    console.log("Pago registrado en la base de datos con usuario_id.");
                } catch (error) {
                    console.error("Error al registrar el pago:", error.message);
                }
                

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
                        <h1>${session.customer_details.name}, ¡Gracias por tu compra en Comunitech!</h1>
                        <p>Tu pedido ha sido recibido y está siendo procesado.</p>
                        <ul style="list-style-type: none; padding: 0;">
                        ${carrito.map(item => `
                            <li style="display: flex; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                                <img src="${item.imagen_url}" alt="${item.nombre}" 
                                    style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-right: 15px;" />
                                <div>
                                    <strong>${item.nombre}</strong><br />
                                    <span>${item.cantidad} x $${item.precio.toLocaleString("es-CO")}</span>
                                </div>
                            </li>
                        `).join("")}
                        </ul>
                        <p><strong>Total: $${total.toLocaleString("es-CO")}</strong></p>
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
