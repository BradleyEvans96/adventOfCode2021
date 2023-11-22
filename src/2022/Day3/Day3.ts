import { Day } from "../../shared/day";

export const compartmentiseOurRucksacks = (data: string[]) => {
  return data.map((rucksack) => {
    const numberOfItemsInRucksack = rucksack.length;
    return {
      compartment1: rucksack.slice(0, numberOfItemsInRucksack / 2).split(""),
      compartment2: rucksack.slice(numberOfItemsInRucksack / 2).split(""),
    };
  });
};

export const highlightDuplicateItems = (
  listOne: string[],
  listTwo: string[]
) => {
  return listOne.filter((value) => listTwo.includes(value));
};

const totalMyPriority = (input: string[]) => {
  const compartmentedRucksack = compartmentiseOurRucksacks(input);
  const itemsInBothCompartments = highlightDuplicateItems;
  console.log("my two strings - ", compartmentiseOurRucksacks(input));

  return "";
};

export default {
  solvePartOne: (input: string[]): string => totalMyPriority(input),
  solvePartTwo: (input: string[]): string => "",
} as Day;
