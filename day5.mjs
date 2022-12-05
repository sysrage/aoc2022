import fs from 'node:fs';
import readline from 'node:readline';

console.log('AOC 2022 - Day #5');

const fileStream = fs.createReadStream('./input/day5.txt');
const rl = readline.createInterface({ input: fileStream });

// [J]             [F] [M]
// [Z] [F]     [G] [Q] [F]
// [G] [P]     [H] [Z] [S] [Q]
// [V] [W] [Z] [P] [D] [G] [P]
// [T] [D] [S] [Z] [N] [W] [B] [N]
// [D] [M] [R] [J] [J] [P] [V] [P] [J]
// [B] [R] [C] [T] [C] [V] [C] [B] [P]
// [N] [S] [V] [R] [T] [N] [G] [Z] [W]
//  1   2   3   4   5   6   7   8   9

const stacks = [
    ['N', 'B', 'D', 'T', 'V', 'G', 'Z', 'J'],
    ['S', 'R', 'M', 'D', 'W', 'P', 'F'],
    ['V', 'C', 'R', 'S', 'Z'],
    ['R', 'T', 'J', 'Z', 'P', 'H', 'G'],
    ['T', 'C', 'J', 'N', 'D', 'Z', 'Q', 'F'],
    ['N', 'V', 'P', 'W', 'G', 'S', 'F', 'M'],
    ['G', 'C', 'V', 'B', 'P', 'Q'],
    ['Z', 'B', 'P', 'N'],
    ['W', 'P', 'J']
];

const stacks2 = structuredClone(stacks);

for await (const line of rl) {
    if (!line.startsWith('move')) continue;
    const lineRegex = /move (\d+) from (\d+) to (\d+)/;
    const [, numToMove, src, dst] = line.match(lineRegex);

    // Part 1
    for (let i = 0; i < Number(numToMove); i++) {
        stacks[Number(dst) - 1].push(stacks[Number(src) - 1].pop());
    }

    // Part 2
    const pop = stacks2[Number(src) - 1].splice(0 - Number(numToMove), Number(numToMove));
    stacks2[Number(dst) - 1].push(...pop);
}

const top1 = stacks.map(s => s[s.length - 1]);
console.log(`Part 1: ${top1.join('')}`);

const top2 = stacks2.map(s => s[s.length - 1]);
console.log(`Part 2: ${top2.join('')}`);
