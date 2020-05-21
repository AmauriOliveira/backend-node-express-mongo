const Caixa = require('../models/Caixa');

module.exports = {

    async AddProduto(request, response) {
        try {
            const { preco, quantidade } = request.body;

            const caixaProduto = await Caixa
                .findOne()
                .select('valorKit');

            if (Object.keys(caixaProduto).length === 0) {

                await Caixa.create({ valorProduto: preco * quantidade });

            } else {
                await Caixa.updateOne({ _id: caixaProduto._id }, { valorProduto: caixaProduto.valorProduto + (preco * quantidade), createdAt: Date.now() })
            }

            return response.status(201).send('ok');
            
        } catch (error) {

            return response.status(400).send(error);
        }
    },

    /////////////////
    
    async AddProduto(request, response) {
        try {
            const { preco, quantidade } = request.body;

            const caixaProduto = await Caixa
                .findOne()
                .select('valorKit');

            if (Object.keys(caixaProduto).length === 0) {

                await Caixa.create({ valorKit: preco * quantidade });

            } else {
                await Caixa.updateOne({ _id: caixaProduto._id }, { valorKit: caixaProduto.valorKit + (preco * quantidade), createdAt: Date.now() })
            }

            return response.status(201).send('ok');

        } catch (error) {

            return response.status(400).send(error);
        }
    },

};