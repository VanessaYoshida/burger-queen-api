const router = require('express').Router();
const Order = require('../controllers/orders');

router.get('/', Order.getOrders);
router.get('/:id', Order.getOrdersById);
router.post('/', Order.postOrders);
router.put('/:id', Order.putOrders);
router.delete('/:id', Order.deleteOrders);

module.exports = router;