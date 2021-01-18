const rover = require('./rover').rover;

const message = 'FLFFFRFLB';
const startLocation = {x: 0, y: 0, heading: 'East'};
const obstacles = [[1,4], [-2,-2], [7,4]];

try {
    const marsRover = new rover(startLocation, obstacles);
    const result = marsRover.move(message);
    console.log(`Stopped location :  x: ${result.location.x}, y: ${result.location.y}, heading: ${result.location.heading}`);
    console.log('Status : ' + result.status);

} catch (error) {
    console.log(error)
}
