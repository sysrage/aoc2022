import fs from 'node:fs';
import readline from 'node:readline';

// A/X = Rock = 1 Point
// B/Y = Paper = 2 Points
// C/Z = Scissors = 3 Points

const win = {
    'Y': 'A',
    'Z': 'B',
    'X': 'C',
};

const lose = {
    'Z': 'A',
    'X': 'B',
    'Y': 'C'
};

const points = {
    'X': 1,
    'Y': 2,
    'Z': 3,
};

console.log('AOC 2022 - Day #2');

const fileStream = fs.createReadStream('./input/day2.txt');
const rl = readline.createInterface({ input: fileStream });

let score = 0;
for await (const line of rl) {
    const [ oponent, player ] = line.split(' ');
    if (oponent === win[player]) {
    score += 6 + points[player];
    } else if (oponent === lose[player]) {
    score += points[player];
    } else {
    score += 3 + points[player];
    }
}

console.log(`Part 1: ${score}`);


// console.log(`Part 2: ${topThree}`);
