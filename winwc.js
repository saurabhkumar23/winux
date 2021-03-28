#!/usr/bin/env node

const fs = require('fs');

(function(){

    let cmd = process.argv.slice(2)

    let options = []
    let files = []
    let ans = []                  // represent the final result

    // filter out options and files
    for(let i=0;i<cmd.length;i++){
        if(cmd[i].startsWith('-')){
            options.push(cmd[i])
        }
        else if(cmd[i].startsWith("*.")==false){
            files.push(cmd[i])
        }
    }

    // push all files for *.
    let currentFiles = fs.readdirSync(process.cwd())               //reading cwd files
    for(let i=0;i<cmd.length;i++){
        if(cmd[i].startsWith("*.")){
            let ext = cmd[i].split(".").pop()
            for(let j=0;j<currentFiles.length;j++){
                let targetExt = currentFiles[j].split(".").pop()
                if(ext==targetExt && files.includes(currentFiles[j])==false){
                    files.push(currentFiles[j])
                }
            }
        }
    }

    // if options is empty, get all three (-l, -w, -m)
    if(options.length==0){
        for(let j=0;j<files.length;j++){     
            let str = ''
            let data = []
            if(fs.existsSync(files[j])){    // file exist?
                str = fs.readFileSync(files[j]).toString()    // read file
                data.push(countLines(str))        // -l
                data.push(countWords(str))        // -w
                data.push(countChars(str))        // -m
                data.push(files[j])          // push file name 
                ans.push(data)
            }
            else{
                console.log('invalid file path')
                return                                //cancel whole operation
            }
        }
        
        if(ans.length>1){                     // if more than 1 file data, then show data in tabular form
            let lastRow = setLastRow(ans)
            ans.push(lastRow)
        }
    }
    else{                                  // else set result according to options
        for(let j=0;j<files.length;j++){    
            let str = ''
            let data = []
            if(fs.existsSync(files[j])){    // file exist?
                str = fs.readFileSync(files[j]).toString()    // read file
                if(options.includes('-l')){            // -l
                    data.push(countLines(str))
                }
                if(options.includes('-w')){            // -w
                    data.push(countWords(str))
                }
                if(options.includes('-m')){            // -m
                    data.push(countChars(str))
                }
                if(options.includes('-L')){            // -L
                    data.push(longestLine(str))
                }
                data.push(files[j])                   // push file name
                ans.push(data)
            }
            else{
                console.log('invalid file path')
                return                                //cancel whole operation
            }
        }
        if(ans.length>1){      // if more than 1 file data, then show data in tabular form
            let lastRow = setLastRow(ans)
            ans.push(lastRow)
        }
    }

    // print the final result
    for(let i=0;i<ans.length;i++){
        let finalRes = ''
        for(let j=0;j<ans[i].length;j++){
            finalRes += ' ' + ans[i][j]
        }
        console.log(finalRes)
    }  

})();

// set last row for showing data in tabular form
function setLastRow(ans){
    let n = ans[0].length;
    let lastRow = []
    for(let i=0;i<n-1;i++){
        let sum = 0
        for(let j=0;j<ans.length;j++){
            sum += ans[j][i]             // summing column wise
        }
        lastRow.push(sum)
    }
    lastRow.push('total')
    return lastRow
}

// -l - count lines
function countLines(s){
    s = s.split('\n')               // array containing per line data
    return s.length
}

// -w - count words
function countWords(s){
    let words = 0;
    s = s.trim()
    s = s.split("\r")               // array containing per line data
    for(let i=0;i<s.length;i++){
        let wordsPerLine = [];
        wordsPerLine = s[i].split(' ')        // array containing each word
        for(let j=0;j<wordsPerLine.length;j++){
            if(wordsPerLine[j] != '' && wordsPerLine[j] !='\n'){  // if a word found
                words++;
            }
        }
    }
    return words;
}

// -m - count chars
function countChars(s){
    let chars = 0;
    s = s.trim()
    s = s.split("\r")            // array containing per line data
    for(let i=0;i<s.length;i++){
        let wordsPerLine = [];
        wordsPerLine = s[i].split(' ')          // array containing each word
        for(let j=0;j<wordsPerLine.length;j++){
            if(wordsPerLine[j] != '' && wordsPerLine[j] !='\n'){
                chars += wordsPerLine[j].length        // storing each word length
                if(wordsPerLine[j].length>1 && wordsPerLine[j].startsWith('\n')){    // if word starts with \n (edge case)
                    chars--;
                }
            }
        }
    }
    return chars;
}

// -L - longest line
function longestLine(s){
    let words = 0;
    s = s.trim()
    s = s.split("\r")           // array containing per line data
    let maxChars = 0;
    for(let i=0;i<s.length;i++){
        let chars = s[i].startsWith('\n')==true ? s[i].length-1 : s[i].length     // length of line
        maxChars = Math.max(maxChars,chars);
    }
    return maxChars;
}