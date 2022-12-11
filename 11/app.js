// https://adventofcode.com/2022/day/11

const { log, table } = require('console');
const fs = require('fs');
const { cloneDeep } = require('lodash');

const ROUND_COUNT = 20;
const ROUND_COUNT_PT2 = 10000;

const inputRegex = new RegExp('Monkey \\d+:\r\n  Starting items: (?<items>.+)\r\n  Operation: new = old (?<operation>[+*]) (?<operand>.+)\r\n  Test: divisible by (?<divisibleBy>\\d+)\r\n    If true: throw to monkey (?<monkeyTrue>\\d+)\r\n    If false: throw to monkey (?<monkeyFalse>\\d+)', 'g');

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const match = data.matchAll(inputRegex);

    const monkeys = [];

    [...match].forEach(element => {
        monkeys.push({
            items: element.groups.items.split(',').map(item => Number(item.trim())),
            operation: element.groups.operation,
            operand: element.groups.operand,
            divisibleBy: Number(element.groups.divisibleBy),
            monkeyTrue: Number(element.groups.monkeyTrue),
            monkeyFalse: Number(element.groups.monkeyFalse),
            inspectCount: 0,
        });
    });

    const monkeysPart2 = cloneDeep(monkeys);

    for (let round = 0; round < ROUND_COUNT; round++) {
        monkeys.forEach(monkey => {
            while (item = monkey.items.shift())
            {
                const operand = monkey.operand === 'old' ? item : Number(monkey.operand);
                if (monkey.operation === '*') {
                    item *= operand;
                }
                else {
                    item += operand;
                }
                item = Math.floor(item / 3);
                monkeys[item % monkey.divisibleBy === 0 ? monkey.monkeyTrue : monkey.monkeyFalse].items.push(item);
                monkey.inspectCount += 1;
            };
        });
    }

    const [mostActiveMonkey1, mostActiveMonkey2] = monkeys.sort((m1, m2) => m2.inspectCount - m1.inspectCount);
    log(mostActiveMonkey1.inspectCount * mostActiveMonkey2.inspectCount);

    const commonDivider = monkeysPart2.map(m => m.divisibleBy).reduce((product, div) => product * div, 1);

    for (let round = 0; round < ROUND_COUNT_PT2; round++) {
        monkeysPart2.forEach(monkey => {
            while (item = monkey.items.shift())
            {
                const operand = monkey.operand === 'old' ? item : Number(monkey.operand);
                if (monkey.operation === '*') {
                    item *= operand;
                }
                else {
                    item += operand;
                }
                const monkeyToPass = item % monkey.divisibleBy === 0 ? monkey.monkeyTrue : monkey.monkeyFalse;
                monkeysPart2[monkeyToPass].items.push(item % commonDivider);
                monkey.inspectCount += 1;
            };
        });
    }

    const [mostActiveMonkey1Pt2, mostActiveMonkey2Pt2] = monkeysPart2.sort((m1, m2) => m2.inspectCount - m1.inspectCount);
    log(mostActiveMonkey1Pt2.inspectCount * mostActiveMonkey2Pt2.inspectCount);
});