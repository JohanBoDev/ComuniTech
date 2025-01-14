const express = require('express');
const router = express.Router();
const { obtenerTodosProductos, obtenerCategorias, obtenerProductosPaginados, crearProducto, actualizarProducto, eliminarProducto, obtenerProductoPorId, obtenerProductoPorNombre, obtenerProductosPorCategoria, actualizarStockProducto, agregarProductoFavorito, obtenerProductosFavoritos, eliminarProductoFavorito } = require('../controllers/productosController');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas del CRUD de productos


// Obtener todos los productos
router.get('/todos', obtenerTodosProductos);

router.get('/paginados', obtenerProductosPaginados);

// obtener productos por nombre
router.get('/nombre/:nombre', obtenerProductoPorNombre);

// obtener productos por categoria
router.get('/categoria/:nombreCategoria', obtenerProductosPorCategoria);

// Obtener un producto por ID
router.get('/:id',  obtenerProductoPorId);

// Agregar producto a favoritos
router.post('/agregarFavorito/:id', verificarToken, agregarProductoFavorito);

// Obtener productos favoritos
router.get('/favoritos/:id_usuario', verificarToken, obtenerProductosFavoritos);

// Eliminar producto de favoritos
router.delete('/eliminarFavorito/:id', verificarToken, eliminarProductoFavorito);


//administrador

// Actualizar el stock producto (solo admin)
router.put('/actualizarStockProducto/:id', verificarToken, verificarRol([1]), actualizarStockProducto);

// Actualizar producto (solo admin)
router.put('/actualizarProducto/:id', verificarToken, verificarRol([1]), actualizarProducto);

// Eliminar producto (solo admin)
router.delete('/eliminarProducto/:id', verificarToken, verificarRol([1]), eliminarProducto);

// Crear producto (solo admin)
router.post('/crearProducto', verificarToken, verificarRol([1]), crearProducto);

// Obtener todas las categorías
router.get('/categorias', obtenerCategorias);

module.exports = router;


