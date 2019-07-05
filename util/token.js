// const createToken = (req, res) => {
//   Users.findOne({where: {email: req.body.email}}) ?
//   teste(req, res) : console.log("Não pode")
// };

// function teste (req, res) {
//   jwt.sign({
//     email: req.body.email,
//     password: req.body.password
//   }, 'secretkey', {expiresIn: '20s'}, (err, token) => {
//     res.json({
//       token
//     })
//     return token;
//   })
// }

async function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    try {
      jwt.verify(bearerToken, req.cookies.access_token);
    } catch(err) {
      res.status(400)
    }
    let usr = await User.findOne({where : {email : protoUser.user.email}})
    if (usr) {
      return next();
    }
  }
};

// req.token = bearerToken;
// next();
// } else {
//   res.sendStatus(403);
// }
// };
module.exports = {
  verifyToken
};