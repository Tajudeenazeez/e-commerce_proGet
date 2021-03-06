const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors')
const users = require('./data/user');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel')
const connectDB = require('./config/db')


dotenv.config()


const importData = async () => {
  try {
    
   await connectDB()
  //  await Order.deleteMany()
  //  await Product.deleteMany()
  //  await User.deleteMany()
  
    const createdUser = await User.insertMany(users)

    const adminUser = createdUser[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser}
   
    })

    await Product.insertMany(sampleProducts)
    console.log('Data Imported'.green.inverse)
    process.exit()
   } catch(error) {
     console.error(`${error}`.red.inverse)
     process.exit(0)

   }
}


const destroyData = async () => {
  try {
   await Order.deleteMany()
   await Product.deleteMany()
   await User.deleteMany()
  

    console.log('Data Destroyed'.green.inverse)
    process.exit()
   } catch(error) {
     console.error(`${error}`.red.inverse)
     process.exit(1)

   }
}

if(process.argv[1] === '-d')  {
  destroyData()

} else {
  importData()
}