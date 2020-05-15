const Produto = require('../models/Produto');

module.exports = {

    async index(request, response) {
        try {
            const { n = '' } = request.query;

            const produto = await Produto
                .find()
                .where(request.params.cod != null ?
                    { cod: request.params.cod } :
                    { nome: { $regex: n, '$options': 'i' } })
                .select(request.params.cod != null ?
                    'cod preco nome descricao quantidade createdAt' :
                    'cod nome');//''= alls
            return response.json(produto);
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao pesquisar produtos' })
        }
    },
    async create(request, response) {
        try {
            const { cod, preco, nome, descricao, quantidade } = request.body;

            if (await Produto.findOne({ cod })) {
                return response.status(400).send({ error: 'Falha: Cod já existe' })
            }
            if (await Produto.findOne({ nome })) {
                return response.status(400).send({ error: 'Falha: Produto com este nome já existe' })
            }
            const produto = await Produto.create({
                cod,
                preco,
                nome,
                descricao,
                quantidade,
            });
            return response.json(produto);
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao adcionar um novo produto' })
        }
    },
    async createArray(request, response) {
        try {
            const produto = await Produto.insertMany(request.body, function (error, docs) { });

            return response.json(produto);
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao adcionar um array de produtos' })
        }
    },
    async update(request, response) {
        try {
            const { preco, quantidade, nome, descricao } = request.body;

            await Produto.updateOne({ cod: request.params.cod }, { quantidade, preco, nome, descricao, createdAt: Date.now() })

            return response.status(200).send('Ok');
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao alterar um produto' })
        }
    },
    async delete(request, response) {
        try {

            await Produto.deleteOne({ cod: request.params.cod });

            return response.status(200).send('Ok');
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao apagar um produto' })
        }
    }
};