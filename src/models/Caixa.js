//const mongoose = require('mongoose');
const mongoose = require('../database');

const CaixaSchema = new mongoose.Schema({
    valor: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Caixa", CaixaSchema);