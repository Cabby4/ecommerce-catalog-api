const Joi = require('joi')

// Validate create product
const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().optional(),
  category: Joi.string().required(),
  inStock: Joi.boolean().optional()
})

const validateCreateProductSchema = (req, res, next) => {
        const { error } = createProductSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    next()
}

// validate update product
const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  inStock: Joi.boolean().optional()
})

const validateUpdateProductSchema = (req, res, next) => {
        const { error } = updateProductSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    next()
}

module.exports = {
  validateCreateProductSchema,
  validateUpdateProductSchema
}