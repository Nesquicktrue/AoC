const fs = require("fs");

// Zpracuji input do array 'data'
let file = fs.readFileSync("./data.txt", "utf-8").split("\n");
let data = file.map(item => item.replace(/\r/,""));
let instructions = [];

// Rozdeluji směr a hodnotu 
for (item of data) {
    let novy = item.split(/ /);
    novy[1] = parseInt(novy[1])
    instructions.push(novy)
}

// PART 1
function simpleCalc(instructions) {
    let horizontal = 0;
    let depth = 0;
    instructions.forEach((item) => {
        switch (item[0]){
            case "forward": 
                horizontal += item[1];
                break;
            case "up":
                depth -= item[1];
                break;
            case "down":
                depth += item[1];
                break;
        } 
    })
    return horizontal*depth
}

// PART 2
function calcWithAim(instructions) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    instructions.forEach((item) => {
        switch (item[0]){
            case "forward": 
                horizontal += item[1];
                depth += item[1] * aim;
                break;
            case "up":
                aim -= item[1];
                break;
            case "down":
                aim += item[1];
                break;
        } 
    })
    return horizontal*depth
}

console.log(`PART 1: ${simpleCalc(instructions)}`)
console.log(`PART 2: ${calcWithAim(instructions)}`)