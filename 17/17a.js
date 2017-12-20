let fs = require('fs')

let buffer = [0];
let step = 355;
let currPos = 0;
let i = 1;
while (i <= 2017) {
	currPos = (currPos + step) % buffer.length + 1;
	buffer.splice(currPos, 0, i);
	i++;
}


console.log(buffer[buffer.indexOf(2017) + 1]);
