import fs from 'node:fs';
import readline from 'node:readline';

console.log('AOC 2022 - Day #9');

const fileStream = fs.createReadStream('./input/day9.txt');
const rl = readline.createInterface({ input: fileStream });

const snake = {
    head: [0, 0],
    tail: [0, 0]
};
const lastHead = [0, 0];
const visitedSpots = ['0,0'];

function diff (axis) {
    const ax = axis === 'x' ? 0 : 1;
    return Math.abs(snake.head[ax]) - Math.abs(snake.tail[ax]);
}

function moveSnake(dir) {
    lastHead[0] = snake.head[0]
    lastHead[1] = snake.head[1];

    switch (dir) {
        case 'U': {
            // console.log(`moving ${part} up`);
            snake.head[1] = snake.head[1] + 1;
            break;
        }
        case 'D': {
            // console.log(`moving ${part} down`);
            snake.head[1] = snake.head[1] - 1;
            break;
        }
        case 'L': {
            // console.log(`moving ${part} left`);
            snake.head[0] = snake.head[0] - 1;
            break;
        }
        case 'R': {
            // console.log(`moving ${part} right`);
            snake.head[0] = snake.head[0] + 1;
            break;
        }
        default:
            console.log(`Invalid Direction: ${dir}`);
    }

    if (diff('x') > 1 || diff('y') > 1) {
        snake.tail[0] = lastHead[0];
        snake.tail[1] = lastHead[1];
    }

    visitedSpots.push(`${snake.tail[0]},${snake.tail[1]}`);
}

for await (const line of rl) {
    const [dir, spacesString] = line.split(' ');
    const spaces = Number(spacesString);
    console.log('line', { dir, spaces });

    for (let s = 0; s <= spaces - 1; s++) {
        moveSnake(dir);

        if (diff('x') > 1 || diff('y') > 1) { console.log('error'); }
        // console.log('xDiff', diff('x'));
        // console.log('yDiff', diff('y'));
    }
    console.log('h', snake.head);
    console.log('t', snake.tail);

}
const uniqueSpots = new Set(visitedSpots);
// console.log('visited', JSON.stringify(Array.from(uniqueSpots), null, 4));
console.log(`Part 1: ${uniqueSpots.size}`);
