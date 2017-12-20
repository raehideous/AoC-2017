var fs = require('fs');

let textLines = [];
fs.readFile("input.txt", 'utf8', function(err, data) {
    if (err) throw err;

    numbers = data.split('\t').map(elem => parseInt(elem));

    let cycles = 0;
    let control = numbers.length * numbers.length;
    let cyclesArr = [0];
    let isFinished = false;
    let cycleIndex = 0;

    while (!isFinished) {
        let maxIndex = numbers.reduce((prev, curr, i, arr) => curr > arr[prev] ? i : prev, 0);
        let cycleId = numbers.reduce((prev, curr) => prev + '' + curr);

        let max = numbers[maxIndex];
        numbers[maxIndex] = 0;

        while (max > 0) {
            for (let i = maxIndex + 1; i < numbers.length; i++) {
                if (max > 0) {
                    numbers[i]++;
                    max--;
                }
            }
            for (let i = 0; i <= maxIndex; i++) {
               if (max > 0) {
                    numbers[i]++;
                    max--;
                }
            }
        }

        cyclesArr.forEach( (cycle, i ,arr) => {
            if(cycle === cycleId) {
                cycleIndex = i;
                isFinished = true;
                return;
            }

            if(i === arr.length - 1) {
                cyclesArr.push(cycleId);
            }
        });
    }

    cycleIndex = cyclesArr.length - cycleIndex - 1;
    console.log(cyclesArr.length - 2, cycleIndex);
});