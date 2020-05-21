//const mongoose = require('mongoose');
const mongoose = require('../database');

const CaixaSchema = new mongoose.Schema({
    valorKit: {
        type: Number,
        default: 0
    },
    valorProduto: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Caixa", CaixaSchema);