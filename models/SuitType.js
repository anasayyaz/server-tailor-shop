const mongoose = require('mongoose');

const suitTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      sizes: [
        {
          name: { type: String, required: true }, // e.g. "Length"
          value: { type: Number} // e.g. 42
        }
      ]
    }
  ]
});

module.exports = mongoose.model('SuitType', suitTypeSchema);
