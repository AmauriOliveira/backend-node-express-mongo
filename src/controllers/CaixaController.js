const Caixa = require('../models/Caixa');

module.exports = {

    async balanco(request, response) {
        try {
            const caixaProduto = await Caixa.findOne()
            return response.json(caixaProduto).status(200);

        } catch (error) {
            return response.status(400).send({ error: 'Falha ao fazer o balanço' })
        }
    },

};