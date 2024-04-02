import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function isAlphabetOrNumber(char:any) {
    return /^[a-zA-Z0-9]$/.test(char);
}


rl.question('Write a sentence: ', (answer) => {
    let words = answer.split(" ");
    interface Hashtable {
        [key: string]: number;
    };
    let frequency: Hashtable = {}
    words.forEach(element => {
        element = element.toLocaleLowerCase()
        let cur = "";
        for(let i = 0; i < element.length; i++){
            
            if ( isAlphabetOrNumber(element[i]) || element[i] === "'"){
                cur += element[i]
            }
        }
        element = cur
        if (element in frequency){
            frequency[element] += 1

        }
        else{
            frequency[element] = 1
        }
    });

    console.log(frequency);
    rl.close();
});

