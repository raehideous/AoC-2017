const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

let registers = {
	a: 0,
	b: 0,
	c: 0,
	d: 0,
	e: 0,
	f: 0,
	g: 0,
	h: 0
};
let mulCount = 0;
let i = 0;

function getVal(exp) {
	if (isNaN(parseInt(exp))) {
		return registers[exp];
	}
	return parseInt(exp);
}

while(i < input.length) {
	let [ins, A, B] = input[i].split(' ');
	switch(ins) {
		case 'set':
			registers[A] = getVal(B);
			break;
		case 'sub': 
			registers[A] -= getVal(B);
			break;
		case 'mul': 
			registers[A] *= getVal(B);
			mulCount++;
			break;
		case 'jnz': 
			A = getVal(A);
			if(A !== 0) {
				i += getVal(B);
				continue;
			}
			break;
	}

	i++;
}

console.log('Mul instructions: ', mulCount);


