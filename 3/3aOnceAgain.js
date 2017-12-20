let spiral = [1];
let armLength = 0;
let i =0;
let lvl = 0;
while(i < 25) {
	let nextNum = spiral[spiral.length - 1] + 1;
	spiral.push(nextNum);

	let sqrt = Math.sqrt(nextNum);
	if(nextNum % 2 !== 0 && Number.isInteger(sqrt)) {
		console.log('Next level!', ++lvl, sqrt);
		armLength = sqrt;
	}
	
	i++;
}