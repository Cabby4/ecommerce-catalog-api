const express = require('express')
const router = express.Router()

const { 
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct } = require('../controllers/productController')

const { validateCreateProductSchema, validateUpdateProductSchema } = require('../validators/productValidation')



router.post('/products', validateCreateProductSchema, createProduct)

router.get('/products', getProducts)

router.get('/products/:id', getProductById)

router.put('/products/:id', validateUpdateProductSchema, updateProduct)

router.delete('/products/:id', deleteProduct)

module.exports = router