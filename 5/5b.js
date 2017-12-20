var fs = require('fs');

let textLines = [];
fs.readFile("input.txt", 'utf8', function (err, data) {
    if (err) throw err;

    numbers = data.split('\n');
    let sum = 0;
    let i = 0;

    console.log(numbers.length);
    while ( i < numbers.length ) {
    	let nextIndex = i + parseInt(numbers[i]);

    	if (parseInt(numbers[i]) >= 3) {
    		--numbers[i];
    	} else {
    		++numbers[i];
    	}
    	i = nextIndex;
    	sum++;
    }

    console.log('Sum: ', sum);
});


