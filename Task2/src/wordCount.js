"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function isAlphabetOrNumber(char) {
    return /^[a-zA-Z0-9]$/.test(char);
}
console.log(isAlphabetOrNumber('a')); // true
console.log(isAlphabetOrNumber('1')); // true
console.log(isAlphabetOrNumber('*')); // false
rl.question('Write a sentence: ', function (answer) {
    var words = answer.split(" ");
    ;
    var frequency = {};
    words.forEach(function (element) {
        element = element.toLocaleLowerCase();
        var cur = "";
        for (var i = 0; i < element.length; i++) {
            if (isAlphabetOrNumber(element[i]) || element[i] === "'") {
                cur += element[i];
            }
        }
        element = cur;
        if (element in frequency) {
            frequency[element] += 1;
        }
        else {
            frequency[element] = 1;
        }
    });
    console.log(frequency);
    rl.close();
});
