var lines = require('fs').readFileSync('./data.txt', 'utf-8')
    .split('\n');
 console.log(lines[2]);
let checkSum = 0;

 for(let i = 0; i < lines.length; i++) {
 	let lineValues = lines[i].split('\t');
 	console.log("LINIA:");
 	let max = Math.max.apply(null, lineValues);
 	let min = Math.min.apply(null, lineValues);
 	console.log(max, min);
 	checkSum += (max - min);
 	/*lineValues.forEach((val) => {
 		console.log(val);
 	})*/
 }
 console.log('Check sum: ', checkSum);