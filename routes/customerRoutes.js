const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  getCustomerByPhone,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');

router.post('/', createCustomer);
router.get('/', getCustomers);
router.get('/phone/:phone', getCustomerByPhone);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
