const db = require('../config/db');

// Obtener todos los productos
const obtenerTodosProductos = async (req, res) => {
    try {
        const [productos] = await db.query('SELECT * FROM productos');
        console.log('Productos encontrados:', productos); // Debug
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error); // Debug
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// obtener productos paginados
const obtenerProductosPaginados = async (req, res) => {
    try {
        // Obtener el número de página desde los parámetros de la solicitud, por defecto es 1
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = 8; // Número de productos por página
        const offset = (pagina - 1) * limite;

        // Consultar los productos con paginación
        const [productos] = await db.query('SELECT * FROM productos LIMIT ? OFFSET ?', [limite, offset]);

        // Obtener el total de productos para calcular la cantidad total de páginas
        const [totalProductos] = await db.query('SELECT COUNT(*) as total FROM productos');
        const total = totalProductos[0].total;
        const totalPaginas = Math.ceil(total / limite);

        res.json({
            paginaActual: pagina,
            totalPaginas,
            totalProductos: total,
            productos,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error); // Debug
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// obtener un producto al azar
const obtenerProductoRandom = async (req, res) => {
    try {
      const [productos] = await db.query('SELECT * FROM productos ORDER BY RAND() LIMIT 1');
  
      if (productos.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron productos.' });
      }
  
      res.json(productos[0]);
    } catch (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ mensaje: 'Error al obtener un producto aleatorio.' });
    }
  };

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido:', id); // Debug

    if (!id || isNaN(id)) {
        return res.status(400).json({ mensaje: 'ID no válido.' });
    }

    try {
        const [producto] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        console.log('Producto encontrado:', producto); // Debug

        if (producto.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }
        res.json(producto[0]);
    } catch (error) {
        console.error('Error en la consulta:', error); // Debug
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
};

// Obtener un producto por Nombre
const obtenerProductoPorNombre = async (req, res) => {
    const { nombre } = req.params;
    console.log('Nombre recibido:', nombre); // Debug

    if (!nombre) {
        return res.status(400).json({ mensaje: 'Nombre no válido.' });
    }

    try {
        // Usa LIKE para búsquedas flexibles
        const [producto] = await db.query('SELECT * FROM productos WHERE LOWER(nombre) LIKE LOWER(?)', [`%${nombre}%`]);
        console.log('Producto encontrado:', producto); // Debug

        if (!producto || producto.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        res.json(producto);
    } catch (error) {
        console.error('Error en la consulta:', error); // Debug
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
};

// Obtener productos por categoría
const obtenerProductosPorCategoria = async (req, res) => {
    const { nombreCategoria } = req.params;
    console.log('Nombre de categoría recibido:', nombreCategoria); // Debug

    if (!nombreCategoria) {
        return res.status(400).json({ mensaje: 'El nombre de la categoría es obligatorio.' });
    }

    try {
        // Consulta para buscar productos por categoría
        const [productos] = await db.query(`
            SELECT p.* 
            FROM productos p
            JOIN categorias c ON p.id_categoria = c.id_categoria
            WHERE c.nombre LIKE ?
        `, [`%${nombreCategoria}%`]);

        console.log('Productos encontrados:', productos); // Debug

        if (!productos || productos.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron productos para esta categoría.' });
        }

        res.json(productos);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error al obtener productos por categoría.' });
    }
};


// Crear un nuevo producto (solo admin)
const crearProducto = async (req, res) => {
    const { id_categoria, nombre, descripcion, marca, precio, stock, imagen_url } = req.body;

    // Log de los datos recibidos en el cuerpo de la solicitud
    console.log('Datos recibidos en la solicitud:', req.body);

    try {
        // Log antes de ejecutar la consulta
        console.log('Intentando insertar producto en la base de datos...');

        // Asegúrate de que las columnas y valores coincidan
        const resultado = await db.query(
            'INSERT INTO productos (id_categoria, nombre, descripcion, marca, precio, stock, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_categoria, nombre, descripcion, marca, precio, stock, imagen_url]
        );

        // Log del resultado de la consulta
        console.log('Producto creado con éxito. Resultado:', resultado);

        res.status(201).json({ mensaje: 'Producto creado correctamente.' });
    } catch (error) {
        // Log del error si algo falla
        console.error('Error al crear el producto:', error);

        res.status(500).json({ error: 'Error al crear el producto.' });
    }
};


// Actualizar un producto (solo admin)
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, stock } = req.body;

    try {
        const [resultado] = await db.query('UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, stock = ? WHERE id_producto = ?', [nombre, precio, descripcion, stock, id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }
        res.json({ mensaje: 'Producto actualizado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
};

// Eliminar un producto (solo admin)
const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const [resultado] = await db.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }
        res.json({ mensaje: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
};

const actualizarStockProducto = async (req, res) => {
    const { id } = req.params; // ID del producto
    const { stock } = req.body; // Nuevo stock enviado en el cuerpo de la solicitud

    try {
        // Validar que el stock sea un número positivo
        if (stock === undefined || stock < 0) {
            return res.status(400).json({ mensaje: 'El stock debe ser un número válido y mayor o igual a 0.' });
        }

        // Actualizar el stock del producto en la base de datos
        const [resultado] = await db.query(
            'UPDATE productos SET stock = ? WHERE id_producto = ?',
            [stock, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Stock actualizado correctamente.', id_producto: id, nuevo_stock: stock });
    } catch (error) {
        console.error('Error al actualizar el stock del producto:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el stock del producto.' });
    }
};


  



module.exports = { obtenerTodosProductos,
    obtenerProductosPaginados,
    obtenerProductoPorId,
    obtenerProductoPorNombre,
    crearProducto,
    actualizarProducto,
    eliminarProducto, 
    obtenerProductosPorCategoria,
    actualizarStockProducto,
    obtenerProductoRandom};
