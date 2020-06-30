const Produto = require('./models/Produto');
const Kit = require('./models/Kit');

module.exports = {
    Query: {

        produtos: () => Produto.find(),
        produto: (_, { cod }) => Produto.findOne({ cod:cod }),

        Kit: () => Kit.find(),
    },
    //  Mutation: {
    //
    //  }
};