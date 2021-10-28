const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors')
const connectDB = require('./config/db')
const mongoose = require('mongoose');
const productRoutes = require('./route/productRoutes')
const userRoutes = require('./route/userRoutes')
const orderRoutes = require('./route/orderRoutes')
const uploadRoutes = require('./route/uploadRoutes')
const { notFound, errorHandler} = require('./customError/middleware')

dotenv.config();

//mongoose.connect()
connectDB();

const app = express();

app.use(express.json())



app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
res.send(process.env.PAYPAL_CLIENT)
)


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build'))
  )
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
 } else { 
   app.get('/', (req, res) => {
  res.send('API is running...')
})}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const dev = process.env.NODE_ENV || 'development';

app.listen(PORT, console.log( `listening at ${dev} mode  at port: ${PORT}`.yellow.bold) 
)
