const Produto = require('../models/Produto');

module.exports = {

    async index(request, response) {
        const { d = '' } = request.query;

        const produto = await Produto
            .find()
            .where(request.params.cod != null ?
                { cod: request.params.cod } :
                { descricao: { $regex: d, '$options': 'i' } })
            .select(request.params.cod != null ?
                '' :
                'cod descricao');//''= alls
        response.json(produto);
    },
    async create(request, response) {
        const { cod, preco, descricao, quantidade } = request.body;

        const produto = await Produto.create({
            cod,
            preco,
            descricao,
            quantidade,
        });
        return response.json(produto);
    },
    async update(request, response) {

        const { preco, quantidade } = request.body;
        // const produto 
        await Produto.updateOne({ cod: request.params.cod }, { quantidade, preco, })

        return response.status(200).send('Ok');
    },
    async delete(request, response) {
        // const produto 
        await Produto.deleteOne({ cod: request.params.cod });

        return response.status(200).send('Ok');
    }
};