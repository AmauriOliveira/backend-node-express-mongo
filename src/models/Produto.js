const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    cod: Number,
    preco: Number,
    descricao: String,
    quantidade: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Produto", ProdutoSchema);