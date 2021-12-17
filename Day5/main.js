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
    command['start']['x'] = Number.parseInt(line.split(' -> ')[0].split(',')[0])
    command['start']['y'] = Number.parseInt(line.split(' -> ')[0].split(',')[1])
    command['end']['x'] = Number.parseInt(line.split(' -> ')[1].split(',')[0])
    command['end']['y'] = Number.parseInt(line.split(' -> ')[1].split(',')[1])

    board[command['start']['x']][command['start']['y']] = 1;
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

board = populateArr()