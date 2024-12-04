const express = require('express');
const router = express.Router();
const { iniciarPago, confirmarPago } = require('../controllers/pagosController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas de pagos

router.post('/iniciarPago',verificarToken, iniciarPago); // Iniciar pago
router.post('/confirmarPago',verificarToken, confirmarPago); // Confirmar pago

module.exports = router;