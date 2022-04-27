const trilateration = require('trilateration')

trilateration.addBeacon(0, trilateration.vector(-500, -200));
trilateration.addBeacon(1, trilateration.vector(100, -100));
trilateration.addBeacon(2, trilateration.vector(500, 100));

let fSatMsg =[]
let sSatMsg =[]
let tSatMsg =[]


/**
 * This function join the array returned to create string for further processing
 * @param {Number} a First satellite distance to trasmitter 
 * @param {Number} b Second satellite distance to tranmitter
 * @param {Number} c Third satellite distance to transmitter
 * @returns String containing the full message
 */
const getLocation = (a, b, c) => {
    trilateration.setDistance(0, a);
    trilateration.setDistance(1, b);
    trilateration.setDistance(2, c);
    const pos = trilateration.calculatePosition();
    return pos;
}

/**
 * Decodes and processes the message 
 * @param {String} fMsg Message from first satellite
 * @param {String} sMsg Message from second satellite
 * @param {String} tMsg Message from third satellite
 * @returns String with the decoded message
 */
const getMessage = (fMsg, sMsg, tMsg) => {
    return decodeMessage(fMsg, sMsg, tMsg).join(' ')
}

/**
 * This function individually sets each sattellite distance to transmitter  
 * @param {String} sat Satellite name 
 * @param {Number} dist Distance to satellite
 * @param {String} message Message recieved from satellite
 */
const setSat = (sat, dist, message) => {
    switch (sat) {
        case 'kenobi':
            trilateration.addBeacon(0, trilateration.vector(-500, -200))
            trilateration.setDistance(0, dist)
            fSatMsg = message
            break
        case 'skywalker':
            trilateration.addBeacon(1, trilateration.vector(100, -100))
            trilateration.setDistance(1, dist)
            sSatMsg = message
            break
        case 'sato':
            trilateration.addBeacon(2, trilateration.vector(500, 100))
            trilateration.setDistance(2, dist)
            tSatMsg = message
            break
    } 
}

/**
 * This function calculates location from setted satellites
 * @returns Position object
 */
const getLocationFromSetted = () => {
    const pos = trilateration.calculatePosition();
    return pos;
}

/**
 * This function join the array returned to create string containing the message of the setted 
 * satellites
 * @returns String containing the full message
 */
const getMessageFromSetted = () => {
    return decodeMessage(fSatMsg, sSatMsg, tSatMsg).join(' ')
}

/**
 * Utility function to decode message
 * @param {Array} sat2 Data corresponding to second satellite
 * @param {Array} sat3 Data corresponding to third satellite
 * @param {Array} sat1 Data corresponding to first satellite
 * @returns Array of string containing the full message
 */
const decodeMessage = (sat1, sat2, sat3) => {
    const len = sat1.length 
    let msg1 = []
    for (let i = 0; i < len; i++) {
        msg1.push(sat1[i])
        msg1.push(sat2[i])
        msg1.push(sat3[i])
    }

    let filtered = msg1.filter(function(value, index, arr){ 
        return value != ''
    });
    return [...new Set(filtered)]
}

module.exports = {getLocation, getMessage, setSat, getLocationFromSetted, getMessageFromSetted}