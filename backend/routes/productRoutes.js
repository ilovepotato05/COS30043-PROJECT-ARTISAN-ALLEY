const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

//get ALL products
router.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

//get product by ID
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
})

module.exports = router