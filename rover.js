class rover {

    // Heading can change by going forward, example crossing the North pole
    forwardAction = {
        'North' : () => { return {x: this.location.x, y: this.location.y - 1, heading: this.location.heading} },
        'South' : () => { return {x: this.location.x, y: this.location.y + 1, heading: this.location.heading} },
        'East' : () => { return {x: this.location.x + 1, y: this.location.y, heading: this.location.heading} },
        'West' : () => { return {x: this.location.x - 1, y: this.location.y, heading: this.location.heading} },
    };

    backwardAction = {
        'North' : () => { return {x: this.location.x, y: this.location.y + 1, heading: this.location.heading} },
        'South' : () => { return {x: this.location.x, y: this.location.y - 1, heading: this.location.heading} },
        'East' : () => { return {x: this.location.x - 1, y: this.location.y, heading: this.location.heading} },
        'West' : () => { return {x: this.location.x + 1, y: this.location.y, heading: this.location.heading} },
    };

    constructor(landedLocation, obstacles) {
        this.location = landedLocation || {x: 0, y: 0, heading: 'North'};
        this.knownObstacles = obstacles || [];
    }

    validateMessage(message) {
        if (message) {
            return message.match(/^[FBLR]*$/);
        }
        return false;
    }

    move(command) {
        if (!this.validateMessage(command)){
            throw 'Invalid message';
        }
        const action = {
            'F' : () => { this.moveForward() },
            'B' : () => { this.moveBack() },
            'L' : () => { this.rotateLeft() },
            'R' : () => { this.rotateRight() },
        };
        const instructions = command.split('');
        for(let i = 0, len = instructions.length; i < len; i++) {
            if ((instructions[i] === 'F' && this.checkForwardObstacle())
                || (instructions[i] === 'B' && this.checkBackwardObstacle()) ) {
                    return { location: this.location, status: 'Stopped. Obstacle in path' };
            }
            action[instructions[i]]();
        }
        return { location: this.location, status: 'complete' };
    }

    moveForward() {
        this.location = this.forwardAction[this.location.heading]();
    }

    moveBack() {
        this.location = this.backwardAction[this.location.heading]();
    }

    rotateLeft() {
        const action = {
            'North' : 'West',
            'South' : 'East',
            'East' : 'North',
            'West' : 'South',
        };
        this.location.heading = action[this.location.heading];
    }

    rotateRight() {
        const action = {
            'North' : 'East',
            'South' : 'West',
            'East' : 'South',
            'West' : 'North',
        };
        this.location.heading = action[this.location.heading];
    }

    checkForwardObstacle() {
        const nextLocation = this.forwardAction[this.location.heading]();
        return this.knownObstacles.find(o => o[0] === nextLocation.x && o[1] === nextLocation.y);
    }

    checkBackwardObstacle() {
        const nextLocation = this.backwardAction[this.location.heading]();
        return this.knownObstacles.find(o => o[0] === nextLocation.x && o[1] === nextLocation.y);
    }
}

exports.rover = rover;
