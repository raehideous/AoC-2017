let file = require('./data.json');
let data = file.data;
let sum = 0;
let offset = data.length / 2;


for(let i = 0; i < data.length / 2 - 1; i++) {
	let indexToCmp = i + offset;

	if(data[i] === data[indexToCmp]) {
		sum+= 2 *parseInt(data[i]);
	}
}

console.log(sum);

