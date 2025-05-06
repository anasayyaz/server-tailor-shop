const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now },
});

const employeeSchema = new mongoose.Schema({
  name: String,
  phone: String,
  cnic: String,
  expenses: [expenseSchema],
});

module.exports = mongoose.model('Employee', employeeSchema);
