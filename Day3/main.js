const fs = require('fs');
let queue = [];
let values = {};
let oxygenRating = 0;
let CO2Rating = 0;
let lifeSupport = 0;
let bitCriteria = 0;

setup = (col) => {
    let dataFile = fs.createReadStream('data.data', { encoding: 'utf8', fd: null });

    dataFile.on('readable', function () {
        let chunk;
        while (null !== (chunk = dataFile.read(1))) {
            if (chunk[0] === "\n") {
                queue = queue.filter((x) => { return x != "\r" }).join('');
                findFNumber(col, parseInt(queue[col]));
                queue = [];
            } else {
                queue.push(chunk);
            }
        }
    });

    dataFile.on('end', function () {
        findFNumber(col, parseInt(queue[col]));

        decide(col)

        if (col === 11) {
            console.log(lifeSupport)
        }
    });

}

findFNumber = (position, element) => {
    if (values[position] == undefined) {
        values[position] = { "zeros": 0, "ones": 0 };
    }

    if (element === 0) {
        values[position].zeros += 1;
    } else {
        values[position].ones += 1;
    }
}

decide = (position) => {
    if (values[position].zeros > values[position].ones) {
        console.log("Zero is the bit rate")
        bitCriteria = 0;
    }else {
        console.log("One is the bit rate")
        bitCriteria = 1;
    }
}

const promise = new Promise((res, rej) => {
    let i = 0
    while (i < 12) {
        setup(i);
        i++;
    }
});