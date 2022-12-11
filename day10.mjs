import { readFile } from 'node:fs/promises';

console.log('AOC 2022 - Day #10');

const data = (await readFile('./input/day10.txt', 'utf8')).split(/\r?\n/);

let busy = false;
let commandIndex = 0;
let cycle = 0;
let x = 1;
const signals = [];

const display = [];
for (let i = 0; i < 6; i++) {
  const row = [];
  for (let i = 0; i < 40; i++) row.push('.');
  display.push(row);
}

while (commandIndex < data.length) {
  cycle++;
  if (cycle > 240) break;
  // console.log('cycle', cycle);

  // Part 2
  let currentRow = cycle <= 40
    ? 0
    : cycle % 40 === 0 ? Math.floor(cycle / 40) - 1 : Math.floor(cycle / 40);
  const maxRow = (currentRow + 1) * 40 - 40;
  const currentPixel = currentRow === 0 ? cycle - 1 : cycle - maxRow - 1;
  // console.log('pixel', currentPixel);
  const sprite = [x - 1, x, x + 1];
  // console.log('sprite', sprite);
  display[currentRow][currentPixel] = sprite.includes(currentPixel) ? '#' : '.';

  // Part 1
  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    console.log(`Cycle: ${cycle} | x: ${x}`);
    signals.push(cycle * x);
  }

  const [command, param] = data[commandIndex].split(' ');
  // console.log('command', command);
  // console.log('param', param);
  // console.log('busy', busy);

  if (command.trim() === 'addx') {
    if (!busy) {
      busy = true;
      continue;
    }
    x += Number(param);
    busy = false;
  }

  commandIndex++;

}

console.log(`Part 1: ${signals.reduce((acc, cur) => acc + cur, 0)}`);
console.log('Part 2:', display.map(r => r.join('')));
