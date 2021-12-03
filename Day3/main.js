const fs = require('fs');
let queue = [];
let gammaRate = [];
let epsilonRate = [];
let powerConsumption = 0;
let values = {};

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
        
        if(values[col].zeros > values[col].ones){
            gammaRate.push(0)
            epsilonRate.push(1)
        }
        if(values[col].zeros < values[col].ones){
            gammaRate.push(1)
            epsilonRate.push(0)
        }

        if(col === 11){
            gammaRate = parseInt(gammaRate.join(''),2)
            epsilonRate = parseInt(epsilonRate.join(''),2)

            powerConsumption = gammaRate*epsilonRate;
            console.log(powerConsumption)
        }
    });

}

findFNumber = (position, element) => {
    if(values[position] == undefined){
        values[position] = {"zeros": 0, "ones":0};
    }

    if (element === 0) {
        values[position].zeros += 1;
    } else {
        values[position].ones += 1;
    }
}

let i=0
while(i<12){
    setup(i);
    i++;
}
