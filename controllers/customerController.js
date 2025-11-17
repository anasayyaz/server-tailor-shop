const Customer = require('../models/Customer');

// Validation disabled: allow flexible input (strings permitted)

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    await customer.populate('suits.suitType');
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('suits.suitType');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single customer by phone
exports.getCustomerByPhone = async (req, res) => {
  try {
    const customer = await Customer.findOne({ phone: req.params.phone }).populate('suits.suitType');
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'گاہک نہیں ملا' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('suits.suitType');

    if (!updated) {
      return res.status(404).json({ message: 'گاہک نہیں ملا' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'گاہک نہیں ملا' });
    }
    res.json({ message: 'حذف ہو گیا' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
