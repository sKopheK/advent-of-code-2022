// https://adventofcode.com/2022/day/2

const fs = require('fs');

const START = 1;    // rock = 1, paper = 2 ...
const base = 'A'.charCodeAt();
const diff = 'X'.charCodeAt() - base;

fs.readFile('input.txt', 'utf8', function(err,data) {
    const lines = data.split('\r\n');
    const totalScore = lines.map(function(line) {
        const [ opponent, meRaw ] = line.split(' ').map((char) => char.charCodeAt() - base + START);
        const me = meRaw - diff;
        // return me + (me - opponent + 3 + START) % 3 * 3;
        const outcome = me - START;
        const symb = (opponent + outcome - 1) % 3;
        return (!symb ? 3 : symb) + outcome * 3;
    }).reduce((carry, curr) => carry + curr, 0);
    console.log(totalScore);
});