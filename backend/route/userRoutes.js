const express = require('express');
const router = express.Router();
const authUser = require('../controller/userController')
const getUserProfile = require('../controller/userController')
const protect = require('../customError/authMiddleware')


router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)



   module.exports = router