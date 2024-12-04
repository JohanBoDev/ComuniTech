const express = require('express');
const router = express.Router();
const { obtenerPedidos, obtenerDetallesPedido, actualizarEstadoPedido, obtenerTodosLosPedidos,obtenerDetallesPedidoAdmin, filtrarPedidos } = require('../controllers/pedidosController');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');



router.get('/obtenerPedidos', verificarToken, obtenerPedidos);
router.get('/obtenerDetallesPedido/:id', verificarToken, obtenerDetallesPedido);
router.put('/actualizarEstadoPedido', verificarToken, verificarRol([1]), actualizarEstadoPedido);
router.get("/todos", verificarToken, verificarRol([1]), obtenerTodosLosPedidos);
router.get("/detallesAdmin/:id", verificarToken, verificarRol([1]), obtenerDetallesPedidoAdmin);
router.get("/filtrar", verificarToken, verificarRol([1]), filtrarPedidos);


module.exports = router;