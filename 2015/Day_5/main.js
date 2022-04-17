const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

//PART1
function checkWords(input) {
    let niceCount = 0;
    input.forEach(word => {
        if (doesContainVowels(word) && haveDoubleLetter(word) && !haveBadThings(word)) {
           niceCount++
        }
    })
    return niceCount
}


//PART 2
function checkWordsBetterThisTime(input) {
    let nicerCount = 0;
    input.forEach(word => {
        if (containPair(word) && containsOneBetween(word)) {
            nicerCount++
        }
    })
    return nicerCount
}

//výsledek
console.log(`PART 1 check: ${checkWords(input)}`)
console.log(`PART 2 check: ${checkWordsBetterThisTime(input)}`)

//kontrola na obsah samohlásky
function doesContainVowels(word) {
    let vowelsCount = 0;
    for (let i=0; i<word.length; i++) {
        switch (word[i]){
            case "a":
            case "e":
            case "i":
            case "o":
            case "u":   
                vowelsCount++
                break;
        }
    }
    if (vowelsCount >= 3) {
        return true
    } else {
        return false
    }
}

//kontrola na zdvojené písmeno
function haveDoubleLetter(word) {
    for (let j=1; j<word.length; j++) {
        if (word[j-1] === word[j]){
            return true
        } 
    }
    return false
}

//kontrola na ošklivé znaky
function haveBadThings(word) {
    for (let k=1; k<word.length; k++) {
        switch (word[k-1] + word[k]){
            case "ab":
            case "cd":
            case "pq":
            case "xy":
                return true
        }
    }
    return false
}

//stejný pár v jednom slově
function containPair(word) {
    let searchPair = ""
    for (let j=1; j<word.length; j++) {
        searchPair = word[j-1]+word[j]
        test = word.split("")
        test[j-1] = "?"
        test[j] = "!"
        test = test.join("")
        for (let k=j; k<test.length; k++) {
            if (test[k-1]+test[k] === searchPair) {
                return true
            }
        }
    }
    return false
}

//dva stejné znaky rozděleny jiným znakem
function containsOneBetween(word) {
    for (let j=2; j<word.length; j++) {
        if (word[j-2] === word[j]){
            return true
        } 
    }
    return false
}