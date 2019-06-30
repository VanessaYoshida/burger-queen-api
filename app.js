const express = require('express');
const app = express();
const db = require('./models/index');
const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/orders'));
app.use('/products', require('./routes/products'));

app.listen(4967, console.log('Servidor rodando'));
db.sequelize.sync();