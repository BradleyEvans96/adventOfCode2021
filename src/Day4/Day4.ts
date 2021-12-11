import { Day } from '../shared/day';

function convertBingoCalls(input: string): number[] {
    return input.split(",").map(item=>parseInt(item));
};

function convertBingoLine(input: string): number[] {
    return input.trim().split(" ").map(item=>parseInt(item)).filter(function (value){
        return !Number.isNaN(value);
    });
};

function generateBingoBoard(input: string[]): number[][] {
    let bingoBoard = [];
    for (let i:number=0;i<input.length;i++)
    {
        bingoBoard.push(convertBingoLine(input[i]));
    }
    return bingoBoard;
}
function collectAllBingoBoards(input: string[]):number[][][] {
    let allBingoBoards = [];
    for (let i:number = 2; i<input.length;i++)
    {
        allBingoBoards.push(generateBingoBoard(input.slice(i,i+5)));
        i = i+5;
    }
    return allBingoBoards;

}

interface winningBoard {
    board: number[][]
    lastNumber: number
}


function findWinningBoard(input: string[]): winningBoard {
    const bingoCalls = convertBingoCalls(input[0]);
        let allBingoBoards = collectAllBingoBoards(input);
        let winningBoard:number[][] = [];
            for(let i:number = 0; i < bingoCalls.length;i++)
        {
            for (let j:number = 0; j<allBingoBoards.length;j++)
            {
                //For each bingo board
                for (let k:number = 0; k<allBingoBoards[j].length;k++)
                {
                    // For each bingo line
                    allBingoBoards[j][k] = allBingoBoards[j][k].filter(num => num !== bingoCalls[i])
                    if (allBingoBoards[j][k].length==0)
                    {
                        winningBoard = allBingoBoards[j];
                        return {board: allBingoBoards[j],lastNumber:bingoCalls[i]};
                    }
                }
            }
        }
}

function add(accumulator:number,a:number)
{
    return accumulator + a ;
}


export default {
    solvePartOne: (input: string[]): string => {
        const winningBoard = findWinningBoard(input);
        const flattenBoard = [].concat.apply([],winningBoard.board);
        const sum = flattenBoard.reduce(add,0);
        console.log(winningBoard.lastNumber)
        console.log(flattenBoard);
        return String(sum * winningBoard.lastNumber);
    },
    solvePartTwo: (input: string[]): string => {
        return '';
    }
} as Day
