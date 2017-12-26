const fs = require('fs');

let input = fs.readFileSync('test.txt', 'utf8').split('\r\n').map( e => e.split('/'));


function getBridge(component, components, idx) {
	let bridges = [];
	components = components.splice(components.indexOf(component), 1);
	components = JSON.parse(JSON.stringify(components));
	

	let c = components.

	return bridge;
}

function getAllBridges(components) {
	let bridges = [];

	components.forEach( (c, i) => {
		let bridge = getBridges(c, JSON.parse(JSON.stingfy(components)), i);
		bridges.push(bridge);
	});

	return bridges;
};

let bridges = getAllBridges(input);
console.log(bridges);