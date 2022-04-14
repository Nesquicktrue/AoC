const fs = require("fs");

// Zpracuji input do array 'data'
const file = fs.readFileSync("./data.txt", "utf-8").split("\n");
const data = file.map(item => item.replace(/\r/,""));

// PART 1

function getPowerConsuption(data) {
    // Počítám hodnoty "1" na každém bitu
    const countedBits = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (i=0; i<12; i++) {
        data.forEach(item => {
            (item[i] == "1") ? countedBits[i]++ : 0;
        });
    }
    let gammaRate = [0,0,0,0,0,0,0,0,0,0,0,0];
    let epsilonRate = [0,0,0,0,0,0,0,0,0,0,0,0];
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
    return gammaRate*epsilonRate 
}

// PART 2
let index = 0;
const oxygenRate = [[],[],[],[],[],[],[],[],[],[],[],[]];
const co2Rate = [[],[],[],[],[],[],[],[],[],[],[],[]];
let co2 = 0;
let oxygen = 0;

function getOxygenRating(data, startingIndex) {
    let countOnes = 0;
    let countZeros = 0;
    let mostCommonValue = 0;
    
    // zjišťuji nejčastější hodnotu
    data.forEach(item => (item[startingIndex] == "1") ? countOnes++ : countZeros++ );
    (countOnes >= countZeros) ? mostCommonValue="1" : mostCommonValue="0";
    
    // přebírám záznámy splňující podmínku do nové array
    data.forEach(item => {
        if (item[startingIndex] == mostCommonValue) {
            oxygenRate[startingIndex].push(item)
        }
    })
    
    // kontroluji, zda už není hotovo, jinak rekursíva
    if (oxygenRate[startingIndex].length !== 1) {
        index++;
        getOxygenRating(oxygenRate[index-1], index);
    } else {
        oxygen = parseInt(oxygenRate[startingIndex][0],2);
        console.log(`Oxygen Rating: ${oxygen}`)
    }
}

function getCo2Rating(data, startingIndex) {
    let countOnes = 0;
    let countZeros = 0;
    let mostCommonValue = 0;
    
    // zjišťuji nejčastější hodnotu
    data.forEach(item => (item[startingIndex] == "1") ? countOnes++ : countZeros++ );
    (countOnes >= countZeros) ? mostCommonValue="1" : mostCommonValue="0";
    
    // přebírám záznámy splňující podmínku do nové array
    data.forEach(item => {
        if (item[startingIndex] != mostCommonValue) {
            co2Rate[startingIndex].push(item)
        }
    })
    
    // kontroluji, zda už není hotovo, jinak rekursíva
    if (co2Rate[startingIndex].length !== 1) {
        index++;
        getCo2Rating(co2Rate[index-1], index);
    } else {
        co2 = parseInt(co2Rate[startingIndex][0],2)
        console.log(`CO2 Rating: ${co2}`)
    }
}

console.log(`PART 1: ${getPowerConsuption(data)}`)

index = 0;
getOxygenRating(data, index)
index = 0;
getCo2Rating(data, index)

console.log(`PART 2:  ${co2 * oxygen}`)

