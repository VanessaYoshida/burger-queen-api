const express = require('express');
const app = express();
const db = require('./models/index');
const jwt = require('jsonwebtoken');
const verifyToken = require('./util/token');
const models = require('./models');
const Users = models.User;

app.use(express.json()); 
app.post('/auth',verifyToken, (req, res) => {
  Users.findOne({where: {email: req.body.email}}) ?
  teste(req, res) : console.log("Não pode")
});
app.use('/', verifyToken, require('./routes/home'));
app.use('/users', verifyToken, require('./routes/user'));
app.use('/orders', verifyToken, require('./routes/orders'));
app.use('/products', verifyToken, require('./routes/products'));


function teste (req, res) {
  jwt.sign({
    email: req.body.email,
    password: req.body.password
  }, 'secretkey', {expiresIn: '30s'}, (err, token) => {
    res.json({
      token
    })
    localStorage.setItem('token', token);
  })
}

app.listen(8080, console.log('Servidor rodando'));
db.sequelize.sync();