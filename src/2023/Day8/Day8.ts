import { getLowestCommonMultiple } from "../../helpers";
import { Day } from "../../shared/day";

type Key = {
  L: string;
  R: string;
};

type Map = Record<string, Key>;

const dataToMap = (input: string[]) => {
  const map: Map = {};
  input.forEach((line) => {
    if (line !== "") {
      const [key, instructions] = line.split(" = (");
      const [left, right] = instructions.slice(0, -1).split(", ");
      map[key.trim()] = { L: left.trim(), R: right.trim() };
    }
  });
  return map;
};

const getNumberOfStepsForNode = (
  node: string,
  map: Map,
  instructions: string[]
) => {
  let found = false;
  let steps = 0;
  let location = node;
  while (!found) {
    instructions.some((i) => {
      steps++;
      if (map[location][i].charAt(2) !== "Z") {
        location = map[location][i];
        return false;
      } else {
        found = true;
        return true;
      }
    });
  }
  return steps;
};

export const solvePartOne = (input: string[]) => {
  const instructions = input[0].split("");
  console.log(instructions);
  // Remove first line
  input.shift();
  const map = dataToMap(input);
  let found = false;
  let steps = 0;
  let location = "AAA";
  while (!found) {
    instructions.some((i) => {
      steps++;
      if (map[location][i] !== "ZZZ") {
        location = map[location][i];
        return false;
      } else {
        found = true;
        return true;
      }
    });
  }
  return `Steps: - ${steps}`;
};

const getStartingNodes = (map: Map) => {
  return Object.keys(map).filter((v) => v.charAt(v.length - 1) === "A");
};

const isAllNodesAtEnd = (nodes: string[]) => {
  return nodes.every((v) => v.charAt(v.length - 1) === "Z");
};

export const solvePartTwo = (input: string[]) => {
  const instructions = input[0].split("");
  // Remove first line
  input.shift();
  const map = dataToMap(input);
  const nodes = getStartingNodes(map);
  const stepsForEachNode = nodes.map((node) =>
    getNumberOfStepsForNode(node, map, instructions)
  );
  const steps = getLowestCommonMultiple(stepsForEachNode);
  return `Steps - ${steps}`;
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
