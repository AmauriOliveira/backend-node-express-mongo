const User = require('../models/Caixa');
const Kit = require('../models/Kit');
const Produto = require('../models/Produto');

module.exports = {

    async balanco(request, response) {
        try {
            var valorKit = 0;
            var valorProduto = 0;

            const balancoKit = await Kit
                .find()
                .select('preco quantidade');
            for (balKit of balancoKit) {
                valorKit += balKit.quantidade * balKit.preco;
            };

            const balancoProduto = await Produto
                .find()
                .select('preco quantidade');
            for (balProduto of balancoProduto) {
                valorProduto += balProduto.quantidade * balProduto.preco;
            };

            return response.json({
                'kit': valorKit,
                'produto': valorProduto,
                'total': valorProduto + valorKit
            });

        } catch (error) {
            return response.status(400).send({ error: 'Falha ao fazer o balanço' })
        }
    },

};