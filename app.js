const express = require('express');
const app = express();
const db = require('./models/index');
const jwt = require('jsonwebtoken');
const users = require('./routes/user');
const cookieParser = require('cookie-parser');
const SECRET = 'secretKey';
// const verifyToken = require('./util/token');

app.use(express.json()); 
app.use(cookieParser());

app.post('/auth', (req, res) => {
  let token = jwt.sign({
    email: req.body.email,
    password: req.body.password
  }, SECRET);
  res.cookie('access_token', token, {
    maxAge: 3600,
    httpOnly: true,
    secure: true
  })
  res.status(200).send("deu certo")
});

app.use('/', require('./routes/home'));
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/orders'));
app.use('/products', require('./routes/products'));

// app.use('/users', (req, res) => {
//   const token = req.cookies.access_token
//   try {
//     jwt.verify(token, SECRET);
//   } catch(err) {
//     res.status(400)
//   }
//   res.status(200).json(users)
// });

app.listen(8080, console.log('Servidor rodando'));
db.sequelize.sync();