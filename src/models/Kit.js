const mongoose = require('../database');

const KitSchema = new mongoose.Schema({

    preco: {
        type: Number,
        require: true,
    },
    nome: {
        type: String,
        require: true,
        lowercase: true,
        index: true,
        unique: true
    },
    produtos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
       // require: true
    }],
    quantidade: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Kit", KitSchema);