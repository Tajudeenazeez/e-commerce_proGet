const express = require('express');
 const asyncHandler = require('express-async-handler')
//const Product = require('../models/productModel')
const router = express.Router();
const getProducts = require('../controller/productController')
const getProductById = require('../controller/productController')



router.route('/').get(getProducts)

router.route('/:id').get(getProductById)



   module.exports = router