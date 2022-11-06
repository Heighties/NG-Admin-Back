const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');

const productCtrl = require('../controllers/products');

router.post('/', productCtrl.createProduct);
router.put('/:id', productCtrl.modifyProduct);
router.delete('/:id', productCtrl.deleteProduct);
router.get('/:id', productCtrl.getOneProduct);
router.get('/', productCtrl.getAllProducts);

module.exports = router;