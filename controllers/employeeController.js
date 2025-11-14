const Employee = require("../models/Employee");

// Validation helper
const validateEmployeeData = (data) => {
  const errors = [];
  if (!data.name || data.name.trim() === '') {
    errors.push('نام درج کرنا ضروری ہے');
  }
  if (!data.phone || data.phone.trim() === '') {
    errors.push('موبائل نمبر درج کرنا ضروری ہے');
  }
  return errors;
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    // Validate input
    const validationErrors = validateEmployeeData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(', ') });
    }

    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    // Validate input
    const validationErrors = validateEmployeeData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(', ') });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'ملازم نہیں ملا' });
    }

    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add expense to employee
exports.addExpense = async (req, res) => {
  try {
    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).json({ message: 'خرچ کی درست رقم درج کرنا ضروری ہے' });
    }

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'ملازم نہیں ملا' });
    }

    employee.expenses.push(req.body);
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'ملازم نہیں ملا' });
    }
    res.json({ message: "ملازم کامیابی سے حذف ہو گیا" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filter employee expenses (optional logic later)
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "ملازم نہیں ملا" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
