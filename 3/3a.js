let number = 361527;

let num = 2;
let lastOdd;
let nextOdd = 1;

let firstIndex = 1;
let lastIndex = 1;
let level = 0;

let arrValue;
let arrLength;
let found = false;
let myArray = [];
while (!found) {
	if(num % 2 !== 0) {
		level++;
		lastOdd = nextOdd;

		nextOdd = num;
		firstIndex = lastOdd * lastOdd;
		lastIndex = nextOdd * nextOdd;
		if(number > firstIndex && number <= lastIndex) {
			myArray.push(lastIndex);
			arrValue = firstIndex;
			arrLength = lastIndex - firstIndex;
			found = true;
		}
	}
	num++;
}


let numberIndex = 0;
for(let i = 0; i < arrLength; i++) {
	myArray.push(arrValue);
	if(arrValue === number) {
		numberIndex = i;
	}
	arrValue++;
}


let armLength = arrLength / 4;
let finalIndex = numberIndex % armLength;

let roadArr = [];
let levUp = level;
let levDown = level + 1;
for(let i = armLength / 2; i <= armLength; i++) {
	roadArr[i] = levUp;
	levUp++;
};

for(let i = armLength / 2 - 1; i >= 0; i--) {
	roadArr[i] = levDown;
	levDown++;
}

console.log(roadArr);
console.log('RESULT: ', roadArr[finalIndex]);