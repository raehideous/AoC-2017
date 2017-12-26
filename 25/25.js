const STEPS = 12317297;
let state = 'A';

let tape = [0];
let idx = 0;


let i = 0;
while (i < STEPS) {

	switch (state) {
		case 'A': 
			if(tape[idx] === 0) {
				tape[idx] = 1;
				idx++;
				state = 'B';
			} else {
				tape[idx] = 0;
				idx--;
				state = 'D';
			}
			break;

		case 'B': 
			if(tape[idx] === 0) {
				tape[idx] = 1;
				state = 'C';
			} else {
				tape[idx] = 0;
				state = 'F';
			}

			idx++;
			break;

		case 'C': 
			if(tape[idx] === 1) state = 'A';
			tape[idx] = 1;
			idx--;
			break;

		case 'D': 
			if(tape[idx] === 0) {
				idx--;
				state = 'E';
			} else {
				idx++;
				state = 'A';
			}
			break;

		case 'E': 
			if(tape[idx] === 0) {
				tape[idx] = 1;
				idx--;
				state = 'A';
			} else {
				tape[idx] = 0;
				idx++;
				state = 'B';
			}
			break;

		case 'F': 
			if (tape[idx]=== 0) {
				state = 'C';
			} else state = 'E';
			tape[idx] = 0;
			idx++;
			break;
	}


	if(idx === -1) {
		idx = 0;
		tape.unshift(0);
	} else if(!tape[idx]) {
		tape.push(0);
	}

	i++;
}

let checkSum = tape.reduce( (p,c) => p + c);
console.log(checkSum)