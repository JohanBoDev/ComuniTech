const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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



module.exports = { registrarUsuario, iniciarSesion };
