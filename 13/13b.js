let fs = require('fs');
console.time('Calculating delay...');
let input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

let layers =[];

input.forEach( el => {
	let [depth, range] = el.split(': ');
	layers[depth] = +range;
});


let getScannerPos = (r, cycle) => {
	let scannerPos;
	let fullScans = parseInt(cycle  / (r - 1) );
	if(fullScans % 2 === 0) {	
		scannerPos = cycle - ((r - 1) * fullScans);
	} else {	
		scannerPos = r - (cycle - r * fullScans) - 1;
	}
	return scannerPos;
}

let delay = 0;
let i = 0;
let caught = false;

while (true) {
	if (i === layers.length) break;

	let r = layers[i];
	let cycle  = i + delay;
	if(r) {
		let scannerPos = getScannerPos(r, cycle);
		if (scannerPos === 0) caught = true;
	}

	i++;
	if (caught) {
		i = 0;
		++delay;
		caught = false;
	}

}


console.log('Delay: ', delay);
console.timeEnd('Calculating delay...');
