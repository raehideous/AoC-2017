	
function doKnot(list, lengths, currPos, skipSize) {

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
    return [list, currPos, skipSize];
}


function knotHash(string) {
	var list = Array.from(Array(256).keys());
	let lengths = string.split('').map( c => c.charCodeAt(0) ).concat([17, 31, 73, 47, 23]);
	let rounds = 64;
	let skipSize = 0, currPos = 0;

	for(let i = 0; i < rounds; i++) {
		[list, currPos, skipSize] = doKnot(list, lengths, currPos, skipSize);
	}

	let sparseArr = [];
	for (let i = 0; i < list.length; i += 16) {
		sparseArr.push(list.slice(i, i + 16).reduce( (p, c) => p ^ c));
	}
	return sparseArr.map( e =>  {
		e = e.toString(16);
		return e.length === 1 ? '0' + e : e
	}).reduce((p,c) => p+c);
}


function getGridForKey(key) {
	let hashedStrings = [];
	for(let i = 0; i < 128; i++) {
		hashedStrings.push(knotHash(key + '-' + i));
	}

	let grid = [];
	hashedStrings.forEach( s => {
		let val = '';

		s.split('').forEach( c => {
			c = parseInt(c, 16).toString(2).split('');
			while(c.length < 4) {
				c.splice(0, 0, '0');
			}
			val += c.join('');
		});
		val = val.split('');

		grid.push(val);
	});

	return grid;
};


function calculateRegions(map) {

	let regions = 0;
	let squares = 0;
	for(let x = 0; x < map.length; x++) {
		for(let y = 0; y < map[x].length; y++) {

			let adjacentCoords = [];

			if (map[x][y] == 1) {
				squares++;
				regions++;
				adjacentCoords.push([x, y]);
			}

			while(adjacentCoords.length > 0) {
				let [m, n] = adjacentCoords.pop();

				map[m][n] = '*';

				if(map[m+1] && map[m+1][n] == 1) {
					adjacentCoords.push([m+1, n]);
				}
				if(map[m-1] && map[m-1][n] == 1) {
					adjacentCoords.push([m-1, n]);
				} 
				if(map[m][n+1] == 1) {
					adjacentCoords.push([m, n + 1]);
				} 
				if(map[m][n-1] == 1) {
					adjacentCoords.push([m, n - 1]);
				} 
			}
		}
	}

	console.log('Squares: ', squares);
	return regions;
};

let grid = getGridForKey('jxqlasbh');
let regions = calculateRegions(grid);
console.log('Regions: ', regions);