#!/usr/bin/env node

const fs = require('fs');

(function(){

    let pattern_passed = ''        // passed pattern
    let options = []               // contain options
    let files = []                 // contain files
    let str = ''                   // represent final result
    let strStartsWith = ''         // represent final result for 'startsWith'
    let strEndsWith = ''           // represent final result for 'endsWith'
    let matchesFound = 0;          // represent all found matches

    let cmd = process.argv.slice(2) 

    // filter out options and files and pattern
    for(let i=0;i<cmd.length;i++){
        if(cmd[i].startsWith('-')){
            options.push(cmd[i])
        }
        else{
            if(cmd[i].includes('.')==true){
                if(cmd[i].startsWith("*.")==false){
                    files.push(cmd[i])
                }
            }
            else{
                pattern_passed = cmd[i]
            }
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

    // read from files
    for(let j=0;j<files.length;j++){
        if(fs.existsSync(files[j])){    // file exist?
            str += fs.readFileSync(files[j]).toString()    // read file
        }
        else{
            console.log('invalid file path')
            return                                //cancel whole operation
        }
    }

    if(pattern_passed == ''){                 // if pattern missing
        console.log('invalid pattern')
        return                                //cancel whole operation
    }

    str = str.trim()
    str = str.split('\r')
    let res = ''                // represent local result 
    let pattern = ''            // represent pattern to be found

    // modifying pattern for operation
    if(pattern_passed.startsWith('^')){
        pattern = pattern_passed.slice(1)
    }
    else if(pattern_passed.endsWith('$')){
        pattern = pattern_passed.slice(0,pattern_passed.length-1)
    }

    if(options.includes('-i')){            // case-insensitive
        let lowerVersion = pattern.toLowerCase()
        if(options.includes('-w')){         // exact pattern search
            for(let i=0;i<str.length;i++){
                let arr = str[i].split(' ')         // array containing each word 
                for(let j=0;j<arr.length;j++){
                    if((arr[j].toLowerCase() == lowerVersion || arr[j].toLowerCase() == '\n' + lowerVersion)){  // if pattern found
                        if(j==0){               // if pattern present at starting of line
                            strStartsWith += arr.join(' ')
                        }
                        if(j==arr.length-1){    // if pattern present at ending of line     
                            strEndsWith += arr.join(' ')
                        }
                        matchesFound++       
                        res += arr.join(' ')
                        break
                    }
                }
            }
            str = res             // updating global result
        }
        else{                                      // pattern search
            for(let i=0;i<str.length;i++){                   
                if(str[i].toLowerCase().includes(lowerVersion)){   // if pattern found in the line
                    if(str[i].toLowerCase().startsWith(lowerVersion) || str[i].toLowerCase().startsWith('\n' + lowerVersion)){ // if pattern present at starting of line
                        strStartsWith += str[i]
                    }
                    if(str[i].toLowerCase().endsWith(lowerVersion)){   // if pattern present at ending of line 
                        strEndsWith += str[i]
                    }
                    matchesFound++
                    res += str[i]
                }
            }
            str = res             // updating global result
        }
    }
    else{                            // case-sensitive
        if(options.includes('-w')){                   // exact word search
            for(let i=0;i<str.length;i++){         
                let arr = str[i].split(' ')          // array containing each word 
                for(let j=0;j<arr.length;j++){
                    if((arr[j] == pattern || arr[j] == '\n' + pattern)){    // if pattern found
                        if(j==0){                           // if pattern present at starting of line
                            strStartsWith += arr.join(' ')
                        }
                        if(j==arr.length-1){           // if pattern present at ending of line
                            strEndsWith += arr.join(' ')
                        }
                        matchesFound++
                        res += arr.join(' ')
                        break
                    }
                }
            }
            str = res            // updating global result
        }
        else{                               // pattern search
            for(let i=0;i<str.length;i++){                
                if(str[i].includes(pattern)){                     // if pattern found in the line
                    if(str[i].startsWith(pattern) || str[i].startsWith('\n' + pattern)){     // if pattern present at starting of line
                        strStartsWith += str[i]
                    }
                    if(str[i].endsWith(pattern)){     // if pattern present at ending of line 
                        strEndsWith += str[i]
                    }
                    matchesFound++
                    res += str[i]
                }
            }
            str = res        // updating global result
        }
    }

    // if content is from next line (corner case)
    if(str.length>0 && str[0]=='\n'){          
        str = str.slice(1)
    }
    if(strStartsWith.length>0 && strStartsWith[0]=='\n'){          
        strStartsWith = strStartsWith.slice(1)
    }
    if(strEndsWith.length>0 && strEndsWith[0]=='\n'){         
        strEndsWith = strEndsWith.slice(1)
    }

    // -n 
    if(options.includes('-n')){
        str = addAllNum(str)
    }

    // displaying the final result.

    if(options.includes('-c')){    // -c 
        console.log(matchesFound)
    }
    else{
        if(pattern_passed.startsWith('^')){
            console.log(strStartsWith)
        }
        else if(pattern_passed.endsWith('$')){
            console.log(strEndsWith)
        }
        else{
            console.log(str)
        }
    }

})();


// -n - add line numbers to final result 
function addAllNum(str){
    str = str.split('\n')         // array containing each line
    let lineNumber = 1
    for(let i=0;i<str.length;i++){
        str[i] = lineNumber + " " + str[i]  // add line number before starting of each line
        lineNumber++;
    }
    str = str.join('\n')
    return str
}

// -c - count of number of matches
function countMatches(str){
    str = str.split('\n')        // array containing each line of final result
    return str.length
}