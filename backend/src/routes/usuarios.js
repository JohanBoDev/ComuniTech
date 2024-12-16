const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion, RecuperarContraseña } = require('../controllers/usuariosController');

// Ruta para registrar usuarios
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Ruta para recuperar contraseña
router.post('/recuperar-contraseña', RecuperarContraseña);

module.exports = router;
