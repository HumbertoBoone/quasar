const trilateration = require('trilateration')

trilateration.addBeacon(0, trilateration.vector(-500, -200));
trilateration.addBeacon(1, trilateration.vector(100, -100));
trilateration.addBeacon(2, trilateration.vector(500, 100));

const GetLocation = (a, b, c) => {
    trilateration.setDistance(0, a);
    trilateration.setDistance(1, b);
    trilateration.setDistance(2, c);

    const pos = trilateration.calculatePosition();
    return pos;
}

const GetMessage = (msg) => {

}