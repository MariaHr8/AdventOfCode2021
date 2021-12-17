const { reverse } = require('dns');
let fs = require('fs');
let math = require('mathjs');
let readline = require('readline');
let board = []

//populate boards array
readline.createInterface({
    input: fs.createReadStream('data.txt'),
    terminal: false
}).on('start', function () {
    console.log("I have been opened")
});

//populate boards array
readline.createInterface({
    input: fs.createReadStream('data.txt'),
    terminal: false
}).on('line', function (line) {
    // decompose command
    let command = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
    let reversedX = (Number.parseInt(line.split(' -> ')[0].split(',')[0]) > Number.parseInt(line.split(' -> ')[1].split(',')[0]));
    let reversedY = (Number.parseInt(line.split(' -> ')[0].split(',')[1]) > Number.parseInt(line.split(' -> ')[1].split(',')[1]));
    
    if (reversedX) {
        command['start']['x'] = Number.parseInt(line.split(' -> ')[1].split(',')[0])
        command['end']['x'] = Number.parseInt(line.split(' -> ')[0].split(',')[0])
    }
    if (reversedY) {
        command['start']['y'] = Number.parseInt(line.split(' -> ')[1].split(',')[1])
        command['end']['y'] = Number.parseInt(line.split(' -> ')[0].split(',')[1])
    }
    if(!(reversedX || reversedY)) {
        command['start']['x'] = Number.parseInt(line.split(' -> ')[0].split(',')[0])
        command['start']['y'] = Number.parseInt(line.split(' -> ')[0].split(',')[1])
        command['end']['x'] = Number.parseInt(line.split(' -> ')[1].split(',')[0])
        command['end']['y'] = Number.parseInt(line.split(' -> ')[1].split(',')[1])
    }

    // case 1: start x and end x are the same - we have a column
    if (command['start']['x'] === command['end']['x']) {
        // until the start y is equal to end y
        let current = command['start']['y']

        while (current != command['end']['y']) {
            board[command['start']['x']][current] = 1
            current++
        }
    }
    // case 2: start y and end y are the same - row
    else if (command['start']['y'] === command['end']['y']) {
        // until the start y is equal to end y
        current = command['start']['x']

        while (current != command['end']['x']) {
            board[current][command['start']['y']] = 1
            current++
        }
    }

});

readline.createInterface({
    input: fs.createReadStream('data.txt'),
    terminal: false
}).on('close', function (line) {
    console.log(board)
});

let populateArr = () => {
    let array = Array(990).fill().map(() => Array(990).fill('.'))
    return array
}

function hasOne(element) {
    return element === 1;
}

board = populateArr()
