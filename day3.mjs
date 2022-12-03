import fs from 'node:fs';
import readline from 'node:readline';

console.log('AOC 2022 - Day #3');

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const fileStream = fs.createReadStream('./input/day3.txt');
const rl = readline.createInterface({ input: fileStream });

let sum = 0;
let sum2 = 0;
let curGroup = [];
for await (const line of rl) {
    // Part 1
    const left = line.slice(0, line.length / 2);
    const right = line.slice(line.length / 2);
    const wrongItem = left.split('').find(c => right.includes(c));
    sum += alpha.indexOf(wrongItem) + 1;

    // Part 2
    curGroup.push(line);
    if (curGroup.length === 3) {
        const badge = curGroup[0].split('').find(c => curGroup[1].includes(c) && curGroup[2].includes(c));
        sum2 += alpha.indexOf(badge);
        curGroup = [];
    }
}

console.log(`Part 1: ${sum}`);

console.log(`Part 2: ${sum2}`);
