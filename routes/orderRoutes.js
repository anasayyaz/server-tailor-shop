const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  deleteOrder,
  getOrderById // 👈 add this
} = require('../controllers/orderController');

// Routes
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById); // 👈 add this new route
router.delete('/:id', deleteOrder); // ✅ Add this

module.exports = router;
