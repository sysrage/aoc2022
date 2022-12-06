import { readFile } from 'node:fs/promises';

console.log('AOC 2022 - Day #6');

const inputData = (await readFile('./input/day6.txt', 'utf8')).trim();

const buffer = [];
for (let i = 0; i < inputData.length; i++) {
    if (buffer.length < 4) {
        buffer.push(inputData[i]);
        if (buffer.length < 4) continue;
    }

    if (new Set(buffer).size === buffer.length) {
        console.log(`Part 1: ${i + 1}`);
        break;
    }

    buffer.shift();
}

buffer.splice(0);
for (let i = 0; i < inputData.length; i++) {
    if (buffer.length < 14) {
        buffer.push(inputData[i]);
        if (buffer.length < 14) continue;
    }

    if (new Set(buffer).size === buffer.length) {
        console.log(`Part 2: ${i + 1}`);
        break;
    }

    buffer.shift();
}
