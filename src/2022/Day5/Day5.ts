import { Day } from "../../shared/day";
import { createGroups } from "../Day3/Day3";

const convertDataIntoInstructions = (input: string[]) => {
  const indexToSplit = input.findIndex((line) => line === "");
  return {
    startingBoard: input.slice(0, indexToSplit),
    instructions: input.slice(indexToSplit + 1),
  };
};

const converStartingBoardToObject = (board: string[]) => {
  const splitBoard = board.map((row) => row.split(" "));
  const lanes = splitBoard[splitBoard.length - 1]
    .filter((item) => item !== " ")
    .map((item) => Number(item));
  const numberOfLanes = Math.max(...lanes);
  const rows = splitBoard
    .slice(0, -1)
    .map((row) => createGroups(row, numberOfLanes))
    .reverse();
  let crateArrangement = {};
  // Create Container lanes
  for (let index = 0; index < numberOfLanes; index++) {
    crateArrangement[`lane${index}`] = [];
  }
  rows.forEach((row) => {
    row.forEach((line) => {
      line.forEach((item, index) => {
        if (item !== "") {
          crateArrangement[`lane${index}`].push(item);
        }
      });
    });
  });
};

const convertInstructions = () => {};

const determineCratesOnTop = (input: string[]) => {
  console.log("data - ", convertDataIntoInstructions(input));
  const { startingBoard } = convertDataIntoInstructions(input);
  const mappedBoard = converStartingBoardToObject(startingBoard);
  // Convert instructions
  // Handle movement
  // remember crates are in reverse order when placed down
  return "";
};

export default {
  solvePartOne: (input: string[]): string => determineCratesOnTop(input),
  solvePartTwo: (input: string[]): string =>
    "calculateNumberOfInefficientElves(input)",
} as Day;
