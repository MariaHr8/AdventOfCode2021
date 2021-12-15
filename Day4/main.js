let fs = require('fs');
const { join } = require('path');
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
        // if there are five lines in array - reset count and move on 
        // to next board
        if (i == 5) {
            boards.push(boardSingle)
            boardSingle = []
            i = 0;
        }
        // make line into an array of numbers
        line = line.split(' ').filter(x => x != '')

        // push into boardsingle
        line.forEach(num => {
            if (!boardSingle[i]) boardSingle[i] = []
            boardSingle[i].push(num);
        });


        // count line
        i++;
    }
});

// populate numbers
readline.createInterface({
    input: fs.createReadStream('numbers.txt'),
    terminal: false
}).on('line', function (line) {
    let lineArr = line.split(',');

    lineArr.forEach(num => {
        boards.forEach((board, index) => {
            board.forEach((row, rindex) => {
                row.forEach((Bnum, nindex) => {
                    if (Number.parseInt(Bnum) === Number.parseInt(num)) {
                        boards[index][rindex][nindex] = '*' + boards[index][rindex][nindex] + '*'
                        // check for Bingo
                        checkBingo(num);
                    }
                });
            });
        });
    });
});

let bingoFound = false;
const isChecked = (currentValue) => currentValue.includes('*');

function checkBingo(called) {
    boards.forEach((board, index) => {
        if (!bingoFound) {
            board.forEach((row, rindex) => {
                //check for row bingo
                if (row.every(isChecked)) {
                    console.log("Bingo in board #" + index); console.log(getCol(board, i))
                    console.log(row)
                    sumUnchecked(called, board)
                    bingoFound = true;
                    return
                }
            });

            for (let i = 0; i < 5; i++) {
                if (getCol(board, i).every(isChecked)) {
                    console.log("Bingo in board #" + index);
                    console.log(getCol(board, i))
                    sumUnchecked(called, board)

                    bingoFound = true;
                    return;
                }
            }
        }
    });
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column; // return column data..
}

function sumUnchecked(called, board) {
    console.log("Found board with Bingo!\nCalculating...");
    let score = 0;
    board.forEach((row, rindex) => {
        row.forEach((Bnum, nindex) => {
            if (!Bnum.includes('*')) {
                score += Number.parseInt(Bnum)
            }
        });
    });

    console.log("Score of winning board: " + score)
    console.log("Last called number "+ called)
    console.log("Final: "+ score*called)
}