import { Day } from "../../shared/day";

export const sumArrayOfNumbers = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;

export const calculateTotalCaloriesForAllElves = (array: string[]) => {
  let key = 0;
  const groupedArray: number[][] = [];
  array.forEach((value) => {
    if (value === "") {
      key++;
      return;
    }
    if (!groupedArray[key]) {
      groupedArray[key] = [Number(value)];
    } else {
      groupedArray[key].push(Number(value));
    }
  });
  const summedValues = groupedArray.map((array) =>
    array.reduce(sumArrayOfNumbers, 0)
  );
  return summedValues;
};

const getMostCalories = (array: number[]) => {
  array.sort((a, b) => b - a);
  return String(array[0]);
};

const getTotalOfTop3Calories = (array: number[]) => {
  array.sort((a, b) => b - a);
  const top3 = array.slice(0, 3);
  return String(top3.reduce(sumArrayOfNumbers, 0));
};

export default {
  solvePartOne: (input: string[]): string =>
    getMostCalories(calculateTotalCaloriesForAllElves(input)),
  solvePartTwo: (input: string[]): string =>
    getTotalOfTop3Calories(calculateTotalCaloriesForAllElves(input)),
} as Day;
