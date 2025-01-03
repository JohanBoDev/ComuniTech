const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require('../config/db');
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");


// Configuración de Multer para archivos temporales
const upload = multer({
  dest: "uploads/", // Carpeta temporal
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    console.log("Procesando archivo:", file.originalname);
    console.log("Tipo MIME:", file.mimetype);

    if (mimeType && extName) {
      console.log("Archivo permitido");
      return cb(null, true);
    } else {
      console.log("Archivo no permitido");
      cb(new Error("Solo se permiten archivos JPEG, JPG o PNG."));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2MB
});

// Controlador para subir foto de perfil
const subirFotoPerfil = async (req, res) => {
  const userId = req.params.id_usuario;
  console.log(`Subida de foto para el usuario con ID: ${userId}`);

  try {
    if (!req.file) {
      console.log("No se recibió ningún archivo.");
      return res.status(400).json({ message: "No se subió ningún archivo." });
    }

    console.log("Archivo recibido:", req.file);

    // Subir archivo a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "comunitech/profiles", // Carpeta en Cloudinary
    });

    const fileUrl = result.secure_url; // URL pública de Cloudinary
    console.log("Archivo subido a Cloudinary con URL:", fileUrl);

    // Guardar la URL en la base de datos
    const [dbResult] = await db.query("UPDATE usuarios SET foto_perfil = ? WHERE id_usuario = ?", [
      fileUrl,
      userId,
    ]);

    if (dbResult.affectedRows === 0) {
      console.log("Usuario no encontrado en la base de datos.");
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    console.log("URL guardada en la base de datos para el usuario:", userId);

    // Eliminar archivo temporal
    fs.unlinkSync(req.file.path);
    console.log("Archivo temporal eliminado:", req.file.path);

    res.json({
      message: "Foto de perfil subida correctamente.",
      fileUrl,
    });
  } catch (error) {
    console.error("Error al subir la foto de perfil:", error);
    res.status(500).json({ message: "Ocurrió un error al subir la foto de perfil." });
  }
};

// Controlador para obtener la información del usuario
const obtenerUsuarioPorId = async (req, res) => {
  const { id_usuario } = req.params; // Obtener el id_usuario de los parámetros de la solicitud

  try {
    // Consulta a la base de datos para obtener el usuario
    const [rows] = await db.query('SELECT id_usuario, nombre, email, foto_perfil FROM usuarios WHERE id_usuario = ?', [id_usuario]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Devolver la información del usuario
    res.json({
      message: 'Usuario obtenido correctamente.',
      usuario: rows[0],
    });
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    res.status(500).json({ message: 'Error al obtener la información del usuario.' });
  }
};

// Registrar usuario
const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el usuario en la base de datos
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    // Generar el token JWT
    const token = jwt.sign(
      { id: result.insertId, email, nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respuesta con datos del usuario y token
    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id_usuario: result.insertId,
        nombre,
        email,
      },
      token,
    });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};


const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Datos recibidos:', { email, password });

    // Buscar al usuario por email
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    console.log('Usuario encontrado:', user);

    if (user.length === 0) {
      console.log('No se encontró el usuario con ese email');
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user[0].contraseña);
    console.log('Coincidencia de contraseña:', passwordMatch);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      {
        id: user[0].id_usuario,
        email: user[0].email,
        es_admin: user[0].es_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respuesta con los datos del usuario y el token
    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id_usuario: user[0].id_usuario,
        nombre: user[0].nombre,
        email: user[0].email,
        fecha_registro: user[0].fecha_registro,
        foto_perfil: user[0].foto_perfil,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const EnviarCorreoRecuperacion = async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Verificar si el correo existe en la base de datos
    const [user] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: "El correo electrónico no está registrado." });
    }

    // 2. Generar un token seguro y definir su expiración
    const token = crypto.randomBytes(32).toString("hex");
    const expiracion = new Date(Date.now() + 60 * 60 * 1000); // Token válido por 1 hora

    // 3. Guardar el token y la expiración en la base de datos
    await db.query(
      "UPDATE usuarios SET reset_token = ?, reset_token_expira = ? WHERE email = ?",
      [token, expiracion, email]
    );

    // 4. Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "empresacomunitech@gmail.com", // Correo oficial
        pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación de Gmail
      },
    });

    // 5. Configurar el correo a enviar
    const resetLink = `http://localhost:5173/restablecer-password?token=${token}`;
    const mailOptions = {
      from: '"Soporte ComuniTech" <empresacomunitech@gmail.com>',
      to: email,
      subject: "Recuperación de Contraseña",
      html: `
          <h2>Recuperación de Contraseña</h2>
          <p>Haz clic en el siguiente enlace para restablecer tu contraseña. Este enlace es válido por 1 hora:</p>
          <a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">Restablecer Contraseña</a>
          <p>Si no solicitaste este correo, ignóralo.</p>
        `,
    };

    // 6. Enviar el correo
    await transporter.sendMail(mailOptions);

    res.json({
      message: "Se ha enviado un enlace de recuperación al correo proporcionado.",
    });
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    res.status(500).json({ message: "Ocurrió un error al procesar la solicitud." });
  }
};

const RestablecerPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // 1. Verificar si el token existe y es válido
    const [user] = await db.query(
      "SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expira > NOW()",
      [token]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "El token no es válido o ha expirado." });
    }

    // 2. Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Actualizar la contraseña y limpiar el token
    await db.query(
      "UPDATE usuarios SET contraseña = ?, reset_token = NULL, reset_token_expira = NULL WHERE id_usuario = ?",
      [hashedPassword, user[0].id_usuario]
    );

    res.json({ message: "Tu contraseña ha sido restablecida correctamente." });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).json({ message: "Ocurrió un error al restablecer la contraseña." });
  }
};

const editarUsuario = async (req, res) => {
  const { id_usuario } = req.params; // ID del usuario a actualizar
  const { nombre, email } = req.body; // Datos enviados desde el frontend

  try {
    // Validar que se envíen los datos necesarios
    if (!nombre || !email) {
      return res.status(400).json({ message: "Nombre y email son requeridos." });
    }

    // Actualizar los datos en la base de datos
    const [result] = await db.query(
      "UPDATE usuarios SET nombre = ?, email = ? WHERE id_usuario = ?",
      [nombre, email, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Ocurrió un error al actualizar el usuario." });
  }
};






module.exports = { registrarUsuario, iniciarSesion, EnviarCorreoRecuperacion, RestablecerPassword,obtenerUsuarioPorId,editarUsuario, subirFotoPerfil, upload };


