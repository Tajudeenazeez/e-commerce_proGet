const express = require('express');
const router = express.Router();
const {addOrderItems, getOrderById} = require('../controller/orderController')
const protect = require('../customError/authMiddleware')

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)




module.exports = router
