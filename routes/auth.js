const {Router} = require('express');
const router = Router()
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt')


router.post('/new', 
[
    //middlewares
    check('name','El nombre es obligatorio').not().isEmpty(), //salta esto si no esta el nombre y si está vacio. 
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] 
,crearUsuario);

router.post('/', [
    validarCampos
]
,loginUsuario);

router.get('/renew', validarJWT, revalidarToken);




module.exports = router;