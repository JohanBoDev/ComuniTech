const express = require('express');
const router = express.Router();
const { obtenerTodosProductos, obtenerCategorias, obtenerProductosPaginados, crearProducto, actualizarProducto, eliminarProducto, obtenerProductoPorId, obtenerProductoPorNombre, obtenerProductosPorCategoria, actualizarStockProducto, agregarProductoFavorito, obtenerProductosFavoritos, eliminarProductoFavorito } = require('../controllers/productosController');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas del CRUD de productos

// ADMINISTRADOR
router.post('/crearProducto', verificarToken, verificarRol([1]), crearProducto);
router.put('/actualizarStockProducto/:id', verificarToken, verificarRol([1]), actualizarStockProducto);
router.put('/actualizarProducto/:id', verificarToken, verificarRol([1]), actualizarProducto);
router.delete('/eliminarProducto/:id', verificarToken, verificarRol([1]), eliminarProducto);

// PRODUCTOS
router.get('/todos', obtenerTodosProductos);
router.get('/obtenerCategorias', obtenerCategorias);
router.get('/paginados', obtenerProductosPaginados);
router.get('/nombre/:nombre', obtenerProductoPorNombre);
router.get('/categoria/:nombreCategoria', obtenerProductosPorCategoria);
router.get('/:id', obtenerProductoPorId);

// FAVORITOS
router.post('/agregarFavorito/:id', verificarToken, agregarProductoFavorito);
router.get('/favoritos/:id_usuario', verificarToken, obtenerProductosFavoritos);
router.delete('/eliminarFavorito/:id', verificarToken, eliminarProductoFavorito);

module.exports = router;
