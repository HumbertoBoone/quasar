const express = require('express')
const topsecretController = require('../controllers/topsecret.controller')
const router = express.Router()

router.post('/topsecret', topsecretController.getLocation)

router.post('/topsecret_split/:satName', topsecretController.setSat)

router.get('/topsecret_split', topsecretController.getAll)

module.exports = router