import { splitLinesIntoChars } from "../../helpers";
import { sumArrayOfNumbers } from "../../helpers/reducers";
import { Day } from "../../shared/day";

const transpose = (array: string[][]) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

export const solvePartOne = (input: string[]) => {
  const inputSplit = input.map((line) => splitLinesIntoChars(line));
  const duplicatedRows: string[][] = [];
  inputSplit.forEach((line) => {
    if (line.every((v) => v === ".")) {
      duplicatedRows.push(line);
    }
    duplicatedRows.push(line);
  });

  const transposedMap = transpose(duplicatedRows);
  const duplicatedColumns: string[][] = [];
  transposedMap.forEach((line) => {
    if (line.every((v) => v === ".")) {
      duplicatedColumns.push(line);
    }
    duplicatedColumns.push(line);
  });
  const transposedBack = transpose(duplicatedColumns);
  const galaxies: { x: number; y: number }[] = [];
  transposedBack.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char === "#") {
        galaxies.push({ x, y });
      }
    });
  });
  const distances: number[] = [];
  while (galaxies.length > 0) {
    const c1 = galaxies[0];
    galaxies.forEach((c2) => {
      if (c1 !== c2) {
        distances.push(Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y));
      }
    });
    galaxies.shift();
  }

  return String(distances.reduce(sumArrayOfNumbers, 0));
};

const getNumbersInRange = (
  numbers: number[],
  valueOne: number,
  valueTwo: number
) => {
  let filteredNumbers;
  if (valueOne > valueTwo) {
    filteredNumbers = numbers.filter((v) => v < valueOne && v > valueTwo);
  } else {
    filteredNumbers = numbers.filter((v) => v < valueTwo && v > valueOne);
  }
  return filteredNumbers;
};

export const solvePartTwo = (input: string[]) => {
  const inputSplit = input.map((line) => splitLinesIntoChars(line));
  const grownYIndexes: number[] = [];
  const grownXIndexes: number[] = [];
  inputSplit.forEach((line, index) => {
    if (line.every((v) => v === ".")) {
      grownYIndexes.push(index);
    }
  });
  const transposedMap = transpose(inputSplit);
  transposedMap.forEach((line, index) => {
    if (line.every((v) => v === ".")) {
      grownXIndexes.push(index);
    }
  });
  const galaxies: { x: number; y: number }[] = [];
  inputSplit.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char === "#") {
        galaxies.push({ x, y });
      }
    });
  });
  const distances: number[] = [];
  while (galaxies.length > 0) {
    const c1 = galaxies[0];
    galaxies.forEach((c2) => {
      if (c1 !== c2) {
        const numberOfGrownYGalaxies = getNumbersInRange(
          grownYIndexes,
          c1.y,
          c2.y
        ).length;
        const numberOfGrownXGalaxies = getNumbersInRange(
          grownXIndexes,
          c1.x,
          c2.x
        ).length;

        const distanceInX =
          Math.abs(c1.x - c2.x) -
          numberOfGrownXGalaxies +
          numberOfGrownXGalaxies * 1000000;
        const distanceInY =
          Math.abs(c1.y - c2.y) -
          numberOfGrownYGalaxies +
          numberOfGrownYGalaxies * 1000000;
        distances.push(distanceInX + distanceInY);
      }
    });
    galaxies.shift();
  }

  return String(distances.reduce(sumArrayOfNumbers, 0));
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
