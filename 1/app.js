// https://adventofcode.com/2022/day/1

const fs = require('fs');
const { sum, max, difference } = require('lodash');

fs.readFile('input.txt', 'utf8', function (err,data) {
    const elves = data.split('\r\n\r\n');
    const calories = elves.map(elf => sum(elf.split('\r\n').map(food => parseInt(food))));

    const top1 = max(calories);
    const top2 = max(difference(calories, [top1]));
    const top3 = max(difference(calories, [top1, top2]));
    console.log(top1 + top2 + top3);
});