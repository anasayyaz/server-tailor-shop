const Employee = require("../models/Employee");

// Validation disabled: allow flexible input (strings permitted)

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
  try {
    const { startDate, endDate, employeeId } = req.query;
    
    let employees = await Employee.find();
    
    // Filter by employee ID if provided
    if (employeeId && employeeId !== 'all') {
      employees = employees.filter(emp => emp._id.toString() === employeeId);
    }
    
    // Filter expenses by date range if provided
    if (startDate || endDate) {
      employees = employees.map(employee => {
        const filteredExpenses = (employee.expenses || []).filter(expense => {
          if (!expense.date) return false;
          const expenseDate = new Date(expense.date);
          
          if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Set end date to end of day
            end.setHours(23, 59, 59, 999);
            return expenseDate >= start && expenseDate <= end;
          } else if (startDate) {
            const start = new Date(startDate);
            return expenseDate >= start;
          } else if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            return expenseDate <= end;
          }
          return true;
        });
        
        return {
          ...employee.toObject(),
          expenses: filteredExpenses
        };
      });
    }
    
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
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
