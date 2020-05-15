const routes = require('express').Router();
const ProdutoController = require('./controllers/ProdutoController');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');

routes.get('/produtos/:cod?', ProdutoController.index);

routes.post('/produtos', authMiddleware, ProdutoController.create);

routes.post('/produtos_array', authMiddleware, ProdutoController.createArray);

routes.put('/produtos/:cod', authMiddleware, ProdutoController.update);

routes.delete('/produtos/:cod', authMiddleware, ProdutoController.delete);

routes.post('/register', AuthController.register);

routes.post('/authenticate', AuthController.auth);

module.exports = routes;