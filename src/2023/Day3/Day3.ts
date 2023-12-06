import {
  multiplyArrayOfNumbers,
  sumArrayOfNumbers,
} from "../../helpers/reducers";
import { Day } from "../../shared/day";

export const getSymbolPositionsOnLine = (line: string, row) => {
  return line
    .split("")
    .map((char, index) =>
      Number.isNaN(Number(char)) && char !== "." ? { x: index, y: row } : ""
    )
    .filter((c) => c !== "");
};

export const getUniqueList = (list: any[]) => {
  return list.filter((value, index, array) => array.indexOf(value) === index);
};

type NumberDetails = {
  value: string;
  startingX: number;
  endingX?: number;
  y?: number;
};

export const getNumbersAndPositionsOnLine = (line: string, row: number) => {
  const charsOnLine = line.split("");
  const numbersDetails: NumberDetails[] = [];
  let numberFound = false;
  charsOnLine.forEach((char, index) => {
    if (!Number.isNaN(Number(char)) && char !== ".") {
      if (numberFound) {
        const valueToUpdate: NumberDetails = {
          value: `${numbersDetails[numbersDetails.length - 1].value}${char}`,
          startingX: numbersDetails[numbersDetails.length - 1].startingX,
        };
        numbersDetails.pop();
        numbersDetails.push(valueToUpdate);
      } else {
        numbersDetails.push({ value: `${char}`, startingX: index });
        numberFound = true;
      }
    } else if (numberFound) {
      const valueToUpdate: NumberDetails = {
        ...numbersDetails[numbersDetails.length - 1],
        endingX: index - 1,
        y: row,
      };
      numbersDetails.pop();
      numbersDetails.push(valueToUpdate);
      numberFound = false;
    }
  });
  // Check if end of line
  const lastItemInLine = numbersDetails[numbersDetails.length - 1];
  if (!lastItemInLine?.endingX) {
    numbersDetails.pop();
    numbersDetails.push({
      ...lastItemInLine,
      endingX: charsOnLine.length - 1,
      y: row,
    });
  }
  return numbersDetails;
};

type RowDetails = {
  x: number;
  y: number;
};

const isNumberAdjacent = (
  number: NumberDetails,
  symbolPositions: RowDetails[]
) => {
  return symbolPositions.find(
    (symbol) =>
      symbol.y >= number.y - 1 &&
      symbol.y <= number.y + 1 &&
      symbol.x >= number.startingX - 1 &&
      symbol.x <= number.endingX + 1
  );
};

export const solvePartOne = (input: string[]) => {
  const symbolPositions = input.flatMap((line, index) =>
    getSymbolPositionsOnLine(line, index)
  );
  const numberValuesAndPositions = input.flatMap((line, index) =>
    getNumbersAndPositionsOnLine(line, index)
  );
  const numbersAdjacent = numberValuesAndPositions.filter((number) =>
    isNumberAdjacent(number, symbolPositions as RowDetails[])
  );
  const sumOfNumbersAdjacent = numbersAdjacent
    .map((n) => Number(n.value))
    .reduce(sumArrayOfNumbers, 0);
  return String(sumOfNumbersAdjacent);
};

const getGearPositionsOnLine = (line: string, row: number) => {
  return line
    .split("")
    .map((char, index) => (char === "*" ? { x: index, y: row } : ""))
    .filter((c) => c !== "");
};

const getNumbersAdjacentToGear = (
  gear: RowDetails,
  numbers: NumberDetails[]
) => {
  return numbers.filter(
    (number) =>
      gear.y >= number.y - 1 &&
      gear.y <= number.y + 1 &&
      gear.x >= number.startingX - 1 &&
      gear.x <= number.endingX + 1
  );
};

export const solvePartTwo = (input: string[]) => {
  const gearPositions = input.flatMap((line, index) =>
    getGearPositionsOnLine(line, index)
  );
  const numberValuesAndPositions = input.flatMap((line, index) =>
    getNumbersAndPositionsOnLine(line, index)
  );
  const numbersAdjacentToGears = gearPositions.map((g) =>
    getNumbersAdjacentToGear(g as RowDetails, numberValuesAndPositions)
  );
  const valuesOfTwoNumbers = numbersAdjacentToGears
    .filter((v) => v.length === 2)
    .map((line) =>
      line.map((v) => Number(v.value)).reduce(multiplyArrayOfNumbers, 1)
    );
  const total = valuesOfTwoNumbers.reduce(sumArrayOfNumbers, 0);
  return String(total);
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
