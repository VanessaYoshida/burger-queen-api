const express = require('express');
const app = express();
const db = require('./models/index');
const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/', function(req, res) {
  res.json(
    {
      'name': 'burger-queen-api',
      'version': '1.0.0'
    }
  )
});
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/orders'));
app.use('/products', require('./routes/products'));

app.listen(8080, console.log('Servidor rodando'));
db.sequelize.sync();