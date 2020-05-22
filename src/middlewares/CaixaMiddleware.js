const Caixa = require('../models/Caixa');

module.exports = {

    async AddProduto(request, response) {
        try {
            const { preco, quantidade } = request.body;

            const caixaProduto = await Caixa
                .findOne()
                .select('valorProduto');

            if (Object.keys(caixaProduto).length === 0) {

                await Caixa.create({ valorProduto: preco * quantidade });

            } else {
                await Caixa.updateOne({ _id: caixaProduto._id }, { valorProduto: caixaProduto.valorProduto + (preco * quantidade), createdAt: Date.now() })
            }

            return response.status(201).send('ok');

        } catch (error) {

            return response.status(400).send({ error: 'Falha ao registras o valor do produtos no caixa.' });
        }
    },

    async UpdateProduto(request, response) {
        try {
            const { preco, quantidade } = request.body;

            const caixaProduto = await Caixa
                .findOne()
                .select('valorProduto');

            await Caixa.updateOne({
                _id: caixaProduto._id
            },
                {
                    valorProduto: caixaProduto.valorProduto + (preco * quantidade) - response.oldValor,
                    createdAt: Date.now()
                });

            return response.status(201).send('ok');

        } catch (error) {

            return response.status(400).send({ error: 'Falha ao registras o valor do produtos no caixa.' });
        }
    },

    /////////////////

    async AddKit(request, response) {
        try {
            const { preco, quantidade } = request.body;

            const caixaKit = await Caixa
                .findOne()
                .select('valorKit');

            if (Object.keys(caixaKit).length === 0) {

                await Caixa.create({ valorKit: preco * quantidade, createdAt: Date.now() });

            } else {
                await Caixa.updateOne({ _id: caixaKit._id },
                    {
                        valorKit: caixaKit.valorKit + (preco * quantidade),
                        createdAt: Date.now()
                    });
            }

            return response.status(201).send('ok');

        } catch (error) {

            return response.status(400).send({ error: 'Falha ao registras o valor do kits no caixa.' });
        }
    },
    async UpdateKit(request, response) {
        try {
            const { preco, quantidade } = request.body;

            const caixaKit = await Caixa
                .findOne()
                .select('valorKit');

            await Caixa.updateOne({ _id: caixaKit._id },
                {
                    valorKit: caixaKit.valorKit + (preco * quantidade) - response.oldValor,
                    createdAt: Date.now()
                });

            return response.status(201).send('ok');

        } catch (error) {

            return response.status(400).send({ error: 'Falha ao registras o valor do produtos no caixa.' });
        }
    },

};