const express = require('express');
//const Product = require('../models/productModel')
const router = express.Router();
const {getProducts, getProductById} = require('../controller/productController')



router.route('/').get(getProducts)

router.route('/:id').get(getProductById)



module.exports = router