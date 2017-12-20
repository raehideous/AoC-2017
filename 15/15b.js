let genA = 634;
let genB = 301;

let i = 0;
let score = 0;

while (i < 5e6) {

	while(true) {
		genA = (genA * 16807) % 2147483647;

		if (genA % 4 == 0) break;
	}
	while(true) {
		genB = (genB * 48271) % 2147483647;
		if (genB % 8 == 0) break;
	}
	i++
	if ((genA & 0xFFFF) == (genB & 0xFFFF)) {
		score++;
	}
}

console.log(score);

