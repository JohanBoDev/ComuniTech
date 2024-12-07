const express = require('express');
const router = express.Router();
const { obtenerTodosProductos, obtenerProductoRandom, crearProducto, actualizarProducto, eliminarProducto, obtenerProductoPorId, obtenerProductoPorNombre, obtenerProductosPorCategoria, actualizarStockProducto } = require('../controllers/productosController');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas del CRUD

// Crear producto (solo admin)
router.post('/crearProducto', verificarToken, verificarRol([1]), crearProducto);

// Obtener todos los productos
router.get('/todos', obtenerTodosProductos);
// Obtener un producto random
router.get('/random', obtenerProductoRandom);

// obtener productos por nombre
router.get('/nombre/:nombre', obtenerProductoPorNombre);

// obtener productos por categoria
router.get('/categoria/:nombreCategoria', obtenerProductosPorCategoria);

// Obtener un producto por ID
router.get('/:id',  obtenerProductoPorId);



// Actualizar el stock producto (solo admin)
router.put('/actualizarStockProducto/:id', verificarToken, verificarRol([1]), actualizarStockProducto);



// Actualizar producto (solo admin)
router.put('/actualizarProducto/:id', verificarToken, verificarRol([1]), actualizarProducto);

// Eliminar producto (solo admin)
router.delete('/eliminarProducto/:id', verificarToken, verificarRol([1]), eliminarProducto);

module.exports = router;


