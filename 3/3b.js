

let initialValue = 1;
let spiral = [1];
let PUZZLE_INPUT = 23;

while(true) {
	let nextNumber = getNextNumber(spiral);

	if(nextNumber > PUZZLE_INPUT) {
		console.log('Number after 23 is: ', nextNumber);
		break;
	} else {
		spiral.push(nextNumber);
	}
}


function getNextNumber(spiral) {
	let nextNumber = spiral[spiral.length - 1];
	let numberPos = getNumberPos(nextNumber);

}