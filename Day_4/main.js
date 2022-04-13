const fs = require("fs");

// Zpracuji input do array 'data'
const fileInputs = fs.readFileSync("./inputs.txt", "utf-8").split(",");
const fileBoards = fs.readFileSync("./boards.txt", "utf-8").split("\n");

// označení a zpracování boardů
const boardsTemp = fileBoards.map(item => item.split(" "));


// volaná čísla uložím do winnerIndexes[] včetně souřadnic X,Y a čísla boardu
const winnerIndexes = []; 

// vítezná Array 
// [řádek ve vítězné Board, sloupec ve vítězné Board,
//       poslední vítězné číslo ,číslo vítězné Board]
let winner = []; 

// volané číslo uložím do nové array a přidám k němu souřadnice X,Y a číslo boardu 
function getWinnerIndexes() {
    for (let l=0 ; l<fileInputs.length ; l++) {
        for (let k=0 ; k<boardsTemp.length ; k++) {
            if (boardsTemp[k].includes(fileInputs[l])) {
                num = boardsTemp[k].indexOf(fileInputs[l])
                // zjišťuji board number
                boardNum = Math.floor(k/5);
                winnerIndexes.push([k,num,fileInputs[l],boardNum])
                if (checkWinner(k,num,fileInputs[l],boardNum) === true) {
                    countScore(winner);
                    return
                }
            }
        }
    }
}

function checkWinner(verticalIndex, horizontalIndex, lastNum, boardNum) {
    let verticalCount = 0;
    let horizontalCount = 0;

    for (let m=0 ; m<winnerIndexes.length ; m++) {
        // shoda na řádku
            if (winnerIndexes[m][0]===verticalIndex) {
                verticalCount++;
                if (verticalCount === 5) {
                    // [řádek ve vítězné Board, sloupec ve vítězné Board,
                    //       poslední vítězné číslo ,číslo vítězné Board]
                    winner = [verticalIndex, horizontalIndex, lastNum, winnerIndexes[m][3]];
                    return true 
                }
            };
        // shoda na sloupci, zde musím navíc kontrolovat, že jsou ze stejného boardu 
             if (winnerIndexes[m][1]===horizontalIndex && winnerIndexes[m][2]===boardNum) {
                horizontalCount++;
                if (horizontalCount === 5) {
                    // [řádek ve vítězné Board, sloupec ve vítězné Board,
                    //       poslední vítězné číslo ,číslo vítězné Board]
                    winner = [verticalIndex, horizontalIndex, lastNum, winnerIndexes[m][3]];
                    return true 
                }
            }; 
    }
}

// zjišťuji celou vítěznou board - počítám ostatní indexy od vítězné souřadnice
function getWinnerBoard(winner) {
    let winnerBoardPosition = []
    let winnerBoard = [];
    let winnerRows = winner[0] % 5;
    switch (winnerRows) {
        case 0:
            winnerBoardPosition = [0,1,2,3,4]
            break
        case 1:
            winnerBoardPosition = [-1,0,1,2,3]
            break
        case 2:
            winnerBoardPosition = [-2,-1,0,1,2,]
            break
        case 3:
            winnerBoardPosition = [-3,-2,-1,0,1]
            break
        case 4:
            winnerBoardPosition = [-4,-3,-2,-1,0]
            break
    }  
    for (let n=0; n<5; n++) {
        winnerBoard.push(boardsTemp[ winner[0] + winnerBoardPosition[n] ])
    } 
    return winnerBoard
}

function countScore(winner) {
    let winnerBoard = getWinnerBoard(winner)
    
    //součet celé vítezné Board
    let winnerBoardSum = 0;
    for (row of winnerBoard) {
       winnerBoardSum += row.reduce((a,b) => parseInt(a) + parseInt(b));
    }
    
    //součet volaných čísel z vítezné board
    let calledNumsFromWinner = [];
    for (calledNum of winnerIndexes) {
        if (calledNum[3] == winner[3]) {
            calledNumsFromWinner.push(calledNum[2])
        }
    }
    let calledNumsFromWinnerSum = calledNumsFromWinner.reduce((a,b) => parseInt(a) + parseInt(b)) 

    //výsledek
    console.log((winnerBoardSum - calledNumsFromWinnerSum) * parseInt(winner[2]))
}

console.log(getWinnerIndexes())