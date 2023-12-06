import { sumArrayOfNumbers } from "../../2022/Day1/Day1";
import { Day } from "../../shared/day";

type Colour = string;
type Count = number;

export type Cubes = Record<Colour, Count>;

type GameInfo = {
  gameNumber: number;
  sets: Cubes[];
};

export const multiplyArrayOfNumbers = (
  accumulator: number,
  currentValue: number
) => accumulator * currentValue;

export const getGameInfoFromLine = (game: string): GameInfo => {
  const gameDetails = game.split(":");
  const sets = gameDetails[1].split(";").map((set) => {
    const cubes: Cubes = {};
    set.split(",").forEach((cube) => {
      const cubeData = cube.trim().split(" ");
      cubes[cubeData[1]] = Number(cubeData[0]);
    });
    return cubes;
  });
  return {
    gameNumber: Number(gameDetails[0].split(" ")[1]),
    sets,
  };
};

export const isGamePossible = (bagInfo: Cubes, sets: Cubes[]) => {
  return sets.every((set) =>
    Object.keys(set).every((colour) => bagInfo[colour] >= set[colour])
  );
};

export const getMinimumNumberOfCubesNeeded = (sets: Cubes[]) => {
  const minimumCubes: Cubes = {};
  sets.forEach((set) => {
    Object.keys(set).forEach((colour) => {
      if (!minimumCubes[colour] || minimumCubes[colour] < set[colour]) {
        minimumCubes[colour] = set[colour];
      }
    });
  });
  return minimumCubes;
};

export const getPowerOfCubes = (cubes: Cubes): number => {
  return Object.values(cubes).reduce(multiplyArrayOfNumbers, 1);
};

export const solvePartOne = (games: string[]) => {
  const bagInfo: Cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  return games
    .map((game) => getGameInfoFromLine(game))
    .filter((game) => isGamePossible(bagInfo, game.sets))
    .map((game) => game.gameNumber)
    .reduce(sumArrayOfNumbers, 0);
};

export const solvePartTwo = (games: string[]): number => {
  return games
    .map((game) =>
      getPowerOfCubes(
        getMinimumNumberOfCubesNeeded(getGameInfoFromLine(game).sets)
      )
    )
    .reduce(sumArrayOfNumbers, 0);
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
