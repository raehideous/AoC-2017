let genA = 634;
let genB = 301;

let i = 0;
let score = 0;

while (i < 4E7) {
	genA = (genA * 16807) % 2147483647 ;
	genB = (genB * 48271) % 2147483647 ;
	i++

	if ((genA & 0xFFFF) == (genB & 0xFFFF)) {
		score++;
	}
}
console.log(score);