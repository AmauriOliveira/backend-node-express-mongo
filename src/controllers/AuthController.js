const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonWT = require('jsonwebtoken');

function generateToken(params = {}) {
    return jsonWT.sign({ params }, process.env.SECRET_MD5, { expiresIn: 86400 });
}

module.exports = {

    async register(request, response) {
        try {
            const { nome, email, senha } = request.body;

            if (await User.findOne({ email })) {
                return response.status(400).send({ error: 'Falha: Email já existe' })
            }

            const user = await User.create({
                nome,
                email,
                senha
            });
            user.senha = undefined;

            return response.send({ user, token: generateToken({ id: user.id }), });

        } catch (error) {
            return response.status(400).send({ error: 'Falha ao adcionar um novo User' })
        }
    },
    async auth(request, response) {
        try {
            const { email, senha } = request.body;

            const user = await User.findOne({ email }).select('+senha');

            if (!user) {
                return response.status(400).send({ error: 'Erro: Login Failed' });
            }

            if (!await bcrypt.compare(senha, user.senha)) {
                return response.status(400).send({ error: 'Erro: Login Failed' });
            }

            user.senha = undefined;

            return response.send({ user, token: generateToken({ id: user.id }), });

        } catch (error) {
            return response.status(400).send({ error: 'Falha ao fazer login, tente novamente' })
        }
    },
};