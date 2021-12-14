const fs = require('fs');
let values = {};
let globalArr = [];
let oxygenRating = 0;
let CO2Rating = 0;
let lifeSupport = 0;
let objectBits = {};
// 3667994 too low

setup = (i) => {
    let dataFile = fs.createReadStream('data.data', { encoding: 'utf8', fd: null });
    dataFile.on('readable', function () {
        let chunk;
        // finding the bitCriterias
        while (null !== (chunk = dataFile.read(14))) {
            chunkArr = chunk.split('').filter(x => x != '\r').filter(x => x != '\n');
            globalArr.push(chunkArr.join(''))
        }

        if (globalArr.length === 1000) {
            let arr = []

            // find bits in every row at index 0
            globalArr.forEach(row => {
                findFNumber(0, row[0])
            });

            // decide the bit criteria
            decide(i)

            // leave only rows with the criteria at index 0
            arr = globalArr.filter(x => x[0] == objectBits[0].bitCriteria)

            i++
            //for 1-12
            while (arr.length != 1) {
                globalArr.forEach(row => {
                    findFNumber(i, row[i])
                });

                decide(i)
                arr = arr.filter(x => x[i] == objectBits[i].bitCriteria)
                i++
            }
            console.log(arr)

            oxygenRating = Number.parseInt(arr, 2)
            console.log(oxygenRating) //2849

            ///////////reset values
            arr = []
            objectBits = {};
            values = {}
            i = 0

            /////////////// find co2
            // find bits in every row at index 0
            globalArr.forEach(row => {
                findFNumber(0, row[0])
            });

            // decide the bit criteria
            decide(0)

            // leave only rows with the criteria at index 0
            arr = globalArr.filter(x => x[0] != objectBits[0].bitCriteria)

            i++
            //for 1-12
            while (arr.length != 1) {
                globalArr.forEach(row => {
                    findFNumber(i, row[i])
                });

                decide(i)
                arr = arr.filter(x => x[i] != objectBits[i].bitCriteria)
                i++
            }

            console.log(arr)

            CO2Rating = Number.parseInt(arr, 2);
            console.log(CO2Rating)

            console.log("lifeSupport = " + (CO2Rating * oxygenRating))
        }
    });

    dataFile.on('end', function () {
        //console.log(values)

        console.log("End Reached")
    });
}

findFNumber = (position, element) => {
    if (!values[position]) {
        values[position] = { "zeros": 0, "ones": 0 };
    }

    if (element == 0) {
        values[position].zeros += 1;
    } else {
        values[position].ones += 1;
    }
}

decide = (position) => {
    if (values[position].zeros > values[position].ones) {
        if (!objectBits[position]) objectBits[position] = { "bitCriteria": 0 }
    } else {
        if (!objectBits[position]) objectBits[position] = { "bitCriteria": 0 }
        objectBits[position].bitCriteria = 1
    }
}


setup(0);