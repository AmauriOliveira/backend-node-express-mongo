const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    cod: {
        type: Number,
        require: true,
        index: true,
        unique: true
    },
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
    descricao: String,
    quantidade: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Produto", ProdutoSchema);