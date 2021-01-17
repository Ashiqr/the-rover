const rover = require('./rover').rover;

var l = new rover({x: 0, y: 0, heading: 'East'}, [[1,4], [3,5], [7,4]]);
const result = l.move('FLFFFRFLB');
console.log(result);