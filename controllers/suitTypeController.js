const SuitType = require('../models/SuitType');

exports.createSuitType = async (req, res) => {
  try {
    const suitType = new SuitType(req.body);
    await suitType.save();
    res.status(201).json(suitType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSuitTypes = async (req, res) => {
  const types = await SuitType.find();
  res.json(types);
};

exports.updateSuitType = async (req, res) => {
  try {
    const updated = await SuitType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSuitType = async (req, res) => {
  try {
    await SuitType.findByIdAndDelete(req.params.id);
    res.json({ message: 'حذف ہو گیا' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
