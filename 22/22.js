const fs = require('fs');

const DIRS = ['U', 'R', 'D', 'L'];
const GRID_SIZE = 1000;
let grid = [];
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map( l => l.split(''));
const gridMid = GRID_SIZE / 2;
const inputMid = Math.floor(input.length / 2);
for(let y = 0; y < GRID_SIZE; y++) {
	grid[y] = [];
	for(let x = 0; x < GRID_SIZE; x++) {
		grid[y][x] = 0;
		
		if(y >= gridMid - inputMid && y <= gridMid + inputMid &&
			x >= gridMid - inputMid && x <= gridMid + inputMid) {
			let m = Math.abs(gridMid - y - inputMid);
			let n = Math.abs(gridMid - x - inputMid);
			grid[y][x] = input[m][n];
		}
	}
};

const INITIAL_POS = {
	x: GRID_SIZE / 2,
	y: GRID_SIZE / 2
};


function getNewDirection(curDir, val) {
	val += DIRS.length;
	let nextDirIdx = DIRS.indexOf(curDir) + val;
	nextDirIdx %= DIRS.length;
	return DIRS[nextDirIdx];
}

function getNewPos(y, x, dir) {

	switch(dir) {
		case 'D':
			y++;
			break;
		case 'R':
			x++;
			break;
		case 'U': 
			y--;
			break;
		case 'L':
			x--;
			break;
	}
	return {
		y: y,
		x: x
	};
}


let getVirusInfections = (nodes, cycles, position) => {
	let infectionalBursts = 0;
	let direction = 'U';

	let i = 0;
	while( i < cycles ) {
		let char = nodes[position.y][position.x];
		if(char == '#') {
			direction = getNewDirection(direction, 1);
			nodes[position.y][position.x] = '.';
		} else {// Virus is on clean node!
			direction = getNewDirection(direction, - 1);
			nodes[position.y][position.x] = '#';
			infectionalBursts++;
		}
		position = getNewPos(position.y, position.x, direction);
		i++;
	}
	return infectionalBursts;
}


let getEvolvedVirusInfections = (nodes, cycles, position) => {
	let infectionalBursts = 0;
	let direction = 'U';
	let i = 0;
	while( i < cycles ) {
		let char = nodes[position.y][position.x];

		if(char == '#') {
			direction = getNewDirection(direction, 1);
			nodes[position.y][position.x] = 'F';
		} else if(char == 'W') {// Virus is on clean node!
			nodes[position.y][position.x] = '#';
			infectionalBursts++;
		} else if(char == 'F') {
			direction = getNewDirection(direction, 2);
			nodes[position.y][position.x] = '.';
		} else {		//Clean
			direction = getNewDirection(direction, -1);
			nodes[position.y][position.x] = 'W';
		}
		position = getNewPos(position.y, position.x, direction);		
		i++;
	}
	return infectionalBursts;
}

let print = (grid, tolerance, pos) => {
	let initial = (grid.length - tolerance) / 2 ;
	let finish = (grid.length + tolerance) / 2;
	for(let m = initial; m < finish; m++) {
		let v = '';
		for(let k = initial; k < finish; k++) {
			v += ",";
			if(m === pos.y & k === pos.x) {
				v += '|';
			} 
			v += ' ' + grid[m][k];
		}
		console.log(v);
	}
	console.log('\n');
}

let gridA = JSON.parse(JSON.stringify(grid));
let posA = Object.assign({}, INITIAL_POS);
let virusInfections = getVirusInfections(gridA, 10000, posA);

let posB = Object.assign({}, INITIAL_POS);
let gridB = JSON.parse(JSON.stringify(grid));
let evolvedInfections = getEvolvedVirusInfections(gridB, 10000000, posB);


console.log('Virus infections: ', virusInfections);
console.log('Evolved virus infections: ', evolvedInfections)