let fs = require('fs');
let readline = require('readline');
let boardSingle = []
let boards = []
let i = 0;

//populate boards array
readline.createInterface({
    input: fs.createReadStream('boards.txt'),
    terminal: false
}).on('line', function (line) {
    if (line != '') {
        if (i == 5) {
            boards.push(boardSingle)
            boardSingle = []
            i = 0;
        }
        line = line.split(' ').filter(x => x != '')

        line.forEach(num => {
            if (!boardSingle[i]) boardSingle[i] = []
            boardSingle[i].push(num);
        });
        i++;
    }
});

// populate numbers
readline.createInterface({
    input: fs.createReadStream('numbers.txt'),
    terminal: false
}).on('line', function (line) {
    let lineArr = line.split(',');
    boardSingle = [...boards];

    lineArr.forEach(num => {
        boards.forEach((board, index) => {
            board.forEach((row, rindex) => {
                row.forEach((Bnum, nindex) => {
                    if (Number.parseInt(Bnum) === Number.parseInt(num)) {
                        boards[index][rindex][nindex] = '*' + boards[index][rindex][nindex] + '*'
                        // check for Bingo
                        checkBingo(board, num);
                    }
                });
            });
        });
    });
});

const isChecked = (currentValue) => currentValue.includes('*');

function checkBingo(board, called) {
    checkingBoards(called);
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column; // return column data..
}

function sumUnchecked(called, board) {
    let score = 0;
    board.forEach((row, rindex) => {
        row.forEach((Bnum, nindex) => {
            if (!Bnum.includes('*')) {
                score += Number.parseInt(Bnum)
            }
        });
    });

    console.log("Score of winning board: " + score)
    console.log("Last called number " + called)
    console.log("Final: " + score * called)
}

function checkingBoards(called) {
    var newArr = boards.filter(board => !hasBing(board))
    if (newArr.length === 1) {
        console.log(newArr[0])
        newArr[0].forEach((row, rindex) => {
            //one row
            row.forEach((digit, nindex) => {
                if (Number.parseInt(called) === Number.parseInt(digit)) {
                    newArr[0][rindex][nindex] = '*' + newArr[0][rindex][nindex] + '*'
                }
            });
        });
        sumUnchecked(called, ...newArr)
    }
}

function hasBing(board) {
    let hasBingo = false;

    // check rows
    board.forEach((row, rindex) => {
        if (row.every(isChecked)) {
            hasBingo = true;
        }
    });

    //check columns
    for (let i = 0; i < 5; i++) {
        if (getCol(board, i).every(isChecked)) {
            hasBingo = true;
        }
    }

    return hasBingo;
}