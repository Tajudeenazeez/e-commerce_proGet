const express = require('express');
const router = express.Router();
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrder} = require('../controller/orderController')
const protect = require('../customError/authMiddleware')

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/myorder').get(protect, getMyOrder)




module.exports = router
