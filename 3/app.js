// https://adventofcode.com/2022/day/2

const fs = require('fs');
const { intersection, chunk } = require('lodash');

const baseUpper = 'A'.charCodeAt();
const baseLower = 'a'.charCodeAt();

fs.readFile('input.txt', 'utf8', function(err,data) {
    const lines = data.split('\r\n');
    const totalScore = lines.map(function(line) {
        const center = line.length / 2;
        const compartment1 = line.substring(0, center).split('');
        const compartment2 = line.substring(center).split('');
        const common = intersection(compartment1, compartment2)[0].charCodeAt();

        const priority = common > baseLower
                ? (common - baseLower + 1)
                : (common - baseUpper + 27);

        return priority;
    }).reduce((carry, curr) => carry + curr, 0);
    console.log(totalScore);

    const groups = chunk(lines, 3);
    const totalScore2 = groups.map(group => {
        const common = intersection(...group.map(backpack => backpack.split('')))[0].charCodeAt();
        const priority = common > baseLower
                ? (common - baseLower + 1)
                : (common - baseUpper + 27);
        return priority;
    }).reduce((carry, curr) => carry + curr, 0);;
    console.log(totalScore2);
});