const router = require('express').Router();
const models = require('../models');
const Products = models.Products;

router.get('/', (req, res) => Products.findAll({
  attributes: { exclude: ['createdAt', 'updatedAt'] } 
})
.then(product => res.send(product))
);

router.get('/:id', (req, res) => {
  Products.findByPk(req.params.id, { 
    attributes: { exclude: ['createdAt', 'updatedAt'] } 
  })
  .then(product => {
    product ? res.send(product) : res.sendStatus(404)
  }) 
});

router.post('/', (req, res) => {
  Products.create(req.body)
  .then(order => {
    res.status(201).send(order);
  })
});

router.put('/:id', (req, res) => Products.update({...req.body}, {where: { id: req.params.id }})
.then(() => {
  Products
  .findByPk(req.params.id)
  .then(order => res.send(order))
})
);

router.delete('/:id', (req, res) => {
  Products.destroy({where: { id: req.params.id}})
  .then(() => res.sendStatus(200));
});

module.exports = router;