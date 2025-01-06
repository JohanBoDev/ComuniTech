const express = require('express');
const router = express.Router();
const { crearDireccion, obtenerDirecciones, actualizarDireccion, eliminarDireccion, seleccionarDireccionParaPedido, obtenerDireccionPorId } = require('../controllers/direccionController');
const { verificarToken } = require('../middlewares/authMiddleware');



// Endpoint para crear una nueva dirección
router.post('/crearDireccion', verificarToken, crearDireccion);
router.get('/obtenerDirecciones', verificarToken, obtenerDirecciones);
router.put('/actualizarDireccion/:id_direccion', verificarToken, actualizarDireccion);
router.delete('/eliminarDireccion/:id_direccion', verificarToken, eliminarDireccion);
router.put('/seleccionarDireccion', verificarToken, seleccionarDireccionParaPedido);
router.get('/obtenerDireccion/:id_direccion', verificarToken, obtenerDireccionPorId);

module.exports = router;
