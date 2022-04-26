const express = require('express')
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

const PORT = 8080

app.listen(PORT, _ => {
    console.log('Listening on port ' + PORT)
})

