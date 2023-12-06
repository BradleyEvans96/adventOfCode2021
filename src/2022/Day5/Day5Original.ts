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
  console.log("starting board - ", board);
  // Board is in the form of letter being in the 2,6,10,14th position -> 4n-2
  const lanes = board[board.length - 1]
    .split(" ")
    .filter((item) => item !== " ")
    .map((item) => Number(item));
  console.log("lanes - ", lanes);
  const numberOfLanes = Math.max(...lanes);
  console.log("number of lanes - ", numberOfLanes);

  let crateArrangement = {};
  for (let index = 0; index < numberOfLanes; index++) {
    crateArrangement[`lane${index}`] = [];
  }

  const rows = board.slice(0, -1);
  for (let index = 0; index < numberOfLanes; index++) {
    rows.forEach((r) => {
      const crate = r.charAt(4 * (index + 1) - 3);
      if (crate !== " ") {
        crateArrangement[`lane${index}`].push(r.charAt(4 * (index + 1) - 3));
      }
    });
  }

  for (let index = 0; index < numberOfLanes; index++) {
    crateArrangement[`lane${index}`].reverse();
  }
  return crateArrangement;
};

type Instruction = {
  move: number;
  from: number;
  to: number;
};

const convertInstructions = (instructions: string[]): Instruction[] => {
  return instructions.map((i) => {
    const splitString = i.split(" ");
    return {
      move: Number(splitString[1]),
      from: Number(splitString[3]),
      to: Number(splitString[5]),
    };
  });
};

const handleMovement = (instruction: Instruction, crateArrangement: object) => {
  const fromCrate = crateArrangement[`lane${instruction.from - 1}`];
  const toCrate = crateArrangement[`lane${instruction.to - 1}`];
  const cratesToMove =
    fromCrate.length > instruction.move
      ? fromCrate.slice(-instruction.move)
      : fromCrate;
  const newFrom =
    fromCrate.length > instruction.move
      ? fromCrate.slice(0, -instruction.move)
      : [];
  cratesToMove.reverse().forEach((c) => {
    toCrate.push(c);
  });
  const newBoard = crateArrangement;
  newBoard[`lane${instruction.from - 1}`] = newFrom;
  newBoard[`lane${instruction.to - 1}`] = toCrate;
  return newBoard;
};

const handleMovements = (
  instructions: Instruction[],
  initialArrangemenet: object
) => {
  let board = initialArrangemenet;
  instructions.forEach((i) => {
    const newBoard = handleMovement(i, board);
    board = newBoard;
  });
  return board;
};

const getTopOfStacks = (arrangement: object) => {
  const message = Object.values(arrangement)
    .flatMap((i: string[]) => i.slice(-1))
    .join("");
  return message;
};

const determineCratesOnTop = (input: string[]) => {
  const { startingBoard, instructions } = convertDataIntoInstructions(input);
  const mappedBoard = converStartingBoardToObject(startingBoard);
  console.log("mappedBoard - ", mappedBoard);
  const convertedInstructions = convertInstructions(instructions);
  const boardAfterMovements = handleMovements(
    convertedInstructions,
    mappedBoard
  );
  console.log("------", boardAfterMovements);
  return String(getTopOfStacks(boardAfterMovements));
};

export default {
  solvePartOne: (input: string[]): string => determineCratesOnTop(input),
  solvePartTwo: (input: string[]): string =>
    "calculateNumberOfInefficientElves(input)",
} as Day;
