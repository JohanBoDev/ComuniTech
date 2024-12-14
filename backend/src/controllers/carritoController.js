const db = require('../config/db');

// Agregar producto al carrito
const agregarProductoCarrito = async (req, res) => {
    const usuario_id = req.usuario.id; // ID del usuario desde el token JWT
    const { producto_id, cantidad } = req.body;

    try {
        // Verificar el stock disponible del producto
        const [producto] = await db.query(
            'SELECT stock FROM productos WHERE id_producto = ?',
            [producto_id]
        );

        if (producto.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        const stockDisponible = producto[0].stock;

        // Validar si la cantidad solicitada excede el stock disponible
        if (cantidad > stockDisponible) {
            return res.status(400).json({
                mensaje: `Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`,
            });
        }

        // Verificar si el producto ya está en el carrito
        const [existe] = await db.query(
            'SELECT id, cantidad FROM carrito WHERE usuario_id = ? AND producto_id = ?',
            [usuario_id, producto_id]
        );

        if (existe.length > 0) {
            // Calcular la nueva cantidad
            const nuevaCantidad = existe[0].cantidad + cantidad;

            // Validar si la nueva cantidad excede el stock disponible
            if (nuevaCantidad > stockDisponible) {
                return res.status(400).json({
                    mensaje: `Stock insuficiente. No puedes agregar ${cantidad} unidades adicionales. El stock disponible es de ${stockDisponible}.`,
                });
            }

            // Actualizar cantidad en el carrito
            await db.query('UPDATE carrito SET cantidad = ? WHERE id = ?', [nuevaCantidad, existe[0].id]);
            return res.status(200).json({ mensaje: 'Cantidad actualizada en el carrito.' });
        }

        // Insertar nuevo producto en el carrito
        await db.query(
            'INSERT INTO carrito (usuario_id, producto_id, cantidad, fecha_agregado) VALUES (?, ?, ?, NOW())',
            [usuario_id, producto_id, cantidad]
        );
        res.status(201).json({ mensaje: 'Producto agregado al carrito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar el producto al carrito.' });
    }
};

// Obtener productos del carrito de un usuario
const obtenerCarritoUsuario = async (req, res) => {
    const usuario_id = req.usuario.id; // Extrae el usuario_id del token JWT

    try {
        const [productos] = await db.query(
            `SELECT c.id AS carrito_id, 
                    p.id_producto, 
                    p.nombre, 
                    c.cantidad, 
                    p.precio,
                    p.descripcion, 
                    (c.cantidad * p.precio) AS subtotal,
                    p.imagen_url
             FROM carrito c
             JOIN productos p ON c.producto_id = p.id_producto
             WHERE c.usuario_id = ?`,
            [usuario_id]
        );

        // Verificar si el carrito está vacío
        if (productos.length === 0) {
            return res.status(200).json({ mensaje: 'No tienes productos en el carrito.' });
        }

        // Devolver los productos si existen
        return res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        return res.status(500).json({ mensaje: 'Error al obtener el carrito del usuario.' });
    }
};



// Actualizar cantidad de un producto en el carrito
const actualizarCantidadProducto = async (req, res) => {
    const { carrito_id } = req.params; // ID del producto en el carrito
    const { cantidad } = req.body; // Nueva cantidad enviada en el body
    const usuario_id = req.usuario.id; // ID del usuario autenticado (obtenido del token)

    try {
        // Validar que la cantidad es un número positivo o 0
        if (cantidad < 0) {
            return res.status(400).json({ mensaje: 'La cantidad debe ser un número positivo o 0.' });
        }

        // Verificar que el producto en el carrito pertenece al usuario autenticado
        const [producto] = await db.query(
            'SELECT id FROM carrito WHERE id = ? AND usuario_id = ?',
            [carrito_id, usuario_id]
        );

        if (producto.length === 0) {
            return res.status(403).json({ mensaje: 'No tienes permiso para actualizar este producto.' });
        }

        // Si la cantidad es 0, eliminar el producto del carrito
        if (cantidad === 0) {
            await db.query('DELETE FROM carrito WHERE id = ?', [carrito_id]);
            return res.status(200).json({ mensaje: 'Producto eliminado del carrito.' });
        }

        // Actualizar la cantidad del producto en el carrito
        await db.query('UPDATE carrito SET cantidad = ? WHERE id = ?', [cantidad, carrito_id]);
        res.status(200).json({ mensaje: 'Cantidad actualizada.' });
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la cantidad.' });
    }
};


// Eliminar un producto del carrito
const eliminarProductoCarrito = async (req, res) => {
    const { carrito_id } = req.params;
    const usuario_id = req.usuario.id; // Obtenido del token

    try {
        // Verificar si el producto pertenece al usuario autenticado
        const [producto] = await db.query(
            'SELECT id FROM carrito WHERE id = ? AND usuario_id = ?',
            [carrito_id, usuario_id]
        );

        if (producto.length === 0) {
            return res.status(403).json({ mensaje: 'No tienes permiso para eliminar este producto.' });
        }

        // Eliminar el producto
        await db.query('DELETE FROM carrito WHERE id = ?', [carrito_id]);
        res.status(200).json({ mensaje: 'Producto eliminado del carrito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto del carrito.' });
    }
};


// Vaciar el carrito de un usuario
const vaciarCarritoUsuario = async (req, res) => {
    const usuario_id = req.usuario.id; // Extrae el usuario_id del token JWT
    console.log('Vaciar carrito para el usuario:', usuario_id); // Log para verificar

    try {
        const [result] = await db.query('DELETE FROM carrito WHERE usuario_id = ?', [usuario_id]);
        console.log('Resultado de la eliminación:', result); // Log del resultado
        res.status(200).json({ mensaje: 'Carrito vaciado.' });
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        res.status(500).json({ mensaje: 'Error al vaciar el carrito.' });
    }
};

// Obtener subtotal, impuestos y total del carrito
const obtenerTotalCarrito = async (req, res) => {
    const usuario_id = req.usuario.id; // Obtenido del token JWT

    try {
        const [productos] = await db.query(
            `SELECT c.cantidad, p.precio
             FROM carrito c
             JOIN productos p ON c.producto_id = p.id_producto
             WHERE c.usuario_id = ?`,
            [usuario_id]
        );

        if (productos.length === 0) {
            return res.status(200).json({ mensaje: 'No tienes productos en el carrito.', total: 0 });
        }

        // Calcular subtotal
        const subtotal = productos.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

        // Calcular impuestos (por ejemplo, 16% de IVA)
        const impuestos = subtotal * 0.16;

        // Calcular total
        const total = subtotal + impuestos;

        res.status(200).json({
            mensaje: 'Cálculo del carrito exitoso.',
            subtotal,
            impuestos,
            total,
        });
    } catch (error) {
        console.error('Error al calcular el total del carrito:', error);
        res.status(500).json({ mensaje: 'Error al calcular el total del carrito.' });
    }
};



module.exports = {
    agregarProductoCarrito,
    obtenerCarritoUsuario,
    actualizarCantidadProducto,
    eliminarProductoCarrito,
    vaciarCarritoUsuario,
    obtenerTotalCarrito,
};
