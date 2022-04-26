const trilateration = require('trilateration')

trilateration.addBeacon(0, trilateration.vector(-500, -200));
trilateration.addBeacon(1, trilateration.vector(100, -100));
trilateration.addBeacon(2, trilateration.vector(500, 100));

let fSatMsg =[]
let sSatMsg =[]
let tSatMsg =[]

const getLocation = (a, b, c) => {
    trilateration.setDistance(0, a);
    trilateration.setDistance(1, b);
    trilateration.setDistance(2, c);
    const pos = trilateration.calculatePosition();
    return pos;
}

const getMessage = (fMsg, sMsg, tMsg) => {
    return decodeMessage(fMsg, sMsg, tMsg).join(' ')
}

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

const getAll = () => {
    const pos = trilateration.calculatePosition();
    return pos;
}

const getMessages = () => {
    return decodeMessage(fSatMsg, sSatMsg, tSatMsg).join(' ')
}

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

module.exports = {getLocation, getMessage, setSat, getAll, getMessages}