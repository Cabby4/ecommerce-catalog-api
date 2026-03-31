const ProductModel = require ('../models/productModel')


// CREATE PRODUCT
const createProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.create(req.body)

    res.status(201).json({
      message: 'Product created',
      data: product
    })
  } catch (err) {
    next(err)
  }
}


// GET ALL PRODUCTS (Pagination + Search + Sort)
const getProducts = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, sort, search, category } = req.query

    page = parseInt(page)
    limit = parseInt(limit)

    const query = {}

    // Search
    if (search) {
      query.$text = { $search: search }
    }

    // Filter by category
    if (category) {
      query.category = category
    }

    // Sorting
    let sortOption = {}
    if (sort) {
      sortOption[sort] = 1 // ascending
    } else {
      sortOption.createdAt = -1
    }

    const products = await ProductModel.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await ProductModel.countDocuments(query)

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      data: products
    })

  } catch (err) {
    next(err)
  }
}


// GET SINGLE PRODUCT
const getProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
}


// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      message: 'Product updated',
      data: product
    })

  } catch (err) {
    next(err)
  }
}


// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      message: 'Product deleted'
    })

  } catch (err) {
    next(err)
  }
}


module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}