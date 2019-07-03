const express = require('express');
const app = express();
const db = require('./models/index');
const jwt = require('jsonwebtoken');

app.use(express.json()); 
app.use('/', verifyToken, require('./routes/home'));
app.use('/users', verifyToken, require('./routes/user'));
app.use('/orders', verifyToken, require('./routes/orders'));
app.use('/products', verifyToken, require('./routes/products'));
app.post('/auth',verifyToken, (req, res) => {
  jwt.sign({
    email: req.body.email,
    password: req.body.password
  }, 'secretkey', {expiresIn: '30s'}, (err, token) => {
    res.json({
      token
    })
    localStorage.setItem('token', token);
  });
})

function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== "undefined"){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(8080, console.log('Servidor rodando'));
db.sequelize.sync();