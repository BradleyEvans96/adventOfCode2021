import { sumArrayOfNumbers } from "../../helpers/reducers";
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

export const getCharacterPriority = (letter: string) => {
  if (letter === letter.toUpperCase()) {
    return letter.toLowerCase().charCodeAt(0) - 96 + 26;
  }
  return letter.charCodeAt(0) - 96;
};

export const removeDuplicatesFromList = (list: string[]) => {
  return [...new Set(list)];
};

const totalMyPriority = (input: string[]) => {
  const compartmentedRucksack = compartmentiseOurRucksacks(input);
  const itemsInBothCompartments = compartmentedRucksack.map(
    ({ compartment1, compartment2 }) =>
      highlightDuplicateItems(compartment1, compartment2)
  );
  const duplicatesRemoved = itemsInBothCompartments.map((list) =>
    removeDuplicatesFromList(list)
  );
  const priorityValues = duplicatesRemoved.flatMap((item) =>
    item.map((i) => getCharacterPriority(i))
  );
  return String(priorityValues.reduce(sumArrayOfNumbers, 0));
};

export const createGroups = (input: string[], sizeOfGroup: number = 3) => {
  return Array.from({ length: Math.ceil(input.length / sizeOfGroup) }, (_, i) =>
    input.slice(i * sizeOfGroup, i * sizeOfGroup + sizeOfGroup)
  );
};

const getItemInAllCompartments = (rucksacks: string[][]) => {
  let dups = removeDuplicatesFromList(
    highlightDuplicateItems(rucksacks[0], rucksacks[1])
  );

  if (rucksacks.length > 2) {
    for (let index = 2; index < rucksacks.length; index++) {
      const newDups = removeDuplicatesFromList(
        highlightDuplicateItems(rucksacks[index], dups)
      );
      dups = newDups;
    }
  }
  return dups;
};

const totalGroupedPriority = (input: string[]) => {
  const groupsOfThree = createGroups(input);
  const splitItemsInRucksack = groupsOfThree.map((collection) =>
    collection.map((rucksack) => rucksack.split(""))
  );
  const itemInAllCompartments = splitItemsInRucksack.map((group) =>
    getItemInAllCompartments(group)
  );

  const priorityValues = itemInAllCompartments.flatMap((item) =>
    item.map((i) => getCharacterPriority(i))
  );

  return String(priorityValues.reduce(sumArrayOfNumbers, 0));
};

export default {
  solvePartOne: (input: string[]): string => totalMyPriority(input),
  solvePartTwo: (input: string[]): string => totalGroupedPriority(input),
} as Day;
