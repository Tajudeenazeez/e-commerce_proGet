const jwt = require('jsonwebtoken')
const User = require ('../models/userModel')


const protect = async (req, res, next) => {
    let getToken 

    if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
      ) {
        try {
          getToken = req.headers.authorization.split(' ')[1]
          const decoded = jwt.verify(getToken, process.env.JWT_SECRET)
          req.user = await User.findById(decoded.id).select('-password') 
          next()
          
        } catch (error) {
          console.error(error)
          res.status(401)
          throw new Error('Not authorized, token failed')
       }
    }

    if(!getToken ) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }

}



module.exports = protect