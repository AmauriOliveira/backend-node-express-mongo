const Produto = require('../models/Produto');

module.exports = {

    async index(request, response) {
        const { n = '' } = request.query;

        const produto = await Produto
            .find()
            .where(request.params.cod != null ?
                { cod: request.params.cod } :
                { nome: { $regex: n, '$options': 'i' } })
            .select(request.params.cod != null ?
                '' :
                'cod nome');//''= alls
        response.json(produto);
    },
    async create(request, response) {
        const { cod, preco, nome, descricao, quantidade } = request.body;

        const produto = await Produto.create({
            cod,
            preco,
            nome,
            descricao,
            quantidade,
        });
        return response.json(produto);
    },
    async update(request, response) {

        const { preco, quantidade, nome, descricao } = request.body;
        // const produto 
        await Produto.updateOne({ cod: request.params.cod }, { quantidade, preco, nome, descricao })

        return response.status(200).send('Ok');
    },
    async delete(request, response) {
        // const produto 
        await Produto.deleteOne({ cod: request.params.cod });

        return response.status(200).send('Ok');
    }
};