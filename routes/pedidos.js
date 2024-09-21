const {Router} = require('express');
const {obtenerProductos, crearPedido, actualizarPedido, eliminarPedido } = require('../controllers/pedidos');
const {validarJWT} = require('../middlewares/validar-jwt');
const router = Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
//puedes usar la funcion use para no tener que poner el middleware en cada ruta
// router.use(validarJWT); Si la pones debajo de una ruta, esa será publica y no pasará por el middleware pero el resto si




router.use(validarJWT);

router.get('/productos', obtenerProductos);

router.post('/new-order',
    [ 
        check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('price', 'El precio es obligatorio').isFloat({ min: 0 }),
        validarCampos,
    ],
    crearPedido);

router.put('/:id',
    [
        check('id', 'El ID del pedido no es válido').isMongoId(),
    ],
    actualizarPedido);

router.delete('/:id',
    [
        check('id', 'El ID del pedido no es válido').isMongoId(),
    ],
    eliminarPedido);




module.exports = router;