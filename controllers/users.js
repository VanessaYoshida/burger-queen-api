const models = require('../models');
const Users = models.User;
const getUsers = (req, res) => Users.findAll()
  .then(users => res.send(users));
const getUsersById = (req, res) => Users.findByPk(req.params.id)
  .then(user => {
    user ? res.send(user) : res.sendStatus(404);
  });
const postUsers = (req, res) => Users.create(req.body)
  .then(user => {
    res.status(201).send(user);
  });
const putUsers = (req, res) => Users.update({...req.body}, {where: { id: req.params.id }})
  .then(() => {
    Users
      .findByPk(req.params.id)
      .then(user => res.send(user));
  });
  const deleteUsers = (req, res) => {
  Users.destroy({where: { id: req.params.id}})
    .then(() => res.sendStatus(200));
};
module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  putUsers,
  deleteUsers
}