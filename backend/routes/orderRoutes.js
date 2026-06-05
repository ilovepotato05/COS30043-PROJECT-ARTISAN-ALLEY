const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

// GET orders
router.get('/', async (req, res) => {
    const orders = await Order.find()
    res.json(orders)
})

// CREATE order
router.post('/', async (req, res) => {
    const newOrder = new Order(req.body)
    await newOrder.save()
    res.json(newOrder)
})

module.exports = router