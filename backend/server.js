const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors')
const connectDB = require('./config/db')
const mongoose = require('mongoose');
const productRoutes = require('./route/productRoutes')
const userRoutes = require('./route/userRoutes')


const { notFound, errorHandler} = require('./customError/middleware')

//mongoose.connect()
dotenv.config();
connectDB();
const app = express();

app.use(express.json())


app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const dev = process.env.NODE_ENV || 'development';

app.listen(PORT, console.log( `listening at ${dev} mode  at port: ${PORT}`.yellow.bold) 
)
