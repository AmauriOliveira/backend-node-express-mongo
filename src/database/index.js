const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    }
);
//mongoose.Promise: global.Promise;

module.exports = mongoose;