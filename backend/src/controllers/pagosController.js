const db = require('../config/db');

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
        const referenciaTransaccion = `PAY-${Date.now()}`;

        // Generar un token firmado con el total y la referencia
        const tokenPago = jwt.sign(
            { referenciaTransaccion, total },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({
            mensaje: 'Pago iniciado.',
            referencia_transaccion: referenciaTransaccion,
            total: total,
            metodo_pago: 'Simulación (Tarjeta de Crédito)',
            tokenPago,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al iniciar el pago.' });
    }
};

const confirmarPago = async (req, res) => {
    const { referencia_transaccion, estado_pago, metodo_pago, monto, tokenPago, direccion_id } = req.body;
    const usuario_id = req.usuario.id;

    try {
        // Verificar el token de pago
        const datosToken = jwt.verify(tokenPago, process.env.JWT_SECRET);

        if (datosToken.referenciaTransaccion !== referencia_transaccion) {
            return res.status(400).json({ mensaje: 'La referencia de transacción no coincide.' });
        }

        if (datosToken.total !== monto) {
            return res.status(400).json({ mensaje: 'El monto del pago no coincide con el total calculado.' });
        }

        if (estado_pago !== 'Exitoso') {
            return res.status(400).json({ mensaje: 'El pago no fue exitoso.' });
        }

        // Validar si la transacción ya existe
        const [transaccionExistente] = await db.query(
            `SELECT * FROM pagos WHERE referencia_transaccion = ?`,
            [referencia_transaccion]
        );

        if (transaccionExistente.length > 0) {
            return res.status(400).json({ mensaje: 'La transacción ya fue procesada.' });
        }

        // Validar si la dirección existe y pertenece al usuario
        const [direccion] = await db.query(
            `SELECT * FROM direcciones WHERE id_direccion = ? AND usuario_id = ?`,
            [direccion_id, usuario_id]
        );

        if (!direccion.length) {
            return res.status(400).json({ mensaje: 'La dirección de envío no es válida.' });
        }

        // Registrar el pago
        const [pago] = await db.query(
            `INSERT INTO pagos (metodo_pago, estado_pago, referencia_transaccion, monto, fecha_pago)
             VALUES (?, ?, ?, ?, NOW())`,
            [metodo_pago, estado_pago, referencia_transaccion, monto]
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
        console.error('Error al confirmar el pago:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ mensaje: 'El token de pago ha expirado.' });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ mensaje: 'Token de pago no válido.' });
        }

        res.status(500).json({ mensaje: 'Error al confirmar el pago.' });
    }
};




module.exports = { iniciarPago, confirmarPago };