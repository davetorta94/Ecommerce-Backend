const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearProducto, editarProducto, eliminarProducto } = require('../controllers/producto');
const { verificarPassword } = require('../middlewares/basic-auth');

const router = Router();

// Ruta para crear un producto
router.post('/new', 
[
    verificarPassword, // Verificar contraseña antes de permitir acceso
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('price', 'El precio es obligatorio').isFloat({ min: 0 }),
    check('quantity', 'La cantidad debe ser mayor o igual a 0').isInt({ min: 0 }),
    validarCampos
], 
crearProducto);

// Ruta para editar un producto
router.put('/:id', 
[
    verificarPassword,
    check('name', 'El nombre del producto es obligatorio').optional().not().isEmpty(),
    check('description', 'La descripción es obligatoria').optional().not().isEmpty(),
    check('price', 'El precio debe ser válido').optional().isFloat({ min: 0 }),
    check('quantity', 'La cantidad debe ser mayor o igual a 0').optional().isInt({ min: 0 }),
    validarCampos
],
editarProducto);

// Ruta para eliminar un producto
router.delete('/:id', verificarPassword, eliminarProducto);

module.exports = router;

