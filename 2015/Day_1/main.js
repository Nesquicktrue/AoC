const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("");

let basementPosition = 0;

function getFloor(input) {
    let floorNum = 0;
    for (let i=0; i<input.length; i++) {
        if (input[i] === "(") {
            floorNum++
        } else {
            floorNum--
        }

        if (basementPosition === 0) {
           checkBasement(i, floorNum)
        }
    }
    return floorNum
}

function checkBasement(i, floorNum) {
    if (floorNum === -1) {
        basementPosition = i+1
    }
}

console.log(`Final floor is: ${getFloor(input)}, basement is on ${basementPosition} position `)
