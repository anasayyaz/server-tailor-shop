const Order = require('../models/Order');
const Customer = require('../models/Customer');

// Validation disabled: allow flexible input (strings permitted)

exports.createOrder = async (req, res) => {
  try {
    // Map customerId to customer field for model compatibility
    const orderData = {
      ...req.body,
      customer: req.body.customerId || req.body.customer,
    };
    
    // Remove fields that shouldn't be in the model
    delete orderData.customerId;
    delete orderData.customerPhone;
    delete orderData.customerName;

    // Verify customer exists
    if (orderData.customer) {
      const customer = await Customer.findById(orderData.customer);
      if (!customer) {
        return res.status(404).json({ message: 'گاہک نہیں ملا' });
      }
    }

    const order = new Order(orderData);
    await order.save();
    
    // Populate before returning
    await order.populate('customer');
    await order.populate('assignedEmployee');
    await order.populate('suitDetails.suitType');
    
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer')
      .populate('assignedEmployee')
      .populate('suitDetails.suitType');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'آرڈر کامیابی سے حذف ہو گیا' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    // Map customerId to customer field for model compatibility
    const updateData = {
      ...req.body,
      customer: req.body.customerId || req.body.customer,
    };
    
    // Remove fields that shouldn't be in the model
    delete updateData.customerId;
    delete updateData.customerPhone;
    delete updateData.customerName;

    // Verify customer exists if being updated
    if (updateData.customer) {
      const customer = await Customer.findById(updateData.customer);
      if (!customer) {
        return res.status(404).json({ message: 'گاہک نہیں ملا' });
      }
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('customer')
      .populate('assignedEmployee')
      .populate('suitDetails.suitType');

    if (!order) {
      return res.status(404).json({ message: 'آرڈر نہیں ملا' });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer')
      .populate('assignedEmployee')
      .populate('suitDetails.suitType');

    if (!order) {
      return res.status(404).json({ message: 'آرڈر نہیں ملا' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
