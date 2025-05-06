const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  addExpense,
  getEmployee,
  deleteEmployee 
} = require('../controllers/employeeController');

router.post('/', createEmployee);
router.get('/', getEmployees);
router.post('/:id/expense', addExpense);
router.get('/:id', getEmployee);
router.delete('/:id', deleteEmployee); // ✅ Add this line

module.exports = router;
