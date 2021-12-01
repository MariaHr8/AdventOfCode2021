const fs = require('fs');
let input_buffer = [];
let queue = [];
let measurement = 0;

setup =  () => {
    let dataFile = fs.createReadStream(`submarine.data`, { encoding: 'utf8', fd: null });

    dataFile.on('readable', function () {
        let chunk;
        while (null !== (chunk = dataFile.read(1))) {
            if (chunk[0] === "\n") {
                //console.log("New Line");
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
        console.log(`There are ${measurement} measurements that are larger than the previous measurement.`)
        console.log("Done");
    });
}

checkQueue = (word, array) => {
    if(array.length < 1){
        array.push(word);
        console.log(word + " (N/A - no previous measurement)");
    }else{
        array.push(word);
        console.log(word);
        if(array[0] <= array[1]){
            console.log("increased");
            measurement++;
        }else{
            console.log("decreased");
        }
        array.shift();
    }
}

setup();