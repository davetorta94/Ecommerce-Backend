const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid, name, role } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        req.name = name;
        req.role = role;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
};

// Middleware para verificar si es administrador
const validarAdminRole = (req, res, next) => {
    const { role } = req;

    if (role !== 'admin') {
        return res.status(403).json({
            ok: false,
            msg: 'No tienes permisos para realizar esta acción'
        });
    }

    next();
};

module.exports = { validarJWT, validarAdminRole };
