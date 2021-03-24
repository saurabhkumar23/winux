const fs = require('fs');

(function(){

    let cmd = process.argv.slice(2)

    let options = []
    let files = []
    let ans = []

    // filter out options and files
    for(let i=0;i<cmd.length;i++){
        if(cmd[i].startsWith('-')){
            options.push(cmd[i])
        }
        else if(cmd[i].startsWith("*.")==false){
            files.push(cmd[i])
        }
    }

    // push all files starting with *.
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

    // if options is empty, get all three.
    if(options.length==0){
        for(let j=0;j<files.length;j++){     // read from files
            let str = ''
            let data = []
            if(fs.existsSync(files[j])){    // file exist?
                str = fs.readFileSync(files[j]).toString()    // read file
                data.push(countLines(str))
                data.push(countWords(str))
                data.push(countChars(str))
                data.push(files[j])
                ans.push(data)
            }
            else{
                console.log('invalid file path')
                return                                //cancel whole operation
            }
        }
        
        if(ans.length>1){
            let lastRow = setLastRow(ans)
            ans.push(lastRow)
        }
    }
    else{
        for(let j=0;j<files.length;j++){     // read from files
            let str = ''
            let data = []
            if(fs.existsSync(files[j])){    // file exist?
                str = fs.readFileSync(files[j]).toString()    // read file
                
                if(options.includes('-l')){
                    data.push(countLines(str))
                }
                if(options.includes('-w')){
                    data.push(countWords(str))
                }
                if(options.includes('-m')){
                    data.push(countChars(str))
                }
                if(options.includes('-L')){
                    data.push(longestLine(str))
                }
                data.push(files[j])
                ans.push(data)
            }
            else{
                console.log('invalid file path')
                return                                //cancel whole operation
            }
        }
        if(ans.length>1){
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

// set last row
function setLastRow(ans){
    let n = ans[0].length;
    let lastRow = []
    for(let i=0;i<n-1;i++){
        let sum = 0
        for(let j=0;j<ans.length;j++){
            sum += ans[j][i]
        }
        lastRow.push(sum)
    }
    lastRow.push('total')
    return lastRow
}

// -l - count lines
function countLines(s){
    s = s.split('\n')
    return s.length
}

// -w - count words
function countWords(s){
    let words = 0;
    s = s.trim()
    s = s.split("\r")
    for(let i=0;i<s.length;i++){
        let wordsPerLine = [];
        wordsPerLine = s[i].split(' ');
        for(let j=0;j<wordsPerLine.length;j++){
            if(wordsPerLine[j] != '' && wordsPerLine[j] !='\n'){
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
    s = s.split("\r")
    for(let i=0;i<s.length;i++){
        let wordsPerLine = [];
        wordsPerLine = s[i].split(' ');
        for(let j=0;j<wordsPerLine.length;j++){
            if(wordsPerLine[j] != '' && wordsPerLine[j] !='\n'){
                chars += wordsPerLine[j].length;
                if(wordsPerLine[j].length>1 && wordsPerLine[j].startsWith('\n')){
                    chars--;
                }
            }
        }
    }
    return chars;
}

function longestLine(s){
    let words = 0;
    s = s.trim()
    s = s.split("\r")
    let maxChars = 0;
    for(let i=0;i<s.length;i++){
        let chars = s[i].startsWith('\n')==true ? s[i].length-1 : s[i].length;
        maxChars = Math.max(maxChars,chars);
    }
    return maxChars;
}