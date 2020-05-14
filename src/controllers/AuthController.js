const User = require('../models/User');

module.exports = {
    async create(request, response) {
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
            
            return response.json(user);//refatorar
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao adcionar um novo User' })
        }

    },
};
//https://youtu.be/BN_8bCfVp88?t=862