const express = require('express');
const router = express.Router();
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrder, getOrders, updateOrderToDelivered} = require('../controller/orderController')
const {protect, admin} = require('../customError/authMiddleware')

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/deliver').put(protect,admin, updateOrderToDelivered)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/myorder').get(protect, getMyOrder)




module.exports = router
