var fs = require('fs');
var values = require('object.values');

console.time("algoTime");
let input = fs.readFileSync("input.txt", 'utf8').split('\n');
input = input.map( (line) => {
	return line.slice(0, line.length - 1);
});

const createNodesInfo = strings => {
	const nodesInfo = strings.reduce( (acc, curr, i) => {
		let nodeInfo = {};
		if(curr.includes('->')) {
			const [front, back] = curr.split(' -> ');
			const [node, weight] = front.split('(');
			nodeInfo.name = node.trim();
			nodeInfo.weight = weight.replace(')', '');

			let nodeNodes = back.split(', ');
			nodeInfo.children = nodeNodes;
		} else {
			const [node, weight] = curr.split('(');
			nodeInfo.name = node.trim();
			nodeInfo.weight = weight.replace(')', '');
		}
		acc[nodeInfo.name] = nodeInfo;
		return acc;
	}, {});
	return nodesInfo;
};


let globalNodes = createNodesInfo(input);


let getRootNode = nodes => {
	let childrenLength = 0;
	let prevTotal = 0;
	let nodesValues = values(nodes);
	let rootNode;
	nodesValues = nodesValues.map( (node) => {
		node.childrenTotal = getChildNodesNumForNode(node);
		if(node.childrenTotal > prevTotal) {
			prevTotal = node.childrenTotal;
			rootNode = node.name;
		}
		return node;
	})
	return rootNode;
};


let getChildNodesNumForNode = node => {
	let childNums = 0;
	if(node.children) {
		childNums += node.children.length;
		node.children.forEach( (child) => {
			childNums += getChildNodesNumForNode(globalNodes[child]);
		})
	}
	return childNums;
}

let rootNode = getRootNode(globalNodes);
console.log('Answer: ', rootNode);

let checkNode = node => {

	if(node.children) {
		let childrenWeights = [];
		node.children.forEach( (curr) => {
			childrenWeights.push(getNodeWeight(globalNodes[curr]));

		});

		for(let i = 1; i < childrenWeights.length; i++){
			if(childrenWeights[i] != childrenWeights[i-1]) {
				console.log('Ta linia jest zła: ', childrenWeights);
				return node.children[i];
			}
		}
		return null
	}
	return null
}

let getNodeWeight = node => {

	let nodeWeight = node.weight;

	if(node.children) {
		node.children.forEach( (child) => {
			nodeWeight += getNodeWeight(globalNodes[child]);
		});
	}
	return nodeWeight;
}

let myRoot = 'vvsvez'

myRoot = globalNodes[myRoot];
console.log('root: ', myRoot);
myRoot.children.forEach( (child) => {
	console.log('NodeWeight: ', getNodeWeight(globalNodes[child]));
})


console.timeEnd('algoTime');