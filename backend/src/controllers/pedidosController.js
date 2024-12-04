const db = require('../config/db');

const obtenerPedidos = async (req, res) => {
    const usuario_id = req.usuario.id; // ID del usuario autenticado

    try {
        // Consultar los pedidos del usuario
        const [pedidos] = await db.query(
            `SELECT id AS pedido_id, fecha_pedido, estado, total
             FROM pedidos
             WHERE usuario_id = ?`,
            [usuario_id]
        );

        if (pedidos.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron pedidos para este usuario.' });
        }

        res.status(200).json({ pedidos });
    } catch (error) {
        console.error('Error al obtener los pedidos del usuario:', error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos del usuario.' });
    }
};

const obtenerDetallesPedido = async (req, res) => {
    const usuario_id = req.usuario.id; // ID del usuario autenticado
    const { id } = req.params; // ID del pedido

    try {
        // Verificar que el pedido pertenece al usuario
        const [pedido] = await db.query(
            `SELECT * FROM pedidos WHERE id = ? AND usuario_id = ?`,
            [id, usuario_id]
        );

        if (pedido.length === 0) {
            return res.status(404).json({ mensaje: 'El pedido no existe o no pertenece al usuario.' });
        }

        // Obtener los detalles del pedido
        const [detalles] = await db.query(
            `SELECT dp.producto_id, p.nombre AS producto_nombre, dp.cantidad, dp.precio_unitario
             FROM detalles_pedido dp
             JOIN productos p ON dp.producto_id = p.id_producto
             WHERE dp.pedido_id = ?`,
            [id]
        );

        res.status(200).json({
            pedido: pedido[0],
            detalles: detalles.length > 0 ? detalles : 'No hay productos en este pedido.',
        });
    } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
        res.status(500).json({ mensaje: 'Error al obtener los detalles del pedido.' });
    }
};

const actualizarEstadoPedido = async (req, res) => {
    const { id_pedido, nuevo_estado } = req.body;

    try {
        // Verificar si el estado es válido
        const estadosValidos = ["Pendiente", "Enviado", "Entregado", "Cancelado"];
        if (!estadosValidos.includes(nuevo_estado)) {
            return res.status(400).json({ mensaje: "Estado no válido. Los estados válidos son: Pendiente, Enviado, Entregado, Cancelado." });
        }

        // Verificar si el pedido existe
        const [pedido] = await db.query(
            `SELECT * FROM pedidos WHERE id = ?`,
            [id_pedido]
        );

        if (pedido.length === 0) {
            return res.status(404).json({ mensaje: "El pedido no existe." });
        }

        // Actualizar el estado del pedido
        await db.query(
            `UPDATE pedidos SET estado = ? WHERE id = ?`,
            [nuevo_estado, id_pedido]
        );

        res.status(200).json({ mensaje: "Estado del pedido actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        res.status(500).json({ mensaje: "Error al actualizar el estado del pedido." });
    }
};

const obtenerTodosLosPedidos = async (req, res) => {
    try {
        // Consulta corregida con los nombres correctos de las columnas
        const [pedidos] = await db.query(`
            SELECT 
                p.id AS id_pedido,
                p.usuario_id,
                u.nombre AS usuario_nombre,
                p.fecha_pedido,
                p.estado,
                p.total,
                d.direccion,
                d.ciudad,
                d.estado AS estado_direccion,
                d.pais,
                d.codigo_postal,
                d.telefono
            FROM pedidos p
            LEFT JOIN usuarios u ON p.usuario_id = u.id_usuario
            LEFT JOIN direcciones d ON p.direccion_id = d.id_direccion
            ORDER BY p.fecha_pedido DESC
        `);

        // Verificar si hay pedidos
        if (pedidos.length === 0) {
            return res.status(404).json({ mensaje: "No hay pedidos registrados." });
        }

        res.status(200).json({ pedidos });
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        res.status(500).json({ mensaje: "Error al obtener los pedidos." });
    }
};

const obtenerDetallesPedidoAdmin = async (req, res) => {
    const { id } = req.params; // ID del pedido

    try {
        // Obtener la información del pedido
        const [pedido] = await db.query(
            `SELECT 
                p.id AS id_pedido,
                p.usuario_id,
                u.nombre AS usuario_nombre,
                p.fecha_pedido,
                p.estado,
                p.total,
                d.direccion,
                d.ciudad,
                d.estado AS estado_direccion,
                d.pais,
                d.codigo_postal,
                d.telefono
            FROM pedidos p
            LEFT JOIN usuarios u ON p.usuario_id = u.id_usuario
            LEFT JOIN direcciones d ON p.direccion_id = d.id_direccion
            WHERE p.id = ?`,
            [id]
        );

        if (pedido.length === 0) {
            return res.status(404).json({ mensaje: 'El pedido no existe.' });
        }

        // Obtener los productos del pedido
        const [detalles] = await db.query(
            `SELECT 
                dp.producto_id,
                p.nombre AS producto_nombre,
                dp.cantidad,
                dp.precio_unitario
             FROM detalles_pedido dp
             JOIN productos p ON dp.producto_id = p.id_producto
             WHERE dp.pedido_id = ?`,
            [id]
        );

        res.status(200).json({
            pedido: pedido[0],
            detalles: detalles.length > 0 ? detalles : 'No hay productos en este pedido.',
        });
    } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
        res.status(500).json({ mensaje: 'Error al obtener los detalles del pedido.' });
    }
};

const filtrarPedidos = async (req, res) => {
    const { estado, usuario_id, fecha_inicio, fecha_fin } = req.query;

    try {
        let filtros = [];
        let valores = [];

        // Agregar filtros opcionales
        if (estado) {
            filtros.push('p.estado = ?');
            valores.push(estado);
        }

        if (usuario_id) {
            filtros.push('p.usuario_id = ?');
            valores.push(usuario_id);
        }

        if (fecha_inicio && fecha_fin) {
            filtros.push('p.fecha_pedido BETWEEN ? AND ?');
            valores.push(fecha_inicio, fecha_fin);
        }

        // Construir consulta
        const whereClause = filtros.length > 0 ? `WHERE ${filtros.join(' AND ')}` : '';
        const query = `
            SELECT 
                p.id AS id_pedido,
                p.usuario_id,
                u.nombre AS usuario_nombre,
                p.fecha_pedido,
                p.estado,
                p.total,
                d.direccion,
                d.ciudad,
                d.estado AS estado_direccion,
                d.pais,
                d.codigo_postal,
                d.telefono
            FROM pedidos p
            LEFT JOIN usuarios u ON p.usuario_id = u.id_usuario
            LEFT JOIN direcciones d ON p.direccion_id = d.id_direccion
            ${whereClause}
            ORDER BY p.fecha_pedido DESC;
        `;

        // Ejecutar consulta
        const [pedidos] = await db.query(query, valores);

        res.status(200).json({
            mensaje: 'Pedidos filtrados obtenidos con éxito.',
            pedidos: pedidos.length > 0 ? pedidos : 'No se encontraron pedidos con los filtros proporcionados.',
        });
    } catch (error) {
        console.error('Error al filtrar pedidos:', error);
        res.status(500).json({ mensaje: 'Error al filtrar pedidos.' });
    }
};





module.exports = {
    obtenerPedidos,
    obtenerDetallesPedido,
    actualizarEstadoPedido,
    obtenerTodosLosPedidos,
    obtenerDetallesPedidoAdmin,
    filtrarPedidos
};