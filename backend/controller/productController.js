const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


// @desc Fetch all products
// @route Get /api/products
// @access Public

  const getProducts = asyncHandler(async (req, res) => {
    const keyword =   req.query.keyword ? {
    name : {
      $regex: req.query.keyword,
      $options: 'i'
    }
    }: {}

    const products = await Product.find({...keyword})
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

    
// desc Create a product review
// route Post /api/product/:id/review
// access Private
  const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment } = req.body
    const product = await Product.findById(req.params.id)
      if (product) {
        const alreadyReview = product.reviews.find(r => { r.user.toString() === r.user._id.toString()})

      if(alreadyReview) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
      const review = {
        name : req.user.name,
        rating: Number(rating),
        comment,
        user:req.user
      }
      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating = product.reviews.reduce((acc, start) => {acc + start.rating},0)/ product.reviewslength
      
      await product.save()
      res.json('Product reviewed')
      
      } else {
        res.status(404)
        throw new Error('Product not found')
      }
    })




   module.exports =  {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview}