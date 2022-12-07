// https://adventofcode.com/2022/day/7

const { log } = require('console');
const fs = require('fs');
const { set, get, filter, forEach, sum } = require('lodash');

const MAX_SIZE = 100000;

const getDirSizes = (tree, sizeTree = {}, path = '') => {
    forEach(tree, (node, name) => {
        if (typeof node === 'object') {
            const namePath = path + `[${name}]`;
            const fileSizes = sum(filter(node, (dirItem) => typeof dirItem !== 'object'));
            getDirSizes(node, sizeTree, namePath);
            sizeTree[namePath] = fileSizes;
            forEach(node, (dirItem, dirName) => {
                if (typeof dirItem === 'object') {
                    sizeTree[namePath] += sizeTree[namePath + `[${dirName}]`];
                }
            })
        }
    });
    return sizeTree;
};

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const lines = data.split('\r\n');
    const tree = {
        '/': {},
    };
    let currentPath = '';
    lines.forEach(function(line) {
        const cmdMatch = line.match(/^\$ ([a-z]+)($| (.+))/);
        if (cmdMatch) {
            const [_, cmd, _2, arg] = cmdMatch;
            if (cmd === 'cd') {
                if (arg === '..') {
                    currentPath = currentPath.replace(/\[[a-z]+\]$/, '');
                }
                else {
                    currentPath += `[${arg}]`;
                }
            }
            // else if (cmd === 'ls') {

            // }
        }
        else {
            const dirMatch = line.match(/^dir ([a-z]+)$/);
            if (dirMatch) {
                const [ _, dirname ] = dirMatch;
                if (!get(tree, currentPath + `[${dirname}]`)) {
                    set(tree, currentPath + `[${dirname}]`, {});
                }
            }
            else {
                const [ _, size, filename ] = line.match(/^([0-9]+) ([a-z.]+)$/);
                set(tree, currentPath + `[${filename.replace('.', '_')}]`, Number(size));
            }
        }
    });
    const dirSizes = getDirSizes(tree);
    log(sum(filter(dirSizes, size => size < MAX_SIZE)));
});