const express = require('express')
const router = express.Router()
const User = require('../models/User')

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered!' })
        }

        const user = new User({ name, email, password })
        await user.save()

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email, password })

        if (user) {
            res.json({ success: true, user })
        } else {
            res.json({ success: false, message: 'Invalid email or password' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// UPDATE USER PROFILE
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body

        // Check if user exists
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Check if email is already taken by another user
        if (email !== user.email) {
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' })
            }
        }

        // Update user fields
        user.name = name
        user.email = email
        if (password) {
            user.password = password
        }

        const updatedUser = await user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router