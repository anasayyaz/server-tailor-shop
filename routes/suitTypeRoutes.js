const express = require('express');
const router = express.Router();
const {
  createSuitType,
  getSuitTypes,
  updateSuitType,
  deleteSuitType
} = require('../controllers/suitTypeController');

router.post('/', createSuitType);
router.get('/', getSuitTypes);
router.put('/:id', updateSuitType);
router.delete('/:id', deleteSuitType);

module.exports = router;
