const rover = require('./rover.js').rover;
const each = require('jest-each').default;


describe('Valid message return true', () => {
    each([
        ['FLFFFRFLB'],
        ['FLFFFRFLBFFFFFFFFFFRFFFFF']
    ]).it("when the input is '%s'", (command) => {
        let robot = new rover();
        expect(robot.validateMessage(command)).toBeTruthy();
    });
})

describe('Valid message return false', () => {
    each([
        ['flbr'],
        ['flbr03d=1'],
        ['FLF=1'],
        [null],
        [''],
        [0]
    ]).it("when the input is '%s'", (command) => {
        let robot = new rover();
        expect(robot.validateMessage(command)).toBeFalsy();
    });
})

describe('Move forward', () => {
    each([
        [{x: 10, y: 10, heading: 'North'}, {x: 10, y: 9, heading: 'North'}],
        [{x: 10, y: 10, heading: 'East'}, {x: 11, y: 10, heading: 'East'}],
        [{x: 10, y: 10, heading: 'South'}, {x: 10, y: 11, heading: 'South'}],
        [{x: 10, y: 10, heading: 'West'}, {x: 9, y: 10, heading: 'West'}],
    ]).it("when the input is '%s'", (location, expected) => {
        let robot = new rover(location);
        robot.moveForward();
        expect(robot.location).toStrictEqual(expected);
    });
})

describe('Move back', () => {
    each([
        [{x: 10, y: 10, heading: 'North'}, {x: 10, y: 11, heading: 'North'}],
        [{x: 10, y: 10, heading: 'East'}, {x: 9, y: 10, heading: 'East'}],
        [{x: 10, y: 10, heading: 'South'}, {x: 10, y: 9, heading: 'South'}],
        [{x: 10, y: 10, heading: 'West'}, {x: 11, y: 10, heading: 'West'}],
    ]).it("when the input is '%s'", (location, expected) => {
        let robot = new rover(location);
        robot.moveBack();
        expect(robot.location).toStrictEqual(expected);
    });
})

describe('Rotate Left', () => {
    each([
        [{x: 10, y: 10, heading: 'North'}, {x: 10, y: 10, heading: 'West'}],
        [{x: 10, y: 10, heading: 'East'}, {x: 10, y: 10, heading: 'North'}],
        [{x: 10, y: 10, heading: 'South'}, {x: 10, y: 10, heading: 'East'}],
        [{x: 10, y: 10, heading: 'West'}, {x: 10, y: 10, heading: 'South'}],
    ]).it("when the input is '%s'", (location, expected) => {
        let robot = new rover(location);
        robot.rotateLeft();
        expect(robot.location).toStrictEqual(expected);
    });
})

describe('Rotate Right', () => {
    each([
        [{x: 10, y: 10, heading: 'North'}, {x: 10, y: 10, heading: 'East'}],
        [{x: 10, y: 10, heading: 'East'}, {x: 10, y: 10, heading: 'South'}],
        [{x: 10, y: 10, heading: 'South'}, {x: 10, y: 10, heading: 'West'}],
        [{x: 10, y: 10, heading: 'West'}, {x: 10, y: 10, heading: 'North'}],
    ]).it("when the input is '%s'", (location, expected) => {
        let robot = new rover(location);
        robot.rotateRight();
        expect(robot.location).toStrictEqual(expected);
    });
})

describe('move for a command', () => {
    each([
        ['FLFFFRFLB', { x: -2, y: -2, heading: 'West' }],
        ['FLFFFRFLBFFFFFFFFFFRFFFFF', { x: -12, y: -7, heading: 'North' }]
    ]).it("when the input is '%s'", (command, expected) => {
        let robot = new rover();
        expect(robot.move(command)).toStrictEqual(expected);
    });
})
