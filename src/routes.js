const routes = require('express').Router();

routes.get('/', async (req, res) => {
    res.json({hello: 'world'});
});

module.exports = routes;