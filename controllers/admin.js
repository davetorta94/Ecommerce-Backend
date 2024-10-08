const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const { response } = require('express');

// Crear un producto
const crearProducto = async(req, res = response) => {
    const { name, description, price, quantity, picture } = req.body;

    try {
        // Verificar si ya existe un producto con el mismo nombre
        let producto = await Producto.findOne({ name });

        if (producto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto ya existe'
            });
        }

        // Crear una nueva instancia de Producto
        producto = new Producto(req.body);

        // Guardar el producto en la base de datos
        await producto.save();

        return res.status(201).json({
            ok: true,
            pid: producto.id,
            name: producto.name,
            description: producto.description,
            price: producto.price,
            quantity: producto.quantity,
            picture: producto.picture,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el producto'
        });
    }
};

// Eliminar un producto
const eliminarProducto = async(req, res = response) => {
    const { id } = req.params; // Obtener el ID del producto desde la URL

    try {
        // Buscar el producto por su ID
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        // Eliminar el producto
        await Producto.findByIdAndDelete(id);

        return res.status(200).json({
            ok: true,
            msg: 'Producto eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el producto'
        });
    }
};

// Editar (actualizar) un producto
const editarProducto = async(req, res = response) => {
    const { id } = req.params; // Obtener el ID del producto desde la URL
    const { name, description, price, quantity, picture } = req.body; // Datos actualizados

    try {
        // Buscar el producto por su ID
        let producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        // Actualizar los datos del producto
        const updatedProduct = {
            name,
            description,
            price,
            quantity,
            picture
        };

        // Guardar los cambios en la base de datos
        producto = await Producto.findByIdAndUpdate(id, updatedProduct, { new: true });

        return res.status(200).json({
            ok: true,
            pid: producto.id,
            name: producto.name,
            description: producto.description,
            price: producto.price,
            quantity: producto.quantity,
            picture: producto.picture,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el producto'
        });
    }
};

const loginAdmin = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        // Verificar si el usuario existe y si tiene el rol de admin
        if (!usuario || usuario.role !== 'admin') {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no autorizado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT para el administrador
        const token = await generarJWT(usuario.id, usuario.name, usuario.role);

        return res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            role: usuario.role,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

module.exports = { crearProducto, eliminarProducto, editarProducto, loginAdmin };

