import fs from 'node:fs';
import readline from 'node:readline';

console.log('AOC 2022 - Day #7');

const fileStream = fs.createReadStream('./input/day7.txt');
const rl = readline.createInterface({ input: fileStream });

const dirs = {};
let curDir = [];
let dirSize = 0;
let isList = false;

function addToParents (size) {
    const curParents = curDir.slice(0, curDir.length - 1);
    while (curParents.length) {
        // console.log('++ adding to', curParents.join('/'));
        dirs[curParents.join('/')] += size;
        curParents.splice(curParents.length - 1, 1);
    }
    dirs[''] += size;
}

for await (const line of rl) {
    // console.log('line', line);
    if (line.startsWith('$')) {
        const wasList = isList;
        isList = line.startsWith('$ ls');
        if (wasList && !isList) {
            // console.log('finished ls - adding', dirSize);
            dirs[curDir.join('/')] = dirSize;
            addToParents(dirSize);
            dirSize = 0;
        }
    }

    if (isList) {
        const sizeMatch = line.match(/^([0-9]+) (.+)/);
        if (sizeMatch) {
            dirSize += Number(sizeMatch[1]);
        }
    }


    if (line.startsWith('$ cd')) {
        const nav = line.substring(5);
        if (nav === '/') {
            curDir.splice(0);
        } else if (nav === '..') {
            curDir.splice(curDir.length - 1, 1);
        } else {
            curDir.push(nav);
        }
        // console.log('curDir', curDir);
    }
    // if (!isList) console.log('=== dirs', dirs);
}

const bigDirs = Object.keys(dirs).filter(d => d !== '' && dirs[d] <= 100000).map(d => dirs[d]);
console.log(`Part 1: ${bigDirs.reduce((acc, cur) => acc += cur, 0 )}`);

const totalDiskSize = 70000000;
const freeSpace = totalDiskSize - dirs[''];
const shortSpace = 30000000 - freeSpace;
console.log('free', freeSpace);
console.log('short', shortSpace);
const bigEnough = Object.keys(dirs)
    .filter(d => d !== '' && dirs[d] >= shortSpace)
    .map(d => ({ dir: d, size: dirs[d] }))
    .sort((a, b) => a.size - b.size);
console.log('bigEnough', bigEnough);

console.log(`Part 2: ${bigEnough[0].size}`);
