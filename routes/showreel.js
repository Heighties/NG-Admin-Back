const express = require('express');
const router = express.Router();
// const auth = require('auth');

const showreelCtrl = require('../controllers/showreel');

router.post('/', showreelCtrl.createShowreel);
router.put('/:id', showreelCtrl.modifyShowreel);
router.delete('/:id', showreelCtrl.deleteShowreel);
router.get('/:id', showreelCtrl.getOneShowreel);
router.get('/', showreelCtrl.getAllShowreels);

module.exports = router;