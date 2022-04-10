const fs = require("fs");

// Zpracuji input do array 'data'
const file = fs.readFileSync("./data.txt", "utf-8").split("\n");
const data = file.map(item => item.replace(/\r/,""));

const countedBits = [0,0,0,0,0,0,0,0,0,0,0,0];
let gammaRate = [0,0,0,0,0,0,0,0,0,0,0,0];
let epsilonRate = [0,0,0,0,0,0,0,0,0,0,0,0];

// Počítám hodnoty 1 na každém bitu
for (i=0; i<12; i++) {
    data.forEach(item => {
        (item[i] == "1") ? countedBits[i]++ : 0;
    });
}

// Vyhodnocuji častější hodnotu na každém bitu
for (i=0; i<12; i++) {
    if (data.length/2 > countedBits[i]) {
        gammaRate[i] = 0;
        epsilonRate[i] = 1;
    } else {
        gammaRate[i] = 1;
        epsilonRate[i] = 0;
    } 
}

// počítám konkrétní hodnoty 
gammaRate = parseInt(gammaRate.join(""),2);
epsilonRate = parseInt(epsilonRate.join(""),2);

// výsledek
console.log(gammaRate*epsilonRate) 
