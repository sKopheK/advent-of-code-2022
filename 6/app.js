// https://adventofcode.com/2022/day/6

const { log } = require('console');
const fs = require('fs');
const { uniq } = require('lodash');

const repetitionAfterFourChars = (data) => {
    let quadruple;
    let j;
    for (let i = 0; i < data.length - 3; i++) {
        quadruple = [];
        for (j = 0; j < 4; j++) {
            quadruple.push(data[i + j]);
        }
        if (uniq(quadruple).length === 4) {
            return i + j;
        }
    }
}

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    log(repetitionAfterFourChars(data));
});