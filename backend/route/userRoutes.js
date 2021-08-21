const express = require('express');
const router = express.Router();
const {authUser, getUserProfile, registerUser, getUser} = require('../controller/userController')
const  {protect, admin} = require('../customError/authMiddleware')

router.route('/').post(registerUser).get(protect, admin, getUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)



   module.exports = router