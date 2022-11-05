const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');

const realisationCtrl = require('../controllers/realisation');

router.post('/', realisationCtrl.createRealisation);
router.put('/:id', realisationCtrl.modifyRealisation);
router.delete('/:id', realisationCtrl.deleteRealisation);
router.get('/:id', realisationCtrl.getOneRealisation);
router.get('/', realisationCtrl.getAllRealisations);

module.exports = router;