"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
function readFile(fileName) {
    var fs = require('fs');
    var arr;
    var file = fs.readFile(fileName);
    arr = file.toString().replace(/\r\n/g, '/n').split('/n');
    return arr;
}
exports.readFile = readFile;
