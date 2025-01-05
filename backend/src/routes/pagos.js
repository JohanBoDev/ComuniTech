const express = require('express');
const router = express.Router();
const { crearCheckoutSession } = require('../controllers/pagosController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas de pagos

router.post('/pagar',verificarToken, crearCheckoutSession); // Iniciar pago



module.exports = router;