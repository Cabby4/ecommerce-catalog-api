const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

// enable text search
productSchema.index({ name: 'text' })

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel