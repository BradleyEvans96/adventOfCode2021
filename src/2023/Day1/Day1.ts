import { Day } from "../../shared/day";

const printResult = (array: string[]) => {
  console.log("printing out console");
  return "mock answer";
};

export default {
  solvePartOne: (input: string[]): string => printResult(input),
  solvePartTwo: (input: string[]): string => printResult(input),
} as Day;
