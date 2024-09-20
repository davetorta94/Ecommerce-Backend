const { Schema, model} = require('mongoose');

const ProductoSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

ProductoSchema.method('toJSON', function() {
    const {__v,_id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('pedido', ProductoSchema);