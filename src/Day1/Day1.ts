import {readFile} from '../fileToArray';

const testobj = readFile('testData.txt');
let increaseCount = 0;

for (let i = 1; i < testobj.length; i++)
{
    console.log(testobj[i])
    let j = i -1;
    if (testobj[i]>testobj[j])
    {
        increaseCount ++;
    }
}
console.log(increaseCount);