const Usuario = require('../models/usuario');
const Pedido = require('../models/producto');
const {response} = require('express');


const obtenerProductos = async(req, res = response) => {
    try {
        const productos = await Producto.find();

        res.json({
            ok: true,
            productos: productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los productos'
        });
    }
}


const crearPedido = async(req, res = response) => {
    
    const pedido = new Pedido(req.body);

    try {

        pedido.user = req.uid;
        const pedidoGuardado = await pedido.save();

        res.json({
            ok: true,
            msg: "pedido creado",
            pedido: pedidoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
    
   
}

const actualizarPedido = async(req, res = response) => {

    const pedidoId = req.params.id;
    const uid = req.uid;

    try {

        const pedido = await Pedido.findById( pedidoId);

        if(!pedido){
           return res.status(404).json({
                ok: false,
                msg: "Pedido con ese ID no existe"
            })
        }

        if(pedido.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para editar este pedido"
            });
        }

        const nuevoPedido = {
            ...req.body,
            user: uid
        }

        const pedidoActualizado = await Pedido.findByIdAndUpdate(pedidoId, nuevoPedido, { new: true });

        res.json({
            ok: true,
            pedido: pedidoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }

}

const eliminarPedido = async(req, res = response) => {

    const pedidoId = req.params.id;
    const uid = req.uid;

    try {
        
        const pedido = await Pedido.findById(pedidoId);

        if(!pedido){
            return res.status(404).json({
                ok: false,
                msg: "Pedido con ese ID no existe"
            });
        }

        if(pedido.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar este pedido"
            });
        }

        await Pedido.findByIdAndDelete(pedidoId);

        res.json({
            ok: true
        });



        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
    
}

module.exports = {
    obtenerProductos,
    crearPedido,
    actualizarPedido,
    eliminarPedido
}