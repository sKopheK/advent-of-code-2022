// https://adventofcode.com/2022/day/12

const { log, table } = require('console');
const fs = require('fs');
const { clone, isEqual, split } = require('lodash');

const START = 'S';
const FINISH = 'E';
const START_ALTITUDE = 'a'.charCodeAt();
const FINISH_ALTITUDE = 'z'.charCodeAt();
// const MAX_DIFF = FINISH_ALTITUDE - START_ALTITUDE;
const MAX_DIFF = 1;

const serializeCoords = field => `${field.x}x${field.y}`;
const getCoords = coords => coords?.split('x').map(c => Number(c));

fs.readFile(__dirname + '\\input.txt', 'utf8', function(_,data) {
    const lines = data.split('\r\n');
    let current = { x: -1, y: -1 };
    let visited = [];
    const end = { x: -1, y: -1 };
    lines.forEach(function(line, lineIndex) {
        const startCol = line.indexOf(START);
        if (startCol !== -1) {
            current.x = startCol;
            current.y = lineIndex;
        }
        const endCol = line.indexOf(FINISH);
        if (endCol !== -1) {
            end.x = endCol;
            end.y = lineIndex;
        }
    });
    const landscape = lines.map(line => line.split('').map(altitude => {
        if (altitude === START) {
            return START_ALTITUDE;
        }
        if (altitude === FINISH) {
            return FINISH_ALTITUDE;
        }
        return altitude.charCodeAt();
    }));
    const landscapeWidth = lines[0].length;
    const landscapeHeight = lines.length;
    let step = 0;
    do {
        visited.push(serializeCoords(current));
        const xDiff = end.x - current.x;
        const yDiff = end.y - current.y;
        if (!xDiff && !yDiff) {
            break;
        }
        step += 1;
        const currentAltitude = landscape[current.y][current.x];
        const nextField = [];
        if (Math.abs(xDiff) >= Math.abs(yDiff)) {
            nextField.push(
                [Math.sign(xDiff), 0],
                [0, yDiff != 0 ? Math.sign(yDiff) : 1],
                [-Math.sign(xDiff), 0],
                [0, yDiff != 0 ? -Math.sign(yDiff) : -1],
            );
        }
        else {
            nextField.push(
                [0, Math.sign(yDiff)],
                [xDiff != 0 ? Math.sign(xDiff) : 1, 0],
                [0, -Math.sign(yDiff)],
                [xDiff != 0 ? -Math.sign(xDiff) : -1, 0],
            );
        }
        const next = clone(current);
        for (let altitudeDiff = 1; altitudeDiff >= -MAX_DIFF; altitudeDiff -= 1) {
            for (let i = 0; i < nextField.length; i += 1) {
                const [moveX, moveY] = nextField[i];
                const nextX = current.x + moveX;
                const nextY = current.y + moveY;
                const nextVisitedIndex = visited.indexOf(serializeCoords({x: nextX, y: nextY}));
                if (nextX < 0 || nextX >= landscapeWidth ||
                    nextY < 0 || nextY >= landscapeHeight ||
                    getCoords(visited[nextVisitedIndex - 1]) === serializeCoords(current))
                {
                    continue;
                }
                const fieldAltitude = landscape[current.y + moveY][current.x + moveX];
                if (fieldAltitude === currentAltitude + altitudeDiff) {
                    next.x = nextX;
                    next.y = nextY;
                    if (visited.indexOf(serializeCoords(next)) === -1) {
                        break;
                    }
                }
            }
            if (visited.indexOf(serializeCoords(next)) === -1) {
                current = clone(next);
                break;
            }
            if (altitudeDiff === -MAX_DIFF) {
                current = clone(next);
                break;
            }
        }
    } while (step < Number.MAX_VALUE);

    log(step);
});