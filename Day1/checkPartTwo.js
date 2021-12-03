const fs = require('fs');
let input_buffer = [];
let queue = [];
let three_measurement = 0;

setup = () => {
    let dataFile = fs.createReadStream(`submarine.data`, { encoding: 'utf8', fd: null });

    dataFile.on('readable', function () {
        let chunk;
        while (null !== (chunk = dataFile.read(1))) {
            if (chunk[0] === "\n") {
                queue = queue.filter((x) => { return x != "\r" });
                checkQueue(parseInt(queue.join('')), input_buffer);
                queue = [];
            }
            else {
                queue.push(chunk[0]);
            }
        }

    });

    dataFile.on('end', function () {
        console.log(`There are ${three_measurement} measurements that are larger than the previous measurement.`)
        console.log("Done");
    });
}

checkQueue = (word, array) => {
    if(array.length < 3){
        array.push(word);
        console.log(word + " (N/A - no previous measurement)");
    }
    else{
        let oldSum = 0, sum =0;
        oldSum = array[0] + array[1] + array[2];
        array.push(word);
        sum = array[1] + array[2] + array[3];
        console.log("NewSum - "+ sum);
        if(oldSum > sum){
            console.log("decreased");
        }else if (sum> oldSum){
            console.log("increased");
            three_measurement++;
        }else{
            console.log("no change")
        }



        array.shift();

    }
}

setup();