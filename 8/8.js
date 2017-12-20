const fs = require('fs');

console.time('algoTime');
let registers = {};
let max = -Infinity;
let data = fs.readFileSync('./input.txt', 'utf8').split('\n').map((line) => line.split(' '))
    .map(line => {
        let operation = line[1];
        let val = +line[2];
        if (!registers[line[0]]) registers[line[0]] = 0;

        val = (line[1] === 'inc' ? 1 : -1) * val;

        let isTrue = false;

        switch (line[5]) {
            case '==':
                isTrue = (registers[line[4]] || 0) == line[6];
                break;
            case '!=':
                isTrue = (registers[line[4]] || 0) != line[6];
                break;

            case '<=':
                isTrue = (registers[line[4]] || 0) <= line[6];
                break;

            case '>=':
                isTrue = (registers[line[4]] || 0) >= line[6];
                break;

            case '<':
                isTrue = (registers[line[4]] || 0) < line[6];
                break;

            case '>':
                isTrue = (registers[line[4]] || 0) >= line[6];
                break;

            default:
                console.log('ooo, unsupported: ', condition);
                break;
        }

        if (isTrue) {
            registers[line[0]] += val;
            if (registers[line[0]] > max) max = registers[line[0]];
        }
    });


let latestMax = Object.values(registers).reduce((prev, curr) => curr > prev ? curr : prev);

console.log('First answer: ', latestMax);
console.log('Second answer: ', max);

console.timeEnd('algoTime');