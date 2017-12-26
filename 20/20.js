const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').trim()
			.split('\r\n').map(c => c.split(', ')
			.map(a => a.slice(3).slice(0,-1).split(',').map(Number)));

const TOLERANCE = 1000;

let getPos = ([x, y, z], [dx, dy, dz]) => [x + dx, y + dy, z + dz];
let getDist = ([x, y, z]) => Math.abs(x) + Math.abs(y) + Math.abs(z);

let getClosestToZero = particles => {
	let dists = [];

	for(let i = 0; i < TOLERANCE; i++) {
		particles.forEach( (particle, idx) => {
			let position = particle[0];
			let velocity = particle[1];
			let acceleration = particle[2];

			particle[1] = getPos(velocity, acceleration);
			particle[0] = getPos(position, particle[1]);

			dists[idx] = getDist(particle[0]);
		});

	}

	return dists.indexOf(Math.min(...dists))
};

let getCollisionsNum = particles => {
	let cols = [];

	for(let i = 0; i < TOLERANCE; i++) {
		particles.forEach( (particle, idx) => {
			let position = particle[0];
			let velocity = particle[1];
			let acceleration = particle[2];

			particle[1] = getPos(velocity, acceleration);
			particle[0] = getPos(position, particle[1]);

			cols.push(particle[0].join('/'));
		});

		cols.forEach( (el, i) => {
			let idx = cols.indexOf(el);
			if(idx != i) {
				particles[i] = null;
				particles[idx] = null;
			}
		});
		cols = [];	
		particles = particles.filter( el => el != null);

	}

	return particles.length;

}
console.log('Closest to zero point: ', getClosestToZero(JSON.parse(JSON.stringify(input))));
console.log('Number of collisions: ', getCollisionsNum(JSON.parse(JSON.stringify(input))));