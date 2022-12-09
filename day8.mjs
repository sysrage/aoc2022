import fs from 'node:fs';
import readline from 'node:readline';

console.log('AOC 2022 - Day #8');

const fileStream = fs.createReadStream('./input/day8.txt');
const rl = readline.createInterface({ input: fileStream });

const forest = [];
for await (const line of rl) {
    forest.push(line.split('').map(n => Number(n)));
}

// Part 1
const border = (forest.length * 2) + ((forest[0].length - 2) * 2);
let visibleTrees = border;
for (let y = 1; y < forest.length - 1; y++) {
    for (let x = 1; x < forest[0].length - 1; x++) {
        const tree = forest[y][x];

        // Check Left
        let visible = true;
        for (let checkX = x - 1; checkX >= 0; checkX--) {
            if (forest[y][checkX] >= tree) {
                visible = false;
                break;
            }
        }
        if (visible) {
            visibleTrees++;
            continue;
        }

        // Check Right
        visible = true;
        for (let checkX = x + 1; checkX < forest[y].length; checkX++) {
            if (forest[y][checkX] >= tree) {
                visible = false;
                break;
            }
        }
        if (visible) {
            visibleTrees++;
            continue;
        }

        // Check Up
        visible = true;
        for (let checkY = y - 1; checkY >= 0; checkY--) {
            if (forest[checkY][x] >= tree) {
                visible = false;
                break;
            }
        }
        if (visible) {
            visibleTrees++;
            continue;
        }

        // Check Down
        visible = true;
        for (let checkY = y + 1; checkY < forest.length; checkY++) {
            if (forest[checkY][x] >= tree) {
                visible = false;
                break;
            }
        }
        if (visible) {
            visibleTrees++;
            continue;
        }
    }
}

console.log(`Part 1: ${visibleTrees}`);


// Part 2
let highScore = 0;
let winnerX, winnerY;
for (let y = 1; y < forest.length - 1; y++) {
    for (let x = 1; x < forest[0].length - 1; x++) {
        const tree = forest[y][x];

        // Check Left
        let treeCountL = 0;
        for (let checkX = x - 1; checkX >= 0; checkX--) {
            treeCountL++;
            if (forest[y][checkX] >= tree) break;
        }

        // Check Right
        let treeCountR = 0;
        for (let checkX = x + 1; checkX < forest[y].length; checkX++) {
            treeCountR++;
            if (forest[y][checkX] >= tree) break;
        }

        // Check Up
        let treeCountU = 0;
        for (let checkY = y - 1; checkY >= 0; checkY--) {
            treeCountU++;
            if (forest[checkY][x] >= tree) break;
        }

        // Check Down
        let treeCountD = 0;
        for (let checkY = y + 1; checkY < forest.length; checkY++) {
            treeCountD++;
            if (forest[checkY][x] >= tree) break;
        }

        const treeScore = treeCountL * treeCountR * treeCountU * treeCountD;
        if (treeScore > highScore) {
            highScore = treeScore;
            winnerX = x;
            winnerY = y;
        }
    }
}

console.log(`Part 2: ${highScore}`);
