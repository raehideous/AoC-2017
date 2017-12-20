var fs = require('fs');

let textLines = [];
fs.readFile("input.txt", 'utf8', function (err, data) {
    if (err) throw err;

    textLines = data.split('\n');

    let validCount = 0;

    textLines.forEach(
    	(line) => {
    		let words = line.split(' ');

    		let firstElem = sortString(words[0]);
    		let initialArr = words.slice(1);
    		let res = checkArrayForDuplicates(firstElem, initialArr);

    		validCount += res;
    	});

    console.log("results: ", validCount);
});


function checkArrayForDuplicates(element, array) {
	if(array.length === 0) {
		return 1;
	}
	for(let i = 0; i < array.length; i++) {
        console.log('Comparing: ', element, ' and ', sortString(array[i]));
		if(element === sortString(array[i])) return 0;
	};

	let newElem = sortString(array[0]);
	let newArr = array.slice(1);


	return checkArrayForDuplicates(newElem, newArr);
}

function sortString(string) {
    let sorted = string.split('').sort();
    return sorted.join();
}