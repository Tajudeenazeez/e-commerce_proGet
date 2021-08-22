const express = require('express');
const router = express.Router();
const {
  authUser, 
  getUserProfile, 
  registerUser, 
  getUser, 
  deleteUser, 
  getUserById,
  updateUser
} = require('../controller/userController')
const  {protect, admin} = require('../customError/authMiddleware')

router.route('/').post(registerUser).get(protect, admin, getUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin, getUser)
.put(protect, admin, updateUser)


module.exports = router