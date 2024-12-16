const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require('../config/db');

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
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const RecuperarContraseña = async (req, res) => {
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
          pass: "whkt ziud rung cxcg", // Contraseña de aplicación de Gmail
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





module.exports = { registrarUsuario, iniciarSesion, RecuperarContraseña };


