import { readFileForDay, readTestFileForDay } from "./shared/fileToArray";

// The day to run
const dayNumber = 4

// Run the code
solveForDay(dayNumber)

async function solveForDay(dayNumber: number): Promise<void> {
  // Read the input
  const testinput = readTestFileForDay(dayNumber)
  const input = readFileForDay(dayNumber)

  // If you were testing using their example inputs, you could just comment out the above line and do something like this
  // Although adding unit testing would be better
  // const input = [ 199, '200','208','210','200','207','240','269','260','263']

  console.log('🎄 Advent of Code 2021 🎁')
  console.log(`Day ${dayNumber}`)

  // Dynamically import the day from the file. This assumes the file and folder are named correctly. And the file exports a default Day
  const { default: day } = await import(`./day${dayNumber}/Day${dayNumber}`)

  const partOneExampleAnswer = day.solvePartOne(testinput)
  console.log(`Part 1 Example: ${partOneExampleAnswer}`)

  const partOneAnswer = day.solvePartOne(input)
  console.log(`Part 1 Actual: ${partOneAnswer}`)

  // const partTwoExampleAnswer = day.solvePartTwo(testinput)
  // console.log(`Part 2 Example: ${partTwoExampleAnswer}`)

  // const partTwoAnswer = day.solvePartTwo(input)
  // console.log(`Part 2 Actual: ${partTwoAnswer}`)
}