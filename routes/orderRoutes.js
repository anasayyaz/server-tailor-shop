const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  deleteOrder,
  getOrderById,
  updateOrder
} = require('../controllers/orderController');

// Routes
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
