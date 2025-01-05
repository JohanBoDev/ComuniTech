const db = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');

const iniciarPago = async (req, res) => {
    const usuario_id = req.usuario.id;

    try {
        const [productos] = await db.query(
            `SELECT c.cantidad, p.precio
             FROM carrito c
             JOIN productos p ON c.producto_id = p.id_producto
             WHERE c.usuario_id = ?`,
            [usuario_id]
        );

        if (productos.length === 0) {
            return res.status(400).json({ mensaje: 'El carrito está vacío.' });
        }

        const total = productos.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), // Convertir a centavos
            currency: 'cop',
            automatic_payment_methods: { enabled: true }, // Habilitar métodos de pago automáticos
            metadata: {
                usuario_id: usuario_id.toString(),
            },
        });

        res.status(200).json({
            mensaje: 'Pago iniciado.',
            total: total,
            metodo_pago: 'Stripe (Tarjeta de Crédito)',
            clientSecret: paymentIntent.client_secret, // Enviar el clientSecret al frontend
            paymentIntentId: paymentIntent.id, // ID del PaymentIntent
        });
    } catch (error) {
        console.error('Error al iniciar el pago con Stripe:', error);
        res.status(500).json({ mensaje: 'Error al iniciar el pago con Stripe.' });
    }
};



const confirmarPago = async (req, res) => {
    const { paymentIntentId, payment_method, direccion_id } = req.body;
    const usuario_id = req.usuario.id;

    try {
        // Confirmar el PaymentIntent con el método de pago
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method,
        });

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ mensaje: 'El pago no fue exitoso.' });
        }

        const monto = paymentIntent.amount / 100; // Convertir de centavos a pesos
        const referencia_transaccion = paymentIntent.id;

        // Validar si la dirección existe y pertenece al usuario
        const [direccion] = await db.query(
            `SELECT * FROM direcciones WHERE id_direccion = ? AND usuario_id = ?`,
            [direccion_id, usuario_id]
        );

        if (!direccion.length) {
            return res.status(400).json({ mensaje: 'La dirección de envío no es válida.' });
        }

        // Registrar el pago
        await db.query(
            `INSERT INTO pagos (metodo_pago, estado_pago, referencia_transaccion, monto, fecha_pago)
             VALUES (?, ?, ?, ?, NOW())`,
            ['Stripe', 'Exitoso', referencia_transaccion, monto]
        );

        // Crear un pedido con la dirección de envío
        const [pedido] = await db.query(
            `INSERT INTO pedidos (usuario_id, direccion_id, fecha_pedido, estado, total)
             VALUES (?, ?, NOW(), 'Pendiente', ?);`,
            [usuario_id, direccion_id, monto]
        );

        if (!pedido.insertId) {
            throw new Error('No se pudo obtener el ID del pedido.');
        }

        // Mover productos del carrito a detalles_pedido
        const [carrito] = await db.query(
            `SELECT c.producto_id, c.cantidad, p.precio
             FROM carrito c
             JOIN productos p ON c.producto_id = p.id_producto
             WHERE c.usuario_id = ?`,
            [usuario_id]
        );

        if (carrito.length === 0) {
            return res.status(400).json({ mensaje: 'El carrito está vacío. No se puede crear un pedido.' });
        }

        const detalles = carrito.map(item => [
            pedido.insertId, item.producto_id, item.cantidad, item.precio
        ]);

        await db.query(
            `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
             VALUES ?`,
            [detalles]
        );

        // Reducir el stock de los productos
        for (const item of carrito) {
            await db.query(
                `UPDATE productos
                 SET stock = stock - ?
                 WHERE id_producto = ? AND stock >= ?`,
                [item.cantidad, item.producto_id, item.cantidad]
            );
        }

        // Vaciar el carrito
        await db.query(`DELETE FROM carrito WHERE usuario_id = ?`, [usuario_id]);

        res.status(200).json({
            mensaje: 'Pago confirmado, pedido creado, dirección asignada y stock actualizado.',
            id_pedido: pedido.insertId,
        });
    } catch (error) {
        console.error('Error al confirmar el pago con Stripe:', error);
        res.status(500).json({ mensaje: 'Error al confirmar el pago con Stripe.' });
    }
};







module.exports = { iniciarPago, confirmarPago };