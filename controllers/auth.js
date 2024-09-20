const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const {response} = require('express');

const crearUsuario = async(req, res = response) => {

    const {name, email, password} = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

         usuario = new Usuario(req.body);

        // Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar jwt

        const token = await generarJWT(usuario.id, usuario.name);


    return res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        email: usuario.email,
        password: usuario.password,
        token
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador'
        })
    }

    
}


const loginUsuario = async(req,res = response) =>{

    const {email,password} = req.body;

    try {

        let usuario = await Usuario.findOne({email});

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Confirmar contraseñas

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generar jwt

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador'
        })
    }
}

const revalidarToken = async(req,res = response) =>{


    const {uid, name} = req

    //Generar nuevo token para retornarlo en esta petición
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}







module.exports = {crearUsuario, loginUsuario, revalidarToken}