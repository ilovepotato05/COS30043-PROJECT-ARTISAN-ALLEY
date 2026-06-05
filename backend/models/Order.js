const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    total: Number,
    status: String,
    date: String
})

module.exports = mongoose.model('Order', orderSchema)