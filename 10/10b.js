let fs = require('fs');

let inputLengths = fs.readFileSync('input.txt', 'utf8').split('').map( c => c.charCodeAt(0) ).concat([17, 31, 73, 47, 23]);
let numsList = Array.from(Array(256).keys());

	
function doKnot(list, lengths, currPos, skipSize) {

    lengths.forEach((currLen, idx) => {
        let reversedSubArr = [];

        for (let x = 0; x < currLen; x++) {
            let i = (currPos + x) % list.length;
            reversedSubArr.unshift(list[i]);
        }

        for (let x = 0; x < currLen; x++) {
            let i = (currPos + x) % list.length;
            list[i] = reversedSubArr[x];
        }

        currPos = (currPos + currLen + skipSize) % list.length;
        skipSize++;
    });
    return [list, currPos, skipSize];
}


function fullKnotHash(list, lengths) {
	let rounds = 64;
	let skipSize = 0, currPos = 0;
	for(let i = 0; i < rounds; i++) {
		[list, currPos, skipSize] = doKnot(list, lengths, currPos, skipSize);
		
	}
	let sparseArr = [];

	for (let i = 0; i < list.length; i += 16) {
		sparseArr.push(list.slice(i, i + 16).reduce( (p, c) => p ^ c));
	}

	return sparseArr.map( e =>  {
		e = e.toString(16);
		return e.length === 1 ? '0' + e : e
	}).reduce((p,c) => p+c);

}

let res = fullKnotHash(numsList, inputLengths);
console.log(res);