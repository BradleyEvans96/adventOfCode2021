import { minusArrayOfNumbers, sumArrayOfNumbers } from "../../helpers/reducers";
import { Day } from "../../shared/day";

export const convertToNumberArray = (input: string): number[] => {
  return input.split(" ").map((v) => Number(v));
};

export const getDifferenceBetweenValues = (array: number[]): number[] => {
  const differences = [];
  for (let index = 0; index < array.length - 1; index++) {
    const diff = array[index + 1] - array[index];
    differences.push(diff);
  }
  return differences;
};

export const getNextNumberInSequences = (array: number[]) => {
  const differenceArrays: number[][] = [];
  let allZeroes = false;
  differenceArrays.push(array);
  let arrayToCheck = array;
  while (!allZeroes) {
    const differences = getDifferenceBetweenValues(arrayToCheck);
    if (differences.every((v) => v === 0)) {
      allZeroes = true;
    } else {
      arrayToCheck = differences;
      differenceArrays.push(differences);
    }
  }
  return differenceArrays
    .map((a) => a[a.length - 1])
    .reduce(sumArrayOfNumbers, 0);
};

export const getFirstNumberInSequences = (array: number[]) => {
  const differenceArrays: number[][] = [];
  let allZeroes = false;
  differenceArrays.push(array);
  let arrayToCheck = array;
  while (!allZeroes) {
    const differences = getDifferenceBetweenValues(arrayToCheck);
    if (differences.every((v) => v === 0)) {
      allZeroes = true;
    } else {
      arrayToCheck = differences;
      differenceArrays.push(differences);
    }
  }
  const firstValues = differenceArrays.map((a) => a[0]);
  let firstValue = 0;
  for (let index = firstValues.length - 1; index >= 0; index--) {
    firstValue = firstValues[index] - firstValue;
  }
  return firstValue;
};

export const solvePartOne = (input: string[]) => {
  const numberArrays = input.map((i) => convertToNumberArray(i));
  const differencesInNumberArrays = numberArrays.map((arr) =>
    getNextNumberInSequences(arr)
  );
  return String(differencesInNumberArrays.reduce(sumArrayOfNumbers, 0));
};

export const solvePartTwo = (input: string[]) => {
  const numberArrays = input.map((i) => convertToNumberArray(i));
  // const differenceInNumberArrays = getFirstNumberInSequences(numberArrays[1]);
  const differenceInNumberArrays = numberArrays.map((arr) =>
    getFirstNumberInSequences(arr)
  );
  return String(differenceInNumberArrays.reduce(sumArrayOfNumbers, 0));
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
