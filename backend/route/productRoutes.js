const express = require('express');
//const Product = require('../models/productModel')
const router = express.Router();
const {
  getProducts, 
  getProductById, 
  deleteProduct,  
  createProduct
} = require('../controller/productController')
const  {protect, admin} = require('../customError/authMiddleware')

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .post(protect, admin, createProduct)




module.exports = router