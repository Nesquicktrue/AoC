const fs = require("fs");

// Zpracuji input do array 'data'
let file = fs.readFileSync("./data.txt", "utf-8").split("\n");
let data = file.map(item => parseInt(item.replace(/\r/,"")))

// Part 1
function singleCompare(data) {
    let increasedSingleCount = 0;
 
    for (let i = 1; i < data.length; i++) {
        let previousNumber = data[i-1];
        if (data[i] > previousNumber) {
            increasedSingleCount++
        }  
    }
    return increasedSingleCount;
}
console.log(`PART 1: ${singleCompare(data)}`);

// Part 2
function manyCompare(array) {
    let compareManyCount = 0;
    let cycles = array.length - 2;
    for (j=0; j < cycles; j++) {
        sample1 = array[j] + array[j+1] + array[j+2]
        sample2 = array[j+1] + array[j+2] + array[j+3]
        if (sample2 > sample1){
            compareManyCount++
        }
    }
    return compareManyCount
}
console.log(`PART 2: ${manyCompare(data)}`)
