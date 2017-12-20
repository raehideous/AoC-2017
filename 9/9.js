const fs = require('fs');
let input = fs.readFileSync("./input.txt").toString('utf-8').trim();


function findScore(inp) {


	let isGarbage = false;
	let score = 0;
	let scoreMul = 1;
	let garbages = 0;
	let i = 0;
	let nonCacelledGarbageChars = 0;
	while (i < input.length)
	{
		let char = input[i];
		if (char == '!') i++
		else if  (isGarbage && char != '>' ) garbages++
		else if (char == '<') isGarbage = true
		else if (char == '>') isGarbage = false
		else if (char == '{') score += scoreMul++
		else if (char == '}') scoreMul-- 
		else if (isGarbage) {
			nonCacelledGarbageChars++;
		}
		i++;
	}

	console.log(score, garbages);
}

findScore(input);

