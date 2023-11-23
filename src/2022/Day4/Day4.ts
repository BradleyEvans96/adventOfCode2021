import { Day } from "../../shared/day";

type ElfData = {
  min: number;
  max: number;
};
const getSectionAssignmentForElf = (s: string) => {
  const values = s.split("-");
  return {
    min: Number(values[0]),
    max: Number(values[1]),
  };
};

const isFullOverlap = (elfOne: ElfData, elfTwo: ElfData) => {
  return (
    (elfOne.min >= elfTwo.min &&
      elfOne.min <= elfTwo.max &&
      elfOne.max <= elfTwo.max &&
      elfOne.max >= elfTwo.min) ||
    (elfTwo.min >= elfOne.min &&
      elfTwo.min <= elfOne.max &&
      elfTwo.max <= elfOne.max &&
      elfTwo.max >= elfOne.min)
  );
};

const isPartialOverlap = (elfOne: ElfData, elfTwo: ElfData) => {
  return (
    (elfOne.min >= elfTwo.min && elfOne.min <= elfTwo.max) ||
    (elfOne.max <= elfTwo.max && elfOne.max >= elfTwo.min) ||
    (elfTwo.min >= elfOne.min && elfTwo.min <= elfOne.max) ||
    (elfTwo.max <= elfOne.max && elfTwo.max >= elfOne.min)
  );
};

const calculateNumberOfCompleteInefficientElves = (input: string[]) => {
  const elfData = input.map((line) => line.split(","));
  const sectionAssignments = elfData.map((line) =>
    line.map((e) => getSectionAssignmentForElf(e))
  );
  const fullOverlaps = sectionAssignments.map((elves) =>
    isFullOverlap(elves[0], elves[1])
  );
  return String(fullOverlaps.filter(Boolean).length);
};

const calculateNumberOfInefficientElves = (input: string[]) => {
  const elfData = input.map((line) => line.split(","));
  const sectionAssignments = elfData.map((line) =>
    line.map((e) => getSectionAssignmentForElf(e))
  );
  const partialOverlaps = sectionAssignments.map((elves) =>
    isPartialOverlap(elves[0], elves[1])
  );
  return String(partialOverlaps.filter(Boolean).length);
};

export default {
  solvePartOne: (input: string[]): string =>
    calculateNumberOfCompleteInefficientElves(input),
  solvePartTwo: (input: string[]): string =>
    calculateNumberOfInefficientElves(input),
} as Day;
