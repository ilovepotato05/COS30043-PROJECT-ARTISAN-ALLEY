const Product = require('../models/Product')

// GET all products
const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

// GET product by ID
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
}

module.exports = {
    getProducts,
    getProductById
}