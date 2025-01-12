const express = require('express');
const router = express.Router();
const { registrarUsuario,
     iniciarSesion, 
     EnviarCorreoRecuperacion, 
     RestablecerPassword, 
     obtenerUsuarioPorId, 
     editarUsuario,
     subirFotoPerfil,
     obtenerUsuarios,
     crearUsuario,
     editarUsuarioAdmin,
     eliminarUsuario,
      upload } = require('../controllers/usuariosController');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

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

// Endpoint para obtener un usuario por ID
router.get("/:id_usuario", obtenerUsuarioPorId);

// Ruta para editar usuario
router.put("/:id_usuario", editarUsuario);

//admin
// Ruta para obtener todos los usuarios
router.get("/",verificarToken,verificarRol([1]), obtenerUsuarios);

//ruta para crear usuario
router.post("/crear",verificarToken,verificarRol([1]), crearUsuario);

//ruta para editar usuario
router.put("/editar/:id_usuario",verificarToken,verificarRol([1]), editarUsuarioAdmin);

//ruta para eliminar usuario
router.delete("/eliminar/:id_usuario",verificarToken,verificarRol([1]), eliminarUsuario);


module.exports = router;
