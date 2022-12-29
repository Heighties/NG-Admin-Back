const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const realisationCtrl = require('../controllers/realisation');

router.post('/', auth, multer, realisationCtrl.createRealisation);
router.put('/:id', auth, multer, realisationCtrl.modifyRealisation);
router.delete('/:id', auth, multer, realisationCtrl.deleteRealisation);
router.get('/:id', auth, multer, realisationCtrl.getOneRealisation);
router.get('/', auth, multer, realisationCtrl.getAllRealisations);

module.exports = router;