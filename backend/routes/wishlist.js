const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')

// GET wishlist
router.get('/', async (req, res) => {
    try {
        const wishlist = await Wishlist.find()
        res.json(wishlist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// CREATE wishlist item
router.post('/', async (req, res) => {
    try {
        const newItem = new Wishlist(req.body)
        await newItem.save()
        res.json(newItem)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// DELETE wishlist item
router.delete('/:id', async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id)
        res.json({ message: 'Deleted from wishlist' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router