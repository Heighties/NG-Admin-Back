const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');

const realisationCtrl = require('../controllers/realisation');

router.post('/', multer, realisationCtrl.createRealisation);
router.put('/:id', multer, realisationCtrl.modifyRealisation);
router.delete('/:id', multer, realisationCtrl.deleteRealisation);
router.get('/:id', multer, realisationCtrl.getOneRealisation);
router.get('/', multer, realisationCtrl.getAllRealisations);

module.exports = router;