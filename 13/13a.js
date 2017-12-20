let fs = require('fs');
console.time('Calculating severity...');
let input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

let layers =[];

input.forEach( el => {
	let [depth, range] = el.split(': ');
	let obj = {
		r: +range,
		s: 0,
		v: 1
	};

	layers[depth] = obj;
});

let i = 0;

let checkIdx = -1;
let scannersThatCaught = [];

while(true) {

	checkIdx++;
	let layerToCheck = layers[checkIdx];

	if (layerToCheck && layerToCheck.s === 0) {
		scannersThatCaught.push(checkIdx);
	}

	for(i = 0; i < layers.length; i++) {
		let layer = layers[i];

		if(layer) {
			if(layer.s === layer.r - 1) {
				layer.v = -1;
			} else if (layer.s === 0) layer.v = 1;

			layer.s += layer.v;
		}
	}



	if(checkIdx === layers.length -1) break;
}

let severity = 0;
scannersThatCaught.forEach( layer => {
	console.lo
	severity += layer * layers[layer].r;
})
console.log('Scanners that caught: ', scannersThatCaught);
console.log('Severity: ', severity)
console.timeEnd('Calculating severity...');
