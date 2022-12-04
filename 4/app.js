// https://adventofcode.com/2022/day/4

const fs = require('fs');
const { intersection, range } = require('lodash');

fs.readFile('input.txt', 'utf8', function(_,data) {
    const lines = data.split('\r\n');
    const fullyOverlap = lines.map(function(line) {
        const sections = [...line.matchAll(/(\d+)\-(\d+)/g)]
            .map(section => range(Number(section[1]), Number(section[2]) + 1));
        const overlap = intersection(...sections);
        return overlap.length === sections[0].length
            || overlap.length === sections[1].length
                ? 1 : 0;
    }).reduce((carry, curr) => carry + curr, 0);
    console.log(fullyOverlap);

    const isOverlap = lines.map(function(line) {
        const sections = [...line.matchAll(/(\d+)\-(\d+)/g)]
            .map(section => range(Number(section[1]), Number(section[2]) + 1));
        const overlap = intersection(...sections);
        return overlap.length > 0 ? 1 : 0;
    }).reduce((carry, curr) => carry + curr, 0);
    console.log(isOverlap);
});