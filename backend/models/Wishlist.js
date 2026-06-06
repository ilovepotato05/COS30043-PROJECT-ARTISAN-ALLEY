const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: String,
    price: Number,
    image: String,
    category: String
})

module.exports = mongoose.model('Wishlist', wishlistSchema)