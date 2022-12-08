// https://adventofcode.com/2022/day/8

const { log } = require('console');
const fs = require('fs');
const { max } = require('lodash');

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const lines = data.matchAll(/[0-9]/g);
    const trees = [...lines].map(a => Number(a[0]));
    const size = trees.length;
    const side = Math.sqrt(size);

    const visibleTrees = trees.reduce((curry, height, index) => {
        const treesToNorth = trees.filter((_, i) => i < index && i % side === index % side);
        const treesToSouth = trees.filter((_, i) => i > index && i % side === index % side);
        const treesToWest = trees.filter((_, i) => i < index && i >= index - (index % side));
        const treesToEast = trees.filter((_, i) => i > index && i <= index + (side - 1 - (index % side)));
        return curry
            + ((!treesToNorth.length || (max(treesToNorth) ?? 0) < height
                || !treesToSouth.length || (max(treesToSouth) ?? 0) < height
                || !treesToWest.length || (max(treesToWest) ?? 0) < height
                || !treesToEast.length || (max(treesToEast) ?? 0) < height
            ) ? 1 : 0);
    }, 0);

    log(visibleTrees);
});