const express = require('express');
const router = express.Router();
const {
    agregarProductoCarrito,
    obtenerCarritoUsuario,
    actualizarCantidadProducto,
    eliminarProductoCarrito,
    vaciarCarritoUsuario,
    obtenerTotalCarrito
} = require('../controllers/carritoController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas del carrito
router.post('/agregarProducto/',verificarToken, agregarProductoCarrito); // Agregar producto al carrito
router.get('/obtenerCarrito/',verificarToken, obtenerCarritoUsuario); // Obtener productos del carrito
router.put('/:carrito_id',verificarToken, actualizarCantidadProducto); // Actualizar cantidad de un producto
router.delete('/vaciarCarrito/', verificarToken, vaciarCarritoUsuario); // Vaciar carrito de un usuario
router.delete('/:carrito_id',verificarToken, eliminarProductoCarrito); // Eliminar producto del carrito
router.get('/total/',verificarToken, obtenerTotalCarrito); // Obtener subtotal, impuestos y total del carrito   


module.exports = router;
