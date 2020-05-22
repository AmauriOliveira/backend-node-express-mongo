const routes = require('express').Router();
const ProdutoController = require('./controllers/ProdutoController');
const KitController = require('./controllers/KitController');
const AuthController = require('./controllers/AuthController');
const CaixaController = require('./controllers/CaixaController');
const authMiddleware = require('./middlewares/auth');
const CaixMid = require('./middlewares/CaixaMiddleware');

////////////////////////

routes.get('/produtos/:cod?', ProdutoController.index);

routes.post('/produtos', authMiddleware, ProdutoController.create, CaixMid.AddProduto);

routes.post('/produtos_array', authMiddleware, ProdutoController.createArray);

routes.put('/produtos/:cod', authMiddleware, ProdutoController.update,CaixMid.UpdateProduto);

routes.delete('/produtos/:cod', authMiddleware, ProdutoController.delete);

////////////////////////

routes.post('/register', AuthController.register);

routes.post('/authenticate', AuthController.auth);

////////////////////

routes.get('/kit/:id?', KitController.index);

routes.post('/kit', authMiddleware, KitController.create, CaixMid.AddKit);

routes.put('/kit/:id', authMiddleware, KitController.update);

routes.delete('/kit/:id', authMiddleware, KitController.delete);

////////////////////

routes.get('/balance', authMiddleware, CaixaController.balanco);

module.exports = routes;