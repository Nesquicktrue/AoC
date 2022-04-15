const md5 = require("md5");

input = "ckczppom"

let fiveZ
let sixZ
let indexFive
let indexSix

let previousFive = md5(input)
let previousSix = md5(input)

// PART1
for (let i=0; i<100000; i++) {
    fiveZ = md5(input+i)
    if (fiveZ < previousFive) {
        previousFive = fiveZ
        indexFive = i
    }
}

// PART2
for (let j=0; j<1000000; j++) {
    sixZ = md5(input+j)
    if (sixZ < previousSix) {
        previousSix = sixZ
        indexSix = j
    }
}

console.log(`PART1 - leading 5 zeros is: ${input+indexFive}`)
console.log(`HASH: ${previousFive}`)
console.log(`PART2 - leading 6 zeros is: ${input+indexSix}`)
console.log(`HASH: ${previousSix}`)
