const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').split("\n").map(c=>c.split(" <-> "));

input = input.map( el => {
	let obj = {};
	obj.p = +el.shift();
	obj.c = el.shift().split(', ').map(e => +e);
	return obj;
});


function markConnected(program) {
	if (program.searched) return;
	program.searched = true;
	program.c.forEach( c => {
		let idx = input.findIndex( e => e.p == c);
		markConnected(input[idx]);
	});
}

markConnected(input[0]);
let res = 0;
input.forEach( e => {
	if (e.searched) res++;
});
console.log('Zero programs: ', res);


let groups = 1;
input = input.filter( e => !e.searched );

while (input[0]) {
	markConnected(input[0]);
	input = input.filter( e => !e.searched );
	groups++;
}

console.log('Groups: ', groups)