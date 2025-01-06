const db = require("../config/db");

const crearDireccion = async (req, res) => {
    const { direccion, ciudad, estado, codigo_postal, pais, telefono } = req.body;
    const usuario_id = req.usuario.id; // ID del usuario autenticado

    try {
        // Validar que los campos requeridos no estén vacíos
        if (!direccion || !ciudad || !estado || !codigo_postal || !pais || !telefono) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        // Insertar la nueva dirección en la base de datos
        const [resultado] = await db.query(
            `INSERT INTO direcciones (usuario_id, direccion, ciudad, estado, codigo_postal, pais, telefono, fecha_creacion)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [usuario_id, direccion, ciudad, estado, codigo_postal, pais, telefono]
        );

        // Responder con éxito
        res.status(201).json({
            mensaje: 'Dirección creada correctamente.',
            id_direccion: resultado.insertId,
        });
    } catch (error) {
        console.error('Error al crear dirección:', error);
        res.status(500).json({ mensaje: 'Error al crear la dirección.' });
    }
};

const obtenerDirecciones = async (req, res) => {
    const usuario_id = req.usuario.id; // ID del usuario autenticado

    try {
        // Obtener todas las direcciones del usuario
        const [direcciones] = await db.query(
            `SELECT id_direccion, direccion, ciudad, estado, codigo_postal, pais, telefono, fecha_creacion
             FROM direcciones
             WHERE usuario_id = ?`,
            [usuario_id]
        );

        // Verificar si el usuario tiene direcciones registradas
        if (direcciones.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron direcciones registradas.' });
        }

        res.status(200).json({
            mensaje: 'Direcciones obtenidas correctamente.',
            direcciones,
        });
    } catch (error) {
        console.error('Error al obtener direcciones:', error);
        res.status(500).json({ mensaje: 'Error al obtener las direcciones.' });
    }
};

const actualizarDireccion = async (req, res) => {
    const usuario_id = req.usuario.id; // ID del usuario autenticado
    const { id_direccion } = req.params; // ID de la dirección a actualizar
    const { direccion, ciudad, estado, codigo_postal, pais, telefono } = req.body; // Nuevos datos de la dirección

    try {
        // Verificar si la dirección pertenece al usuario
        const [direccionExistente] = await db.query(
            `SELECT * FROM direcciones WHERE id_direccion = ? AND usuario_id = ?`,
            [id_direccion, usuario_id]
        );

        if (direccionExistente.length === 0) {
            return res.status(404).json({ mensaje: 'La dirección no existe o no pertenece al usuario.' });
        }

        // Actualizar la dirección
        await db.query(
            `UPDATE direcciones 
             SET direccion = ?, ciudad = ?, estado = ?, codigo_postal = ?, pais = ?, telefono = ? 
             WHERE id_direccion = ? AND usuario_id = ?`,
            [direccion, ciudad, estado, codigo_postal, pais, telefono, id_direccion, usuario_id]
        );

        res.status(200).json({ mensaje: 'Dirección actualizada correctamente.' });
    } catch (error) {
        console.error('Error al actualizar dirección:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la dirección.' });
    }
};

const eliminarDireccion = async (req, res) => {
    const usuario_id = req.usuario.id; // ID del usuario autenticado
    const { id_direccion } = req.params; // ID de la dirección a eliminar

    try {
        // Verificar si la dirección pertenece al usuario
        const [direccionExistente] = await db.query(
            `SELECT * FROM direcciones WHERE id_direccion = ? AND usuario_id = ?`,
            [id_direccion, usuario_id]
        );

        if (direccionExistente.length === 0) {
            return res.status(404).json({ mensaje: 'La dirección no existe o no pertenece al usuario.' });
        }

        // Eliminar la dirección
        await db.query(`DELETE FROM direcciones WHERE id_direccion = ? AND usuario_id = ?`, [
            id_direccion,
            usuario_id,
        ]);

        res.status(200).json({ mensaje: 'Dirección eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar dirección:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la dirección.' });
    }
};

const seleccionarDireccionParaPedido = async (req, res) => {
    const usuario_id = req.usuario.id; // ID del usuario autenticado
    const { id_direccion, id_pedido } = req.body; // ID de la dirección y el pedido

    try {
        console.log('Usuario autenticado:', usuario_id);
        console.log('Datos recibidos:', { id_direccion, id_pedido });

        // Verificar si la dirección pertenece al usuario
        const [direccion] = await db.query(
            `SELECT * FROM direcciones WHERE id_direccion = ? AND usuario_id = ?`,
            [id_direccion, usuario_id]
        );

        if (direccion.length === 0) {
            console.warn('Dirección no encontrada o no pertenece al usuario:', {
                id_direccion,
                usuario_id
            });
            return res.status(404).json({ mensaje: 'La dirección no existe o no pertenece al usuario.' });
        }

        console.log('Dirección encontrada:', direccion);

        // Verificar si el pedido pertenece al usuario
        const [pedido] = await db.query(
            `SELECT * FROM pedidos WHERE id = ? AND usuario_id = ?`,
            [id_pedido, usuario_id]
        );

        if (pedido.length === 0) {
            console.warn('Pedido no encontrado o no pertenece al usuario:', {
                id_pedido,
                usuario_id
            });
            return res.status(404).json({ mensaje: 'El pedido no existe o no pertenece al usuario.' });
        }

        console.log('Pedido encontrado:', pedido);

        // Actualizar el pedido con la dirección seleccionada
        const [resultado] = await db.query(
            `UPDATE pedidos SET direccion_id = ? WHERE id = ? AND usuario_id = ?`,
            [id_direccion, id_pedido, usuario_id]
        );

        if (resultado.affectedRows === 0) {
            console.error('No se pudo actualizar el pedido con la dirección.', {
                id_pedido,
                id_direccion,
                usuario_id
            });
            return res.status(500).json({ mensaje: 'No se pudo actualizar el pedido con la dirección.' });
        }

        console.log('Pedido actualizado con la dirección:', {
            id_pedido,
            id_direccion
        });

        res.status(200).json({ mensaje: 'Dirección seleccionada para el pedido.' });
    } catch (error) {
        console.error('Error al seleccionar dirección para pedido:', error);
        res.status(500).json({ mensaje: 'Error al seleccionar la dirección para el pedido.' });
    }
};

const obtenerDireccionPorId = async (req, res) => {
    const { id_direccion } = req.params;

    try {
        // Obtener la dirección de la base de datos
        const [direccion] = await db.query(
            `SELECT id_direccion, direccion, ciudad, estado, codigo_postal, pais, telefono 
             FROM direcciones 
             WHERE id_direccion = ?`,
            [id_direccion]
        );

        // Verificar si la dirección existe
        if (direccion.length === 0) {
            return res.status(404).json({ mensaje: 'La dirección no existe.' });
        }

        res.status(200).json(direccion[0]);
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
        res.status(500).json({ mensaje: 'Error al obtener la dirección.' });
    }
};






module.exports = { crearDireccion, obtenerDirecciones, actualizarDireccion, eliminarDireccion, seleccionarDireccionParaPedido, obtenerDireccionPorId };
