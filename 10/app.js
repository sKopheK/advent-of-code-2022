// https://adventofcode.com/2022/day/10

const { log } = require('console');
const fs = require('fs');

const ADD_CMD = 'addx';
const interestingCycles = [20,60,100,140,180,220];

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const lines = data.split(/\r\n/);

    let register = 1;
    let cycleNumber = 1;
    let signalStrengthSum = 0;

    lines.forEach(function(line) {
        const [ cmd, value ] = line.split(' ');

        let cyclesToComplete = 1;
        if (cmd === ADD_CMD) {
            cyclesToComplete = 2;
        }

        for (let i = 0; i < cyclesToComplete; i++) {
            if (interestingCycles.indexOf(cycleNumber) >= 0) {
                signalStrengthSum += cycleNumber * register;
            }
            cycleNumber += 1;
        }

        if (cmd === ADD_CMD) {
            register += Number(value);
        }
    });

    log(signalStrengthSum);
});