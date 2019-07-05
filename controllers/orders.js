const models = require('../models');
const Orders = models.Orders;
const Users = models.User;
const Products = models.Products;
const OrderItem = models.OrderProducts;

const getOrders = (req, res) => Orders.findAll(
  {
    include: [{model: OrderItem,
    include: [Products]}, Users]
  })
  .then(order => res.send(order));
const getOrdersById = (req, res) => {
  Orders.findByPk(req.params.id, 
    {
      include: [{model: OrderItem,
      include: [Products]}, Users]
    })
    .then(order => {
      order ? res.send(order) : res.sendStatus(404);
    }); 
};
const postOrders = (req, res) => {  
  Orders.create({
    status: 'PENDING',
    uid: req.body.uid
  })
    .then((order) => {
      for (item of req.body.items) {
        Products.findOne({
          where: {
            name: item.name
          }
        })
          .then((product) => {
            OrderItem.create({orderId: order.id,
              productId: product.id});
          });
      }
      res.status(201).send(order);
    });
};
const putOrders = (req, res) => Orders.update({...req.body}, {where: { id: req.params.id }})
  .then(() => {
    Orders
      .findByPk(req.params.id)
      .then(order => res.send(order));
  });
const deleteOrders = (req, res) => {
  Orders.destroy({where: { orderId: req.params.id}});
  Orders.destroy({where: { id: req.params.id}})
    .then(() => res.sendStatus(200));
};
module.exports = {
  getOrders,
  getOrdersById,
  postOrders,
  putOrders,
  deleteOrders
}