require('dotenv').config();

const express = require('express');
var cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');


const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('API Online'));