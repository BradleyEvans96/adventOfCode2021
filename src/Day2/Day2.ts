import { Day } from '../shared/day';

export default {
    solvePartOne: (input: string[]): string => {
        let horizontal = 0;
        let depth = 0;
        for (let i = 0 ; i < input.length ; i++)
        {
            const command = input[i].split(" ");
            switch(command[0])
            {
                case "forward":
                    horizontal += parseInt(command[1])
                    break;
                case "down":
                    depth += parseInt(command[1])
                    break;
                case "up":
                    depth -= parseInt(command[1])
                    break;
            }
        }
        return String(horizontal * depth)
    },
    solvePartTwo: (input: string[]): string => {
        let horizontal = 0;
        let depth = 0;
        let aim = 0;
        for (let i = 0 ; i < input.length ; i++)
        {
            const command = input[i].split(" ");
            switch(command[0])
            {
                case "forward":
                    horizontal += parseInt(command[1])
                    depth += (parseInt(command[1])*aim)
                    break;
                case "down":
                    aim += parseInt(command[1])
                    break;
                case "up":
                    aim -= parseInt(command[1])
                    break;
            }
        }

        return String(horizontal * depth)
    }
} as Day
