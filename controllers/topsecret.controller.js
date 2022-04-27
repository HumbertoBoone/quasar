const {getLocation, getMessage, setSat, getLocationFromSetted, getMessageFromSetted} = require('../services/locate.service')


/**
 * This function recieves the three satellites data, which are
 * name, distance and message
 * and replies with a HTTP Status
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument 
 */
exports.getLocation = (req, res) => {
    const satellites = req.body.satellites
    let fSat, sSat, tSat
    for (let i = 0; i < 3; i++) {
        if (satellites[i].name === 'kenobi')  fSat = satellites[i]
        if (satellites[i].name === 'skywalker')  sSat = satellites[i]
        if (satellites[i].name === 'sato')  tSat = satellites[i]
    }
    let location = getLocation(fSat.distance, sSat.distance, tSat. distance)
    let message = getMessage(fSat.message, sSat.message, tSat.message)
    res.status(200).json({
        position: location,
        message: message
    })
}

/**
 * Recieves and procecess the request for setting a satellite
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument 
 */
exports.setSat = (req, res) => {
    const distance = req.body.distance
    const message = req.body.message
    const sat = req.params.satName
    setSat(sat, distance, message)
    res.status(200).json({
        message: `Satellite '${sat}' added successfully.`
    })
}

/**
 * Gets all the messages when posted one by one
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument 
 */
exports.getAll = (req, res) => {
    const pos = getLocationFromSetted()
    const message = getMessageFromSetted()
    if (Number.isNaN(pos.x) && Number.isNaN(pos.y)) {
        res.status(404).json({
            message: 'Not enough information to calculate position'
        })
    }
    res.status(200).json({
        position: pos,
        message: message
    })
}