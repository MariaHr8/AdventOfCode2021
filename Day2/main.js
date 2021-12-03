const fs = require('fs');
let command = [];
let depth = 0;
let horizontalPosition = 0;
let aim = 0;

setup = () => {
    let data = fs.createReadStream('movedata.data', { encoding: 'utf8', fd: null });

    data.on('readable', function () {
        let chunk;
        while (null !== (chunk = data.read(1))) {
            if (chunk[0] === "\n") {
                command = command.filter((x) => { return x != "\r" });
                command = command.join('').split(" ");
                checkCommand(command[0], parseInt(command[1]));
                command = [];
            }
            else{
                command.push(chunk[0]);
            }
        }
    });

    data.on('end', function () {
        command = command.filter((x) => { return x != "\r" });
        command = command.join('').split(" ");
        checkCommand(command[0], parseInt(command[1]));

        console.log("Depth: "+ depth);
        console.log("Horizontal position: "+ horizontalPosition);

        console.log("Result: " + depth*horizontalPosition)
    });
}

checkCommand = (command, num) => {
    switch(command){
        case "up":
            aim -= num;
            break;
        case "down":
            aim += num;
            break;
        case "forward":
            horizontalPosition += num;
            depth += aim*num;
            break;
        default:
            break;
    }
}

setup();