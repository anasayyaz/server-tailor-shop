const mongoose = require('mongoose');

const suitTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      sizes: [
        {
          name: { type: String, required: true }, // e.g. "Length"
          type: { type: String, enum: ['text', 'checkbox', 'dropdown'], default: 'text' }, // Size field type
          value: { type: mongoose.Schema.Types.Mixed }, // For text: string/number, for checkbox: boolean, for dropdown: selected value
          options: [{ type: String }] // For dropdown: array of options
        }
      ]
    }
  ]
});

module.exports = mongoose.model('SuitType', suitTypeSchema);
