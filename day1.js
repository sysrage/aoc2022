'use strict';
const { readFile } = require('node:fs/promises');

(async () => {

    console.log('AOC 2022 - Day #1');

    const data = await readFile('input/day1.txt', 'utf8');
    const elfData = data.split('\r\n\r\n').map(e => e.split('\r\n'));
    const totals = [];
    for (const elf of elfData) {
        totals.push(elf.reduce((acc, curr) => acc + Number(curr), 0));
    }

    const sortedTotals = totals.sort().reverse();
    console.log(`Part 1: ${sortedTotals[0]}`);

    const topThree = sortedTotals[0] + sortedTotals[1] + sortedTotals[2];
    console.log(`Part 2: ${topThree}`);

})();
