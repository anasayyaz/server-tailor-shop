const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  serialNumber: String,
  rawSpeechInput: String, // Original speech text from voice input
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
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
