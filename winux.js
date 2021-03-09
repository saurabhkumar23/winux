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

    str = str.split('\n')   //convert string to array based on new lines (vscode makes '' to \r)

    // -s 
    if(options.includes('-s')){
        str = trimLargeSpaces(str)
    }

    str=str.join("\n")
    console.log(str)

})();

// -s implementation - trim large spaces
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