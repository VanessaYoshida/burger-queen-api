const router = require('express').Router();
const models = require('../models');
const Orders = models.Orders;
const Users = models.User;
const Products = models.Products;
const OrderItem = models.OrderProducts;

router.get('/', (req, res) => Products.findAll({include: [{model: OrderItem, include: [Products]}]})
  .then(product => res.send(product))
);

router.get('/:id', (req, res) => {
  Products.findByPk(req.params.id, {include: [{model: OrderItem, include: [Products]}]})
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

// router.put('/:id', (req, res) => Products.update({...req.body}, {where: { id: req.params.id }})
//   .then(() => {
//     Orders
//       .findByPk(req.params.id)
//       .then(order => res.send(order))
//   })
// );

// router.delete('/:id', (req, res) => {
//   Products.destroy({where: { id: req.params.id}})
//   .then(() => res.sendStatus(200));
// });

module.exports = router;