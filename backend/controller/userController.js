const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const token = require('../utils/generateToken')

// @desc Auth user/ get token 
// @route Post /api/user/login
// @access Public

  const authUser = asyncHandler(async (req, res) => {
     const {email, password} = req.body

      const user = await User.findOne({email})
       
      if(user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token(user._id)

        })

      } else {
        res.status(404)
        throw new Error('Invalid email or password')
      }

   
  })

// @desc Register a new user
// @route Post /api/user/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body

   const userExists = await User.findOne({ email:email })
    
   if(userExists) {
     res.status(400)
      throw new Error('User already exists')    
  }
  const user = await User.create({
    name,
    email,
    password
  })
  if(user) {
    res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token(user._id)

    })
  } else {
    res.status(400)
    throw new Error ('Invalid user data')
  }
})

// @desc GET user  profile 
// @route  GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email:user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }

   
})
 // @desc   Update user profile 
// @route  POST /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password) {
      user.password = req.body.password || user.password
    }

    const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: token(updatedUser._id)
      
    })
    
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

// @desc GET all user  
// @route  GET /api/users
// @access Private/admin

const getUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
    
  } catch (error) {
    return {message: 'users not found'}  
  }
  }
)

// @desc  Delete a single user  
// @route  DELETE /api/admin/usersList
// @access Private admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    if(user) {
      await user.remove()
      res.json({ message:'user removed'})
    } else{
      res.status(404)
      throw new Error('User not found')
      
    }
  }
  )

// @desc GET user by Id  
// @route  GET /api/users
// @access Private/admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if(user) {
    res.json(user)
  } else{
    res.status(404)
    throw new Error('User not found')
    
  }
  }
)

// @desc   Update user 
// @route  POST /api/user/id
// @access Private/admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id)
  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin 

    const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      
    })
    
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})


module.exports = {
  authUser, 
  getUserProfile, 
  registerUser, 
  updateUserProfile, 
  getUser, 
  deleteUser, 
  getUserById,
  updateUser
}
