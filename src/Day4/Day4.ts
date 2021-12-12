import { Day } from '../shared/day';

function convertBingoCalls(input: string): number[] {
    return input.split(",").map(item=>parseInt(item));
};

function convertBingoLine(input: string): BingoNumber[] {
    return input.trim().split(" ").map(item => parseInt(item)).filter(num => !Number.isNaN(num)).map(num => ({
        number: num,
        checked: false
    }))
};

function generateBingoBoard(input: string[]): BingoBoard {
    let bingoBoard: BingoBoard = [];
    for (let i:number=0;i<input.length;i++)
    {
        bingoBoard.push(convertBingoLine(input[i]));
    }
    return bingoBoard;
}

function collectAllBingoBoards(input: string[]): BingoBoard[] {
    let allBingoBoards = [];
    for (let i: number = 2; i < input.length; i++)
    {
        allBingoBoards.push(generateBingoBoard(input.slice(i,i+5)));
        i = i+5;
    }
    return allBingoBoards;

}

interface WinningBoard {
    board: BingoBoard
    lastNumber: number
}

interface BingoNumber {
    number: number
    checked: boolean
}

type BingoBoard = BingoNumber[][]

function hasWon(board: BingoBoard): boolean {
    return hasFullRow(board) || hasFullColumn(board)
}

function hasFullRow(board): boolean {
    // TODO: Implement this function to check if all BingoNumber's in a row have checked = true
    return false
}

function hasFullColumn(board): boolean {
    // TODO: Implement this function to check if all BingoNumber's in a column have checked = true
    return false
}

function findWinningBoard(input: string[]): WinningBoard {
    const bingoCalls = convertBingoCalls(input[0]);
    const allBingoBoards = collectAllBingoBoards(input);

    // For each number called
    for (const numberCalled of bingoCalls) {

        // For each board
        for (const bingoBoard of allBingoBoards) {

            // For each row in the board
            for (let row = 0; row < bingoBoard.length; row++) {

                // For each column in the row
                for (let col = 0; col < bingoBoard[row].length; col++) {

                    // If the number was called
                    if (bingoBoard[row][col].number == numberCalled) {
                        // Set checked to true
                        bingoBoard[row][col].checked = true

                        // Then check if the board has won
                        if (hasWon(bingoBoard)) {
                            return { board: bingoBoard, lastNumber: numberCalled }
                        }
                    }
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
        const flattenBoard = [].concat.apply([], winningBoard.board);
        const sum = flattenBoard.reduce(add, 0);
        console.log(winningBoard.lastNumber);
        console.log(winningBoard.board);
        return String(sum * winningBoard.lastNumber);
    },
    solvePartTwo: (input: string[]): string => {
        return '';
    }
} as Day
