require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();


mongoose.connect("mongodb://localhost:27017/produtos",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(routes);

app.listen(process.env.PORT || 3000);