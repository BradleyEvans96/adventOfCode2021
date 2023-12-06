import { sumArrayOfNumbers } from "../../helpers/reducers";
import { Day } from "../../shared/day";

export const solvePartOne = (input: string[]) => {
  const reg = new RegExp("[0-9]");
  const numbers = input.map((line) =>
    line.split("").filter((l) => reg.test(l))
  );
  const firstAndLast = numbers
    .map((num) => Number(`${num[0]}${num[num.length - 1]}`))
    .filter((v) => !Number.isNaN(v));
  return String(firstAndLast.reduce(sumArrayOfNumbers, 0));
};

const getWordsAndNumbers = (input: string) => {
  const reg = new RegExp(
    /[0-9]|(?=(one|two|three|four|five|six|seven|eight|nine))/g
  );
  return Array.from(input.matchAll(reg), ([g1, g2]) => [...g1, g2])
    .flatMap((v) => v)
    .filter((v) => v && v !== "");
};

export const solvePartTwo = (input: string[]) => {
  const wordToNumber = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  const numbers = input
    .map((line) => getWordsAndNumbers(line))
    .map((line) => line.map((v) => (wordToNumber[v] ? wordToNumber[v] : v)));
  const firstAndLast = numbers
    .map((num) => Number(`${num[0]}${num[num.length - 1]}`))
    .filter((v) => !Number.isNaN(v));
  return String(firstAndLast.reduce(sumArrayOfNumbers, 0));
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
