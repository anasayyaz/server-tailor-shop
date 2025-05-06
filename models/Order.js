const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  suitDetails: [
    {
      suitType: { type: mongoose.Schema.Types.ObjectId, ref: 'SuitType' },
      items: [
        {
          itemName: String,
          sizes: [
            {
              name: String,
              value: Number,
            },
          ],
        },
      ],
    },
  ],
  assignedEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false },
  notes: { type: String }, // ✅ ADD THIS
  orderDate: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Order', orderSchema);
