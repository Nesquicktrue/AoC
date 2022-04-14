const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

console.log(input.length)

let ribbon = 0;
let ribbonOne = 0;

function getArea(input) {
    let totalPaper = 0
    input.forEach(e => {
        e = e.split("x").map(Number)
        let areaE = (2 * ((e[0] * e[1]) + (e[0] * e[2]) + (e[1] * e[2]))) + getSmallest(e)
        ribbon += ribbonOne + (e[0] * e[1] * e[2])
        totalPaper += areaE
    })
    return totalPaper
}

function getSmallest(array) {
    array.sort((a,b) => a-b)
    ribbonOne = 2 * (array[0] + array[1])
    return array[0] * array[1]
}

console.log(`Total paper is: ${getArea(input)} and total ribbon: ${ribbon}`)


