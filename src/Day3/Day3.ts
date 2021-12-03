import { parse } from 'path/posix';
import { Day } from '../shared/day';

function getMostFrequent(arr:string[]):string {
    const hashmap = arr.reduce( (acc, val) => {
     acc[val] = (acc[val] || 0 ) + 1
     return acc
  },{})
 return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
 }

export default {
    solvePartOne: (input: string[]): string => {
        let splittedArray = [];
        for (let i = 0 ; i < input.length ; i++)
        {
            splittedArray.push(input[i].split(""));
        }
        const transposedArray = splittedArray[0].map((_:any, colIndex:number) => splittedArray.map(row => row[colIndex]));
        let gammaRate = [];
        let epsilonRate = [];
        for (let i = 0; i< transposedArray.length;i++)
        {
            gammaRate.push(getMostFrequent(transposedArray[i]));
            if (getMostFrequent(transposedArray[i])=="0")
            {
                epsilonRate.push("1");
            }
            else
            {
                epsilonRate.push("0");
            }
        }
        const gammaRateBinary = gammaRate.join("");
        const gammaRateNumber = parseInt(gammaRateBinary,2);

        const epsilonRateBinary = epsilonRate.join("");
        const epsilonRateNumber = parseInt(epsilonRateBinary,2);
        const powerConsumption = gammaRateNumber * epsilonRateNumber;
        return String(powerConsumption);
    },
    solvePartTwo: (input: string[]): string => {
        return ''
    }
} as Day
