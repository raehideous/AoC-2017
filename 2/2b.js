var lines = require('fs').readFileSync('./data.txt', 'utf-8')
    .split('\n');

let sum = 0;
//getEvenDivision(lines[0].split('\t'));

 for(let i = 0; i < lines.length; i++) {
 	let lineValues = lines[i].split('\t');
 	console.log("LINIA:");
 	sum += getEvenDivision(lineValues);
 }
 console.log('Check sum: ', sum);


function getEvenDivision(arr){


	for(let i = 0; i < arr.length; i++){
		let firstNumber = arr[i];

		for(let j = 0; j < arr.length; j++) {
			let secondNumber = arr[j];
			if (i !== j) {
				let division = firstNumber / secondNumber;
				if(division % 1 === 0)
					return division;
			} 
		}

	}

	return 0;
}
