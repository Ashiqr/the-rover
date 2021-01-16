const rover = require('./rover').rover;

var l = new rover({x: 0, y: 0, heading: 'North'});
l.go('FLFFFRFLBFFFFFFFFFFRFFFFF');
console.log(l.location);