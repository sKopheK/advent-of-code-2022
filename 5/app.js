// https://adventofcode.com/2022/day/5

const { log } = require('console');
const fs = require('fs');
const { last } = require('lodash');

const getSortedCleanColumns = columnsRaw =>
    columnsRaw.map(
        col => col.filter(x => !!x)
    ).map(column => column.reverse());

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const [schema, procedure] = data.split('\r\n\r\n');

    const schemaRe = new RegExp('(\\[([A-Z])\\]|[ 0-9]{3})( |[\r\n]|$)', 'g');
    const labels = [...schema.matchAll(schemaRe)];
    const colCount = Number(last(labels)[0]);

    const columnsRaw = Array(colCount);

    labels.slice(0, -colCount).forEach((label, index) => {
        if (index < colCount)
        {
            columnsRaw[index % colCount] = [];
        }
        columnsRaw[index % colCount].push(label[2]);
    });

    const columns = getSortedCleanColumns(columnsRaw);

    const proceduRe = new RegExp('move ([0-9]+) from ([0-9]+) to ([0-9]+)', 'g');
    const steps = [...procedure.matchAll(proceduRe)];

    steps.forEach(step => {
        const [_, count, from, to] = step;
        for (let i = 0; i < count; i++) {
            const moving = columns[from - 1].pop();
            columns[to - 1].push(moving);
        }
    });

    log(columns.map(col => last(col)).join(''));

    const columns9001 = getSortedCleanColumns(columnsRaw);

    steps.forEach(step => {
        const [_, count, from, to] = step;
        const moving = columns9001[from - 1].slice(-count);
        columns9001[from - 1] = columns9001[from - 1].slice(0, -count);
        columns9001[to - 1].splice(columns9001[to - 1].length, 0, ...moving);
    });

    log(columns9001.map(col => last(col)).join(''));
});