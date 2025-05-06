const Employee = require("../models/Employee");

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// Add expense to employee
exports.addExpense = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    employee.expenses.push(req.body);
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filter employee expenses (optional logic later)
exports.getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) res.json(employee);
  else res.status(404).json({ message: "Not found" });
};
