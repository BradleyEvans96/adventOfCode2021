import Day1 from "./day1/Day1";
import { readFileForDay } from "./shared/fileToArray";

// The day to run
const dayNumber = 1

// Read the input
const input = readFileForDay(dayNumber)

// If you were testing using their inputs, you could just comment out the above line and do something like this
// const input = [ 199, '200','208','210','200','207','240','269','260','263']

console.log('🎄 Advent of Code 2021 🎁')

const partOneAnswer = Day1.solvePartOne(input)
console.log(`Part 1: ${partOneAnswer}`)

const partTwoAnswer = Day1.solvePartTwo(input)
console.log(`Part 2: ${partTwoAnswer}`)