console.time('Permutation Promenade');
let programs = "abcdefghijklmnop".split('');
let fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8').split(',');

function spin(x, arr) {
	x = x * 1;
	let back = arr.slice(arr.length - x);
	let front = arr.slice(0, arr.length - x);
	let res = back.concat(front);
	return res
};

function partner(prog1, prog2, arr) {
	let idx1 = arr.indexOf(prog1);
	let idx2 = arr.indexOf(prog2) 
	arr[idx1] = prog2;
	arr[idx2] = prog1;
	return arr;
};

function exchange(idx1, idx2, arr) {
	idx1 = idx1 * 1; 
	idx2 = idx2 * 1;
	let prog1 = arr[idx1];
	let prog2 = arr[idx2];
	arr[idx1] = prog2;
	arr[idx2] = prog1;
	return arr;
};

function dance(programs, instructions) {
	let danced = programs;

	instructions.forEach( ins => {
		if(ins[0] === 's') {
			ins = ins.substring(1);
			danced = spin(ins, danced);
		} else if (ins[0] ==='x') {
			ins = ins.substring(1).split('/');
			danced = exchange(ins[0], ins[1], danced);
		} else if (ins[0] === 'p') {
			ins = ins.substring(1).split('/');
			danced = partner(ins[0], ins[1], danced);
		}

	});

	return danced;
};

console.log('After dance: ', dance(programs, input).join(''));

let dancesHash = [];
let newDance = programs;
let repeatIndex;
while(true) {
	newDance = dance(newDance, input);
	let hash = newDance.join('');
	if(dancesHash.includes(hash)) {
		repeatIndex = dancesHash.length;
		break;
	} else {
		dancesHash.push(hash);
	}
}

let afterBilion = 1E9 % repeatIndex;
console.log('After bilion dances: ', dancesHash[afterBilion - 1]);
console.timeEnd('Permutation Promenade');



