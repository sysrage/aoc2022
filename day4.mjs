import fs from 'node:fs';
import readline from 'node:readline';

console.log('AOC 2022 - Day #4');

const fileStream = fs.createReadStream('./input/day4.txt');
const rl = readline.createInterface({ input: fileStream });

let lineNumber = 0;
let count = 0;
let count2 = 0;
for await (const line of rl) {
    // Part 1
    lineNumber++;
    const [elf1, elf2] = line.split(',');
    const [elf1Low, elf1High] = elf1.split('-');
    const [elf2Low, elf2High] = elf2.split('-');

    const elf1Array = [];
    for (let i = Number(elf1Low); i <= Number(elf1High); i++) {
        elf1Array.push(i);
    }
    const elf2Array = [];
    for (let i = Number(elf2Low); i <= Number(elf2High); i++) {
        elf2Array.push(i);
    }

    if (elf1Array.every(id => elf2Array.includes(id)) || elf2Array.every(id => elf1Array.includes(id))) {
        count++;
    }
    if (elf1Array.some(id => elf2Array.includes(id)) || elf2Array.some(id => elf1Array.includes(id))) {
        count2++;
    }

}

console.log(`Part 1: ${count}`);

console.log(`Part 2: ${count2}`);
