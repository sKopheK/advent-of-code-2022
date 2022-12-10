// https://adventofcode.com/2022/day/10

const { log, table } = require('console');
const fs = require('fs');
const { chunk } = require('lodash');

const ADD_CMD = 'addx';
const CRT_LINE_LEN = 40;
const interestingCycles = [20,60,100,140,180,220];

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const lines = data.split(/\r\n/);

    let register = 1;
    let cycleNumber = 1;
    let signalStrengthSum = 0;

    const screen = Array(CRT_LINE_LEN * 6);

    lines.forEach(function(line) {
        const [ cmd, value ] = line.split(' ');
        const cyclesToComplete = cmd === ADD_CMD ? 2 : 1;

        for (let i = 0; i < cyclesToComplete; i++) {
            if (interestingCycles.indexOf(cycleNumber) >= 0) {
                signalStrengthSum += cycleNumber * register;
            }

            const pixelId = cycleNumber - 1;
            screen[pixelId] = Math.abs((pixelId % CRT_LINE_LEN) - register) <= 1 ? '#' : '.';
            cycleNumber += 1;
        }

        if (cmd === ADD_CMD) {
            register += Number(value);
        }
    });

    log(signalStrengthSum);
    table(chunk(screen, CRT_LINE_LEN).map(line => line.join('')));
});