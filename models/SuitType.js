const mongoose = require('mongoose');

// Define size field schema for nested structures
const sizeFieldSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Length", "Pocket", "Kuff"
  type: { 
    type: String, 
    enum: ['text', 'checkbox', 'dropdown', 'group', 'array'], 
    default: 'text' 
  }, // Field type
  value: { type: mongoose.Schema.Types.Mixed }, // Default/example value
  options: [{ type: String }], // For dropdown: array of options
  // For 'group' type: nested fields
  fields: [{ 
    name: String,
    type: { type: String, enum: ['text', 'checkbox', 'dropdown'], default: 'text' },
    value: mongoose.Schema.Types.Mixed,
    options: [{ type: String }]
  }],
  // For 'array' type: template for each array item
  itemTemplate: [{
    name: String,
    type: { type: String, enum: ['text', 'checkbox', 'dropdown'], default: 'text' },
    value: mongoose.Schema.Types.Mixed,
    options: [{ type: String }]
  }],
  minItems: { type: Number, default: 0 }, // For array type
  maxItems: { type: Number, default: 10 } // For array type
}, { _id: false });

const suitTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      sizes: [sizeFieldSchema]
    }
  ]
});

module.exports = mongoose.model('SuitType', suitTypeSchema);
