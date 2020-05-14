const routes = require('express').Router();
const ProdutoController = require('./controllers/ProdutoController');
const AuthController = require('./controllers/AuthController')

routes.get('/produtos/:cod?', ProdutoController.index);

routes.post('/produtos', ProdutoController.create);

routes.put('/produtos/:cod', ProdutoController.update);

routes.delete('/produtos/:cod', ProdutoController.delete);

routes.post('/register',AuthController.create);

module.exports = routes;