const routes = require('express').Router();

const Produto = require('./models/Produto');

routes.get('/produtos/:cod?', async (req, res) => {

    const produto = await Produto
        .find()
        .where(req.params.cod != null ? { cod: req.params.cod } : {})
        .select(req.params.cod != null ? '' : 'cod descricao');//''= alls
    res.json(produto);
});

routes.post('/produtos', async (req, res) => {

    const { cod, preco, descricao, quantidade } = req.body;

    const produto = await Produto.create({
        cod,
        preco,
        descricao,
        quantidade,
    });
    return res.json(produto);
});

routes.put('/produtos/:cod', async (req, res) => {

    const { preco, quantidade } = req.body;
    // const produto 
    await Produto.updateOne({ cod: req.params.cod }, { quantidade, preco, })

    return res.status(200).send('Ok');
});

routes.delete('/produtos/:cod', async (req, res) => {
    // const produto 
    await Produto.deleteOne({ cod: req.params.cod });

    return res.status(200).send('Ok');
});

module.exports = routes;