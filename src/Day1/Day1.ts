import { Day } from '../shared/day';

export default {
    solvePartOne: (input: string[]): string => {

        let increaseCount = 0;

        for (let i = 1; i < input.length; i++)
        {
            // console.log(input[i])
            let j = i -1;
            if (input[i] > input[j])
            {
                increaseCount ++;
            }
        }
        // console.log(increaseCount);

        return String(increaseCount)
    },
    solvePartTwo: (input: string[]): string => {
        // Write code here
        return ''
    }
} as Day
