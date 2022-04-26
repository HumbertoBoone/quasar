const express = require('express')
const feedRoutes = require('./routes/feed')
const topsecretRoutes = require('./routes/topsecret.route')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'codepen.io', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use( topsecretRoutes)

app.listen(8080)

