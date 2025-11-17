const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  serialNumber: String, // ✅ NEW FIELD
  suits: [
    {
      suitType: { type: mongoose.Schema.Types.ObjectId, ref: 'SuitType' },
      items: [
        {
          itemName: String,
          sizes: [
            {
              name: String,
              value: mongoose.Schema.Types.Mixed,
            },
          ],
        },
      ],
    },
  ],
}, {
  timestamps: true // ✅ optional but useful for createdAt tracking
});

module.exports = mongoose.model('Customer', customerSchema);
