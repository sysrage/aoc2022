import fs from 'node:fs';
import readline from 'node:readline';

// A/X = Rock = 1 Point
// B/Y = Paper = 2 Points
// C/Z = Scissors = 3 Points

// X = Lose
// Y = Draw
// Z = Win

const win = {
    'Y': 'A',
    'Z': 'B',
    'X': 'C',
};

const lose = {
    'Z': 'A',
    'X': 'B',
    'Y': 'C',
};

const points = {
    'A': 1,
    'B': 2,
    'C': 3,
    'X': 1,
    'Y': 2,
    'Z': 3,
};

const moveMap = {
    'X': 'A',
    'Y': 'B',
    'Z': 'C',
};

console.log('AOC 2022 - Day #2');

const fileStream = fs.createReadStream('./input/day2.txt');
const rl = readline.createInterface({ input: fileStream });

let score = 0;
let score2 = 0;
for await (const line of rl) {
    const [ oponent, player ] = line.split(' ');

    // Part 1
    if (oponent === win[player]) {
        // Player Wins
        score += 6 + points[player];
    } else if (oponent === lose[player]) {
        // Oponent Wins
        score += points[player];
    } else {
        // Draw
        score += 3 + points[player];
    }

    // Part 2
    if (player === 'X') {
        // need to lose
        const playerMove = moveMap[Object.entries(lose).filter(([key, val]) => val === oponent)[0][0]];
        score2 += points[playerMove];
    } else if (player === 'Y') {
        // need to tie
        const playerMove = oponent;
        score2 += 3 + points[playerMove];
    } else {
        // need to win
        const playerMove = moveMap[Object.entries(win).filter(([key, val]) => val === oponent)[0][0]]
        score2 += 6 + points[playerMove];
    }
}

console.log(`Part 1: ${score}`);

console.log(`Part 2: ${score2}`);
