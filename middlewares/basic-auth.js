// middlewares/basic-auth.js
const { response } = require('express');

// Definir la contraseña en el servidor (no en el frontend)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'defaultPassword';

const verificarPassword = (req, res = response, next) => {
    const { password } = req.body; // La contraseña debe venir en el cuerpo de la petición

    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({
            ok: false,
            msg: 'Acceso no autorizado'
        });
    }

    next(); // Continuar si la contraseña es correcta
}

module.exports = { verificarPassword };
