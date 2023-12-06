import { sumArrayOfNumbers } from "../../2022/Day1/Day1";
import { Day } from "../../shared/day";

type CardDetails = {
  winningNumbers: number[];
  cardNumbers: number[];
};

export const getIntersectionOfTwoArrays = (array1: any[], array2: any[]) => {
  return array1.filter((value) => array2.includes(value));
};

const getCardDetailsFromString = (input: string): CardDetails => {
  const numberValues = input.split(":")[1].trim().split("|");
  return {
    winningNumbers: numberValues[0]
      .trim()
      .split(" ")
      .map((v) => Number(v))
      .filter((n) => n !== 0),
    cardNumbers: numberValues[1]
      .trim()
      .split(" ")
      .map((v) => Number(v))
      .filter((n) => n !== 0),
  };
};

export const solvePartOne = (input: string[]) => {
  const cardDetails = input.map((line) => getCardDetailsFromString(line));
  const matchingNumbersOnEachLine = cardDetails
    .map(
      ({ cardNumbers, winningNumbers }) =>
        getIntersectionOfTwoArrays(winningNumbers, cardNumbers).length
    )
    .filter((v) => v !== 0)
    .map((v) => Math.pow(2, v - 1))
    .reduce(sumArrayOfNumbers, 0);
  return String(matchingNumbersOnEachLine);
};

type NumberOfCards = Record<string, number>;

export const solvePartTwo = (input: string[]) => {
  const scratchcardsCount: NumberOfCards = {};
  const cardDetails = input.map((line) => getCardDetailsFromString(line));
  cardDetails.forEach(({ cardNumbers, winningNumbers }, index) => {
    scratchcardsCount[`card${index}`] = scratchcardsCount[`card${index}`]
      ? scratchcardsCount[`card${index}`] + 1
      : 1;
    const numberOfWinsOnOneCard = getIntersectionOfTwoArrays(
      cardNumbers,
      winningNumbers
    ).length;
    if (numberOfWinsOnOneCard > 0) {
      for (let i = 1; i < numberOfWinsOnOneCard + 1; i++) {
        const initialCardsValue = scratchcardsCount[`card${index + i}`] ?? 0;
        // Add new value
        scratchcardsCount[`card${index + i}`] =
          initialCardsValue + scratchcardsCount[`card${index}`];
      }
    }
  });
  const totalNumberOfScratchCards = Object.values(scratchcardsCount)
    .slice(0, input.length)
    .reduce(sumArrayOfNumbers, 0);
  return String(totalNumberOfScratchCards);
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
