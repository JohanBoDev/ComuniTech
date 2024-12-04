const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); // El cliente debe enviar "Bearer <token>"

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token válido.' });
    }

    const token = authHeader.split(' ')[1]; // Obtener solo el token
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Formato de token incorrecto.' });
    }

    try {
        // Verificar el token
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado; // Agrega los datos del usuario decodificados al objeto `req`
        next(); // Continua al siguiente middleware o controlador
    } catch (error) {
        console.error('Error al verificar el token:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: 'El token ha expirado.' });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ mensaje: 'Token no válido.' });
        }

        res.status(500).json({ mensaje: 'Error en la autenticación.' });
    }
};


const verificarRol = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const usuario = req.usuario; // Usuario extraído del token JWT

        if (!usuario) {
            return res.status(401).json({ mensaje: 'No estás autenticado.' });
        }

        // Verifica si el rol del usuario está permitido
        if (!rolesPermitidos.includes(usuario.es_admin)) {
            return res.status(403).json({ mensaje: 'No tienes los permisos necesarios.' });
        }

        next(); // Continúa si el usuario tiene un rol permitido
    };
};



module.exports = {
    verificarToken,
    verificarRol
};