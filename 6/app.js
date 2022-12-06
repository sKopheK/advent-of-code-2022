// https://adventofcode.com/2022/day/6

const { log } = require('console');
const fs = require('fs');
const { uniq } = require('lodash');

const PACKET_LEN = 14;

const repetitionAfterFourChars = (data) => {
    let quadruple;
    let j;
    for (let i = 0; i < data.length - PACKET_LEN - 1; i++) {
        quadruple = [];
        for (j = 0; j < PACKET_LEN; j++) {
            quadruple.push(data[i + j]);
        }
        if (uniq(quadruple).length === PACKET_LEN) {
            return i + j;
        }
    }
}

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    log(repetitionAfterFourChars(data));
});