// https://adventofcode.com/2022/day/9

const { log, table } = require('console');
const fs = require('fs');
const { clone } = require('lodash');

const START = Math.floor(Number.MAX_SAFE_INTEGER / 2);

function Knot(x, y) {
    this.x = x;
    this.y = y;

    this.move = function(direction) {
        switch (direction) {
            case 'L':
                this.x -= 1;
                break;
            case 'R':
                this.x += 1;
                break;
            case 'D':
                this.y += 1;
                break;
            case 'U':
                this.y -= 1;
                break;
        }
    }

    this.getCoords = function() {
        return `${this.x} ${this.y}`;
    }

    this.follow = function(knot) {
        if (this.y === knot.y &&
            Math.abs(this.x - knot.x) > 1
        ) {
            this.x -= Math.sign(this.x - knot.x);
        }
        else if (this.x === knot.x &&
            Math.abs(this.y - knot.y) > 1
        ) {
            this.y -= Math.sign(this.y - knot.y);
        }
        else if (Math.abs(this.x - knot.x) * Math.abs(this.y - knot.y) > 1) {
            this.x -= Math.sign(this.x - knot.x);
            this.y -= Math.sign(this.y - knot.y);
        }
    }
}

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const lines = data.split(/\r\n/);
    const head = new Knot(START, START);
    const tail = clone(head);
    const tailVisited = new Set([head.getCoords()]);
    lines.forEach((line) => {
        const [ direction, lenStr] = line.split(' ');
        const length = Number(lenStr);
        for (let i = 0; i < length; i++) {
            head.move(direction);
            tail.follow(head);
            tailVisited.add(tail.getCoords());
        }
    });
    log(tailVisited.size);
});