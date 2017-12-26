/*
b = 81
c = b
a != 0 ? GOTO A
GOTO B

A: b = b * 100 - -100000
c = b - -17000

B: f = 1
d = 2
E: e = 2
D: g = d * e - b
g != 0 ? GOTO C
f = 0
C: e = e - -1
g = e - b
g != 0 ? GOTO D
d = d - -1
g = b - d
g != 0 ? GOTO E
f != 0 ? GOTO F
h = h - -1
F: g = b - c
g != 0 ? GOTO G
END
G: b -= -17
GOTO B
*/

//Hardstyle mode: 
/*
let a = 1, b = 0, c = 0, d = 0, e = 0, f = 0, h = 0;
b = 81;
c = b;
if( a != 0) {
	b = b * 100 - (-100000);
	c = b - (-17000)
}
while(true) {
	f = 1;
	d = 2;

	do {
		e = 2;
		do {
			if (d * e == b) f = 0;
			e -= (-1);
		} while ( e != b)
		d -= (-1);
	} while (b != d);

	if(f == 0) h -= (-1);

	if (b == c) break;
	b -= (-17);
}

console.log('Value of H register: ', h);
*/
//Oh, really?

let number = 81 * 100 + 100000;
let finish = number + 17000;
let founds = 0;
for(let i = number; i <= finish; i += 17) {
	let d = 2;
	while( i % d != 0) d++;
	if (d != i) founds++;
}

console.log('Value of H register: ', founds);