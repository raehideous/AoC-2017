var fs = require('fs');

let textLines = [];
fs.readFile("input.txt", 'utf8', function (err, data) {
    if (err) throw err;

    numbers = data.split('\n');
    let sum = 0;
    let i = 0;

    console.log(numbers.length);
    while ( i < numbers.length ) {
    	
    	let nextIndex = i + parseInt(numbers[i]);;
    	++numbers[i];
    	i = nextIndex;
    	sum++;
    }

    console.log('SUm: ', sum);

});


