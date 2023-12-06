import { multiplyArrayOfNumbers } from "../../helpers/reducers";
import { Day } from "../../shared/day";
const getTimeAndDistanceOfRaces = (input: string[]) => {
  const raceTimes = input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((v) => v !== "")
    .map((v) => Number(v));
  const recordDistances = input[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((v) => v !== "")
    .map((v) => Number(v.trim()));
  return recordDistances.map((record, index) => ({
    raceTime: raceTimes[index],
    raceRecord: record,
  }));
};

const getTimeAndDistanceOfRace = (input: string[]) => {
  const raceTime = input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((v) => v !== "")
    .join("");
  const recordDistance = input[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((v) => v !== "")
    .join("");
  return {
    raceTime: Number(raceTime.trim()),
    raceRecord: Number(recordDistance.trim()),
  };
};

export const getIntersectionValues = (
  raceDuration: number,
  raceRecord: number
) => {
  // equation to getDistanceTravelled: y = x(raceDuration - x)
  // y is distanceTravelled
  // x is numberOfSeconds
  // raceDuration is maximum number that x can be
  // raceRecord < x(raceDuration - x)
  // y < x^2 - xz
  // x*2 - zx - y > 0
  // quadratic formula = x = -b +- sqrt(z^2-4y)/2
  const sqrtValue = Math.sqrt(Math.pow(raceDuration, 2) - 4 * raceRecord);
  return {
    maxX: (raceDuration + sqrtValue) / 2,
    minX: (raceDuration - sqrtValue) / 2,
  };
};

export const solvePartOne = (input: string[]) => {
  const timeAndDistances = getTimeAndDistanceOfRaces(input);
  const minAndMaxValues = timeAndDistances
    .map(({ raceRecord, raceTime }) =>
      getIntersectionValues(raceTime, raceRecord)
    )
    .map((v) => ({
      minX: v.minX % 1 === 0 ? v.minX + 1 : Math.ceil(v.minX),
      maxX: v.maxX % 1 === 0 ? v.maxX - 1 : Math.floor(v.maxX),
    }));
  const numberOfValues = minAndMaxValues.map((v) => v.maxX - v.minX + 1);
  return String(numberOfValues.reduce(multiplyArrayOfNumbers, 1));
};

export const solvePartTwo = (input: string[]) => {
  const timeAndDistances = [getTimeAndDistanceOfRace(input)];
  const minAndMaxValues = timeAndDistances
    .map(({ raceRecord, raceTime }) =>
      getIntersectionValues(raceTime, raceRecord)
    )
    .map((v) => ({
      minX: v.minX % 1 === 0 ? v.minX + 1 : Math.ceil(v.minX),
      maxX: v.maxX % 1 === 0 ? v.maxX - 1 : Math.floor(v.maxX),
    }));
  const numberOfValues = minAndMaxValues.map((v) => v.maxX - v.minX + 1);
  return String(numberOfValues.reduce(multiplyArrayOfNumbers, 1));
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
