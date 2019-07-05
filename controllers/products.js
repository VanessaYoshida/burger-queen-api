const models = require('../models');
const Products = models.Products;
const getProducts = (req, res) => Products.findAll(
  {
    attributes: { exclude: ['createdAt', 'updatedAt'] } 
  })
  .then(product => res.send(product));
const getProductsById = (req, res) => {
  Products.findByPk(req.params.id, 
  { 
    attributes: { exclude: ['createdAt', 'updatedAt'] } 
  })
  .then(product => {
    product ? res.send(product) : res.sendStatus(404);
  }); 
};
const postProducts = (req, res) => {
  Products.create(req.body)
    .then(order => {
      res.status(201).send(order);
    });
};
const putProducts = (req, res) => Products.update({...req.body}, {where: { id: req.params.id }})
  .then(() => {
    Products
      .findByPk(req.params.id)
      .then(order => res.send(order));
  });
const deleteProducts = (req, res) => {
  Products.destroy({where: { id: req.params.id}})
    .then(() => res.sendStatus(200));
};
module.exports = {
  getProducts,
  getProductsById,
  postProducts,
  putProducts,
  deleteProducts
}