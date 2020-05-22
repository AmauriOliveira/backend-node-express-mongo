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
                    '' : ' nome preco quantidade produtos')//''= alls */ 
                .populate(request.params.id != null ? 'produtos' : null);
            return response.json(kit);
        } catch (error) {
            return response.status(400).send({ error: 'Falha ao pesquisar kit' })
        }
    },

    async create(request, response, next) {
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
                await Produto.findByIdAndUpdate(produto._id, {

                    $push: { "kits": [kit._id] }
                }, {
                    new: true
                });
                kit.produtos.push(prod);//marca o produto no kit
            }));

            await kit.save();

            return next();

        } catch (error) {
            console.log(error);

            return response.status(400).send({ error: 'Falha ao adcionar um novo kit' })
        }
    },

    async update(request, response) {
        try {
            const { preco, nome, quantidade } = request.body;

            const valor = await Kit.findOne()
                .where({ _id: request.params.id })
                .select('preco quantidade');

            if (Object.keys(valor).length === 0) {

                return response.status(400).send({ error: 'Falha' });
            }
            response.oldValor = valor.quantidade * valor.preco;

            const kit = await Kit.findByIdAndUpdate(request.params.id, {
                preco,
                nome,
                quantidade,
            }, {
                new: true
            });

            /////////////////clean
            const { produtos } = await Kit
                .findOne({ _id: request.params.id });

            for (prod of produtos) {
                await Produto.findByIdAndUpdate(prod, {
                    $pull: { "kits": request.params.id }
                }, {
                    new: true
                });
            };
            kit.produtos = [];//reseta
            //////////////////////add
            await Promise.all(request.body.produtos.map(async produto => {
                const prod = await Produto.findById(produto._id);//busca o kit pelo ID
                await Produto.findByIdAndUpdate(produto._id, {
                    $push: { "kits": request.params.id }
                }, {
                    new: true
                });
                kit.produtos.push(prod);//marca o produto no kit
            }));

            await kit.save();

            return response.json(kit);
        } catch (error) {
            console.log(error);
            return response.status(400).send({ error: 'Falha ao alterar um kit' })
        }
    },

    async delete(request, response) {
        try {

            const { produtos } = await Kit
                .findOne({ _id: request.params.id });

            for (prod of produtos) {
                await Produto.findByIdAndUpdate(prod, {
                    $pull: { "kits": request.params.id }
                }, {
                    new: true
                });
            };

            await Kit.deleteOne({ _id: request.params.id });

            return response.status(200).send('Ok');
        } catch (error) {
            console.log(error);
            return response.status(400).send({ error: 'Falha ao apagar um produto' })
        }
    }
};