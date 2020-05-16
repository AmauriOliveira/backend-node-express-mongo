const Kit = require('../models/Kit');
const Produto = require('../models/Produto');

module.exports = {

    async index(request, response) {
        try {
            const { n = '' } = request.query;
            const kit = await Kit
                .find() // pegue
                .where(request.params.id != null ?
                    { _id: request.params.id } ://se o id não for null
                    { nome: { $regex: n, '$options': 'i' } }) //se o id for null
                .select(request.params.id != null ?
                    '' : ' nome preco quantidade')//''= alls */ 
                .populate('produtos');
            return response.json(kit);
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao pesquisar kit' })
        }
    },

    async create(request, response) {
        try {
            const { preco, nome, produtos, quantidade } = request.body;

            if (await Kit.findOne({ nome })) {
                return response.status(400).send({ error: 'Falha: Kit já existe' })
            }
            const kit = await Kit.create({
                preco,
                nome,
                quantidade,
            });
            await Promise.all(produtos.map(async produto => {
                const prod = await Produto.findById(produto._id);//busca o kit pelo ID
                kit.produtos.push(prod);//marca o produto no kit
            }));

            await kit.save();

            return response.json(kit);
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao adcionar um novo kit' })
        }
    },

    async update(request, response) {
        try {
            const { preco, nome, produtos, quantidade } = request.body;

            const kit = await Kit.findByIdAndUpdate(request.params.id, {
                preco,
                nome,
                quantidade,
            }, {
                new: true
            });
            kit.produtos = [];//reseta

            await Promise.all(produtos.map(async produto => {
                const prod = await Produto.findById(produto._id);//busca o kit pelo ID
                kit.produtos.push(prod);//marca o produto no kit
            }));

            await kit.save();

            return response.json(kit);
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao alterar um kit' })
        }
    },

    async delete(request, response) {
        try {

            await Kit.deleteOne({ _id: request.params.id });

            return response.status(200).send('Ok');
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao apagar um produto' })
        }
    }
};