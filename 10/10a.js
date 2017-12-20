let fs = require('fs');

let inputLengths = fs.readFileSync('input.txt', 'utf8').split(',').map( c => +c ).concat([17, 31, 73, 47, 23]);
let numsList = Array.from(Array(256).keys());


function getKnot(list, lengths) {

    let currPos = 0,
        skipSize = 0;
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
    return list;
}

let result = getKnot(numsList, inputLengths);

console.log(result[0] * result[1]);