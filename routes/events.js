const {Router} = require('express');
const {obtenerPedidos, crearPedido, actualizarPedido, eliminarPedido } = require('../controllers/events');
const {validarJWT} = require('../middlewares/validar-jwt');
const router = Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
//puedes usar la funcion use para no tener que poner el middleware en cada ruta
// router.use(validarJWT); Si la pones debajo de una ruta, esa será publica y no pasará por el middleware pero el resto si


/* rutas

    /api/events

*/

// deben pasar por la validación del jwt
// eventos

router.use(validarJWT);

router.get('/',
    [],
    obtenerPedidos);

router.post('/',
    [ 
        check('name', 'falta el nombre del producto').not().isEmpty(),
        check('description', 'falta la descripción del producto').not().isEmpty(),
        check('price', 'falta el precio del producto').not().isEmpty(),
        //check('price', 'falta el precio del producto').isNumeric(),
        validarCampos,
    ],
    crearPedido);

router.put('/:id',
    [],
    actualizarPedido);

router.delete('/:id',
    [],
    eliminarPedido);




module.exports = router;