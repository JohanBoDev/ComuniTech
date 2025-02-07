const express = require('express');
const router = express.Router();
const { crearCheckoutSession, verPagos, obtenerIngresos, eliminarPago } = require('../controllers/pagosController');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas de pagos

router.post('/pagar',verificarToken, crearCheckoutSession); // Iniciar pago
router.get('/ObtenerPagos', verificarToken, verificarRol([1]), verPagos); // Ver pagos
router.get('/reporteIngresos', verificarToken, verificarRol([1]), obtenerIngresos); // Reporte de ingresos
router.delete('/eliminarPago/:id_pago', verificarToken, verificarRol([1]), eliminarPago); // Eliminar pago


module.exports = router;