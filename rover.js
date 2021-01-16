class rover {
    constructor(landedLocation, obstacles, destination) {
        this.location = landedLocation || {x: 0, y: 0, heading: 'North'};
        this.knownObstacles = obstacles || [];
        this.destination = destination || [];
        this.message = null;
    }

    validateMessage(message) {
        if (message) {
            return message.match(/^[FBLR]*$/);
        }
        return false;
    }

    go(message){
        if (!this.validateMessage(message)){
            throw 'Invalid message';
        }
        return this.move(message);
    }

    move(command){
        const action = {
            'F' : () => { this.moveForward() },
            'B' : () => { this.moveBack() },
            'L' : () => { this.rotateLeft() },
            'R' : () => { this.rotateRight() },
        };
        const instructions = command.split('');
        for(let i = 0, len = instructions.length; i < len; i++){
            action[instructions[i]]();
        }
        return this.location;
    }

    moveForward() {
        const action = {
            'North' : () => {this.location.y -= 1},
            'South' : () => {this.location.y += 1},
            'East' : () => {this.location.x += 1},
            'West' : () => {this.location.x -= 1},
        };
        action[this.location.heading]();
    }

    moveBack() {
        const action = {
            'North' : () => {this.location.y += 1},
            'South' : () => {this.location.y -= 1},
            'East' : () => {this.location.x -= 1},
            'West' : () => {this.location.x += 1},
        };
        action[this.location.heading]();
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
}
exports.rover = rover;