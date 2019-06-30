const router = require('express').Router();
const models = require('../models');
const Orders = models.Orders;
const Users = models.User;
const Products = models.Products;
const OrderProducts = models.OrderProducts;

router.get('/', (req, res) => Orders.findAll({include: [{model: OrderProducts, include: [Products]}, Users]})
  .then(order => res.send(order))
    // const ordersList = orders.map(item => item.dataValues);
    // res.send(ordersList);
);

router.get('/:id', (req, res) => {
  Orders.findByPk(req.params.id, {include: [{model: OrderProducts, include: [Products]}, Users]})
  .then(order => {
    order ? res.send(order) : res.sendStatus(404)
  }) 
});

router.post('/', (req, res) => {
  // Orders.create(req.body)
  // .then(order => {
  //   res.status(201).send(order);
  // })
  
  Orders.create({
    status: "PENDING",
    uid: req.body.uid
  })
  .then((order) => {
    for (item of req.body.items) {
      let product = Products.findOne({
        where: {
          name: item.name
        }
      })
      console.log(product);
      product.then((p) => {
        console.log(p);
        OrderProducts.create({orderId: order.id, productId: p.id});
      } )
    }
    res.status(201).send(order);
  })
});

router.put('/:id', (req, res) => Orders.update({...req.body}, {where: { id: req.params.id }})
  .then(() => {
    Orders
      .findByPk(req.params.id)
      .then(order => res.send(order))
  })
);

router.delete('/:id', (req, res) => {
  Orders.destroy({where: { id: req.params.id}})
  .then(() => res.sendStatus(200));
});

module.exports = router;