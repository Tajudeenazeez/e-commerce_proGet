const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


// @desc Fetch all products
// @route Get /api/products
// @access Public

  const getProducts = asyncHandler(async (req, res) => {
      const products = await Product.find({})
    res.json(products)
   })

// @desc Fetch single product
// @route Get /api/products/:id
// @access Public

  const getProductById = asyncHandler(
     async(req, res) => {
     const product = await Product.findById(req.params.id)
       if(product){
        res.json(product)
      } else{
          res.status(404)
          throw new Error('Products not found') 
      }
   })
   // @desc delete a product
// @route DELETE /api/products/:id
// @access Private/admin
   const deleteProduct = asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id)
      if(product){
       await product.remove()
       res.json({message: 'Product deleted by you'})
     } else{
         res.status(404)
         throw new Error('Products not found') 
     }
  })

// desc Create a product
// route POST /api/product
// access Private/admin
   const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user.id,
      image:'/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 'Sample description' 
    })
    const createdProduct = await product.save()
      res.status(201).json(createdProduct)
    })

// desc Update a product
// route PUT /api/product
// access Private/admin
  const updateProduct = asyncHandler(async (req, res) => {
    const {
      name, 
      price, 
      description, 
      image, 
      brand, 
      category, 
      countInStock,
    } = req.body

      const product = await Product.findById(req.params.id)
      if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        
        const updatedProduct = await product.save()
        res.json(updatedProduct)
      
      } else {
        res.status(404)
        throw new Error('Product not found')
      }
    })

   module.exports =  {getProducts, getProductById, deleteProduct, createProduct, updateProduct}