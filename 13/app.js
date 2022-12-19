// https://adventofcode.com/2022/day/13

const { log } = require('console');
const fs = require('fs');
const { sum } = require('lodash');

const compare = (left, right) => {
    if (!Array.isArray(left) && !Array.isArray(right)) {
        return left - right;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        let i = 0;
        for (; i < left.length; i++) {
            if (i >= right.length) {
                return false;
            }
            const result = compare(left[i], right[i]);
            if (result === 0) {
                continue;
            }
            return result;
        }
        return left.length - right.length;
    }

    if (Array.isArray(left) && !Array.isArray(right)) {
        return compare(left, [right]);
    }

    if (!Array.isArray(left) && Array.isArray(right)) {
        return compare([left], right);
    }
};

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const pairs = data.split('\r\n\r\n');
    const correctOrder = pairs.map(function(pair, index) {
        const [left, right] = pair.split('\r\n');
        return compare(eval(left), eval(right)) < 0 ? index + 1 : 0;
    });
    log(sum(correctOrder));

    // part 2
    const dividerPacket1 = [[2]];
    const dividerPacket2 = [[6]];
    const packets = [...data.split('\r\n').filter(x => !!x).map(eval), dividerPacket1, dividerPacket2];
    const sorted = packets.sort(compare);
    log((sorted.indexOf(dividerPacket1) + 1) * (sorted.indexOf(dividerPacket2) + 1));
});