let fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').split(',');
//console.log(input);


let x = 0, y = 0, z = 0;
let max = 0;
input.forEach( (el) => {
	if (el == "n") {
    y += 1
    z -= 1
  	}
  	if (el == "s"){
    y -= 1
    z += 1
  } 
  if( el == "ne") {
    x += 1
    z -= 1
  }
  if (el == "sw") {
    x -= 1
    z += 1
  }
  if (el == "nw") {
    x -= 1
    y += 1
  }if (el == "se") {
    x += 1
    y -= 1
}
	let cur = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2

	max = cur > max ? cur : max
})

let res = Math.abs(x) + Math.abs(y) + Math.abs(z)

console.log(res/2)
console.log(max);
