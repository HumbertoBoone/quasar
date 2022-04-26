const {getLocation, getMessage, setSat, getAll, getMessages} = require('../services/locate.service')


/**
 * This function recieves the three satellites data, which are
 * name, distance and message
 * and replies with a HTTP Status
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getLocation = (req, res, next) => {
    const satellites = req.body.satellites
    let fSat, sSat, tSat
    for (let i = 0; i < 3; i++) {
        if (satellites[i].name === 'kenobi')  fSat = satellites[i]
        if (satellites[i].name === 'skywalker')  sSat = satellites[i]
        if (satellites[i].name === 'sato')  tSat = satellites[i]
    }
    let location = getLocation(fSat.distance, sSat.distance, tSat. distance)
    let message = getMessage(fSat.message, sSat.message, tSat. message)
    res.status(200).json({
        position: location,
        message: message
    })
}

exports.setSat = (req, res, next) => {
    const distance = req.body.distance
    const message = req.body.message
    const sat = req.params.satName
    setSat(sat, distance, message)
    res.status(200).json({
        message: `Satellite '${sat}' added successfully.`
    })
}
exports.getAll = (req, res, next) => {
    const pos = getAll()
    const message = getMessages()
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