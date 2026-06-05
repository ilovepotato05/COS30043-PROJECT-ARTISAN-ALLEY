console.log('THIS IS THE CORRECT SERVER.JS FILE') // This line is just for debugging purposes, you can remove it later
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

//Routes
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')

app.get('/test', (req, res) => {
    res.send('Backend Working')
})
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/images', express.static('public/images'))

//DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Server
app.listen(5000, () => {
    console.log("Server running on port 5000")
})
