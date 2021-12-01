"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileToArray_1 = require("../fileToArray");
var testobj = (0, fileToArray_1.readFile)('testData.txt');
var increaseCount = 0;
for (var i = 1; i < testobj.length; i++) {
    console.log(testobj[i]);
    var j = i - 1;
    if (testobj[i] > testobj[j]) {
        increaseCount++;
    }
}
console.log(increaseCount);
