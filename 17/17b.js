let fs = require('fs')
console.time('Spinlock');
let step = 355;
let currPos = 0;
let afterZero = 0;
let i = 1;

while (i <= 5E7) {
	currPos = (currPos + step) % i + 1;
	afterZero = currPos === 1 ? i : afterZero;
	i++;
}

console.log('Value after zero: ', afterZero);
console.timeEnd('Spinlock');