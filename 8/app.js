// https://adventofcode.com/2022/day/8

const { log } = require('console');
const fs = require('fs');
const { max, reduce, findIndex } = require('lodash');

const getTreeHeightsCardinals = (trees, index) => {
    const side = Math.sqrt(trees.length);
    return {
        n: trees.filter((_, i) => i < index && i % side === index % side).reverse(),
        s: trees.filter((_, i) => i > index && i % side === index % side),
        w: trees.filter((_, i) => i < index && i >= index - (index % side)).reverse(),
        e: trees.filter((_, i) => i > index && i <= index + (side - 1 - (index % side))),
    }
};

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const lines = data.matchAll(/[0-9]/g);
    const trees = [...lines].map(a => Number(a[0]));

    const visibleTrees = trees.reduce((carry, height, index) => {
        return carry + (
            reduce(
                getTreeHeightsCardinals(trees, index),
                (isVisible, treesInDirection) => isVisible || !treesInDirection.length || (max(treesInDirection) ?? 0) < height,
                false
            ) ? 1 : 0
        );
    }, 0);
    log(visibleTrees);

    const scenicScores = trees.map((height, index) =>
        reduce(
            getTreeHeightsCardinals(trees, index),
            (score, treesInDirection) => {
                const closestTreeSameHeightOrHigher = findIndex(treesInDirection, treeHeight => treeHeight >= height);
                return score * Math.max(
                    closestTreeSameHeightOrHigher === -1
                        ? treesInDirection.length
                        : closestTreeSameHeightOrHigher + 1,
                    1
                );
            },
            1   // simplification - each tree will have score of 1 at least
        )
    , 0);
    log(max(scenicScores));
});