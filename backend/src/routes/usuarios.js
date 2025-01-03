const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion, EnviarCorreoRecuperacion, RestablecerPassword, subirFotoPerfil, upload } = require('../controllers/usuariosController');

// Ruta para registrar usuarios
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Ruta para enviar correo de recuperación
router.post('/correo-recuperar', EnviarCorreoRecuperacion);

// Ruta para restablecer la contraseña
router.post('/recuperar-password', RestablecerPassword);

// Endpoint para subir la foto de perfil
router.post("/:id_usuario/foto", upload.single("fotoPerfil"), subirFotoPerfil);

module.exports = router;
