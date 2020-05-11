const routes = require('express').Router();
const ProdutoController = require('./controllers/ProdutoController');

routes.get('/produtos/:cod?', ProdutoController.index);

routes.post('/produtos', ProdutoController.create);

routes.put('/produtos/:cod', ProdutoController.update);

routes.delete('/produtos/:cod', ProdutoController.delete);

module.exports = routes;