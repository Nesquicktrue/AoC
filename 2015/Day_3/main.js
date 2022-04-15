const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("");

// ukládám souřadnice navštívených domů - výchozí bod X0Y0
let uniqueHouses = [[0,0]]

// PART1
function goFlyingAlone(input) {
    uniqueHouses = [[0,0]]
    
    let X = 0
    let Y = 0
    let house = [];
    input.forEach(direction => {
        switch (direction) {
            case "^":
                Y++;
                house = [X,Y];
                checkHouse(house) ? uniqueHouses.push(house) : 0;
                break;
            
            case ">":
                X++;
                house = [X,Y];
                checkHouse(house) ? uniqueHouses.push(house) : 0;
                break;
                
            case "v":
                Y--;
                house = [X,Y];
                checkHouse(house) ? uniqueHouses.push(house) : 0;
                break;
                
            case "<":
                X--;
                house = [X,Y];
                checkHouse(house) ? uniqueHouses.push(house) : 0;
                break;
        }
    })
    return uniqueHouses.length
}

//PART 2
function goWithRoboSanta(input) {
    uniqueHouses = [[0,0]]

    // pozice Santy
    let sX = 0;
    let sY = 0;

    // pozice ROBOSanty
    let rX = 0;
    let rY = 0;

    let house = [];
    
    for (let j=0; j<input.length; j++){
        if (j%2 === 0) {
            //Santa na tahu
            switch (input[j]) {
                case "^":
                    sY++;
                    house = [sX,sY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
                
                case ">":
                    sX++;
                    house = [sX,sY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
                    
                case "v":
                    sY--;
                    house = [sX,sY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
                    
                case "<":
                    sX--;
                    house = [sX,sY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
            }
        } else {
            // RoboSanta na tahu
            switch (input[j]) {
                case "^":
                    rY++;
                    house = [rX,rY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
                
                case ">":
                    rX++;
                    house = [rX,rY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
                    
                case "v":
                    rY--;
                    house = [rX,rY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
                    
                case "<":
                    rX--;
                    house = [rX,rY];
                    checkHouse(house) ? uniqueHouses.push(house) : 0;
                    break;
            }
        }
    }
    return uniqueHouses.length
}

function checkHouse(newHouse) {
    for (let i=0; i<uniqueHouses.length; i++) {
        if (newHouse[0] == uniqueHouses[i][0] && newHouse[1] == uniqueHouses[i][1]){
            return false;
        }
    }
    return true
}

console.log(`Santa alone deliver gifts to ${goFlyingAlone(input)} unique houses!`)
console.log(`Santa with RoboSanta delivers gifts to ${goWithRoboSanta(input)} unique houses!`)