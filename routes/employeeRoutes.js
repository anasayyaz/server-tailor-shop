const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  addExpense,
  getEmployee,
  deleteEmployee,
  updateEmployee
} = require('../controllers/employeeController');

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.put('/:id', updateEmployee);
router.post('/:id/expense', addExpense);
router.delete('/:id', deleteEmployee);

module.exports = router;
