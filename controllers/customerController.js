const Customer = require('../models/Customer');

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
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
  } catch (error) {
    return res.status(500).send({message: "error "})
  }
  
};
// Get single customer by phone
exports.getCustomerByPhone = async (req, res) => {
  const customer = await Customer.findOne({ phone: req.params.phone }).populate('suits.suitType');
  if (customer) res.json(customer);
  else res.status(404).json({ message: 'Customer not found' });
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
