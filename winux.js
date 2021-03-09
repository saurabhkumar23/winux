#!/usr/bin/env node

const fs = require('fs');

(function(){

    let cmd = process.argv.slice(2) //access command arguments
    
    let options = []
    let files = []
    let str = ''

    // filter out options and files
    for(let i=0;i<cmd.length;i++){
        if(cmd[i].startsWith('-')){
            options.push(cmd[i])
        }
        else{
            files.push(cmd[i])
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

    str = str.split('\n')   //convert string to array based on new line (vscode makes '' to \r)

    // -s implementation
    // NOTE - this operation must work before -n/-b if present, order doesn't matter, after then 
    //         whichever comes first among -n or -b will execute by ignoring other.
    if(options.includes('-s')){
        str = trimLargeSpaces(str)
    }

    // -n and -b implementation
    if(options.includes("-n") && options.includes("-b")){
        if(options.indexOf("-n")>options.indexOf("-b")){       // if -b present before -n. then we ignore -n
            str=addNonEmptyNum(str);   // -b 
        }
        else{
            str= addAllNum(str);       // -n 
        }
    }else{
        if(options.includes("-n")){
            str= addAllNum(str);       // -n 

        }
        if(options.includes("-b")){
            str=addNonEmptyNum(str);    // -b 
        }
    }

    str = str.join("\n")
    console.log(str)   

})();

// -s implementation - To remove big line break.
function trimLargeSpaces(arr){
    let temp = []
    let flag = false
    for(let i=0;i<arr.length;i++){
        if(arr[i]=='' || arr[i]=='\r'){
            if(flag)
                continue
            else{
                flag = true
                temp.push(arr[i])
            }
        }
        else{
            temp.push(arr[i])
            flag = false
        }
    }
    return temp
}

// -n implementation - To add line numbers to all lines.
function addAllNum(arr){
    let lineNumber=1;
    for(let i=0;i<arr.length;i++){
        arr[i]=lineNumber+" "+arr[i];
        lineNumber++;
    }
    return arr;
}

// -b implementation - To add line numbers to non-empty lines.
function addNonEmptyNum(arr){
    let lineNumber=1;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!=="" && arr[i]!=="\r"){
            arr[i]=lineNumber+" "+arr[i];
            lineNumber++;
        }
    }
    return arr;
}

/*
    how to make a nodejs script global?
    ---> mention nodejs environment at the top of your script (add shebang - #!/usr/bin/env node)
    ---> package.json - "bin": {"winux": "winux.js"}
    ---> run npm link
*/