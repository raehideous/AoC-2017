const fs = require('fs');

console.time('algoStart');

let input = fs.readFileSync('input.txt', 'utf8').split("\n").map(c=>c.split(" -> "));

input = input.map( el => {
	let obj = {};
	let front = el.shift().split(' (');
	obj.n = front.shift();
	obj.w = front.shift().slice(0, -1) * 1;
	let back = el.shift();
	if (back) obj.c = back.split(', ');
	return obj;
});


let getNodeLength = node => {
	let curLen = 1;

	let childs = node.c;

	if (childs) {
		childs.forEach( c => {
			let idx = input.findIndex( e => e.n == c);
			curLen += getNodeLength(input[idx]);
		})
	}

	return curLen;
};


let getLongestNode = nodes => {

	let dArr = [];
	nodes.forEach( node => {
		let obj = {
			n: node.n,
			d: 0
		};

		let curD = 0;

		if(node.c) {
			curD = node.c.length;

			node.c.forEach( c => {
				let idx = input.findIndex( e => e.n == c);
				curD += getNodeLength(input[idx]);
			});
		}

		obj.d = curD;

		dArr.push(obj);

	});

	return dArr;
};


let longestNode = getLongestNode(input).reduce( (p, c) => p.d > c.d ? p : c);
console.log('Root node: ', longestNode);


let getTotalNodeWeight = node => {
	let curW = node.w;
	let childs = node.c;
	if(childs) {
		childs.forEach( c => {
			let idx = input.findIndex( e => e.n == c);
			curW += getTotalNodeWeight(input[idx]);
		})
	}
	return curW;
};



let badNode = input[input.findIndex( e => e.n == longestNode.n)];
let found = false;
let correctWeight;

while(!found) {
	let children = badNode.c;
	let corrIdx = 0;
	let occurences = [];
	let childsObjs = [];
	if (children) {
		let prevPrevRes, prevIdx, prevRes, prevPrevIdx, BADIDX;
		for(let i = 0; i < children.length; i++) {
			let c = children[i];

			let idx = input.findIndex( e => e.n == c);
			let res = getTotalNodeWeight(input[idx]);
			let obj = {
				idx: idx,
				res: res
			};
			if(occurences[res]) {
				occurences[res]++;
			} else occurences[res] = 1;

			childsObjs.push(obj);

		}
		let badChild;
		for(let i = 0; i < occurences.length; i++) {
			if (occurences[i] === 1) {
				for (let j = 0; j < childsObjs.length; j++) {
					if (childsObjs[j].res === i) {
						badChild = input[childsObjs[j].idx];
						badNode = badChild;
						i = occurences.length;
						break;
					}
				}
			}
		}


		if (!badChild) {
				console.log(badNode, correctWeight);
				let badWeight = getTotalNodeWeight(badNode);
				let RESULT = badWeight - correctWeight;
				console.log('RESULT: ', badNode.w - RESULT);
				console.log('TEST: ', input[corrIdx]);
				found = true;
		}


	} else found = true;
}

console.timeEnd('algoStart');

