const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const realisationCtrl = require('../controllers/realisation');

router.post('/', auth, multer, realisationCtrl.createRealisation);
router.put('/:id', multer, realisationCtrl.modifyRealisation);
router.delete('/:id', multer, realisationCtrl.deleteRealisation);
router.get('/:id', auth, multer, realisationCtrl.getOneRealisation);
router.get('/', multer, realisationCtrl.getAllRealisations);

module.exports = router;