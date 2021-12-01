export function readFile(fileName:string):Array<string>{
    const fs = require('fs');
    let arr;
    const file = fs.readFile(fileName);
    arr = file.toString().replace(/\r\n/g,'/n').split('/n');
    return arr
}