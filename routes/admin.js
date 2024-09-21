const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, editarProducto, eliminarProducto, loginAdmin } = require('../controllers/admin');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole } = require('../middlewares/validar-jwt'); // Middlewares

const router = Router();

// Crear producto
router.post('/new', 
[
    validarJWT,           // Verifica que el token sea válido
    validarAdminRole,      // Verifica que el usuario tenga el rol de admin
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('price', 'El precio es obligatorio').isFloat({ min: 0 }),
    check('quantity', 'La cantidad debe ser mayor o igual a 0').isInt({ min: 0 }),
    validarCampos
], 
crearProducto);

// Editar producto
router.put('/:id', 
[
    validarJWT,
    validarAdminRole,  // Solo admin puede editar productos
    check('name', 'El nombre del producto es obligatorio').optional().not().isEmpty(),
    check('description', 'La descripción es obligatoria').optional().not().isEmpty(),
    check('price', 'El precio debe ser válido').optional().isFloat({ min: 0 }),
    check('quantity', 'La cantidad debe ser mayor o igual a 0').optional().isInt({ min: 0 }),
    validarCampos
], 
editarProducto);

// Eliminar producto
router.delete('/:id', 
[
    validarJWT,
    validarAdminRole,  // Solo admin puede eliminar productos
], 
eliminarProducto);

// Login del Administrador
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginAdmin);

module.exports = router;


