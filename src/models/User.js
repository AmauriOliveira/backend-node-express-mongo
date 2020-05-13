const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        index: true,
        unique: true
    },
    senha: {
        type: String,
        require: true,
        select: false
    },
     createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", UserSchema);