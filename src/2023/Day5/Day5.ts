import { Day } from "../../shared/day";

type MapData = {
  destinationStart: number;
  sourceRangeStart: number;
  rangeLength: number;
};

type SoilData = Record<string, MapData[]>;

const convertToSoilMap = (input: string[]) => {
  const soilData: SoilData = {};
  let dataKey = "";
  input
    .filter((i) => i !== "")
    .forEach((line) => {
      if (line.includes(":")) {
        dataKey = line.split(" map:")[0];
      } else {
        const numbers = line
          .trim()
          .split(" ")
          .map((i) => Number(i));
        const itemToAdd: MapData = {
          destinationStart: numbers[0],
          sourceRangeStart: numbers[1],
          rangeLength: numbers[2],
        };
        if (!soilData[dataKey]) {
          soilData[dataKey] = [itemToAdd];
        } else {
          soilData[dataKey].push(itemToAdd);
        }
      }
    });
  return soilData;
};

const getSeedData = (input: string) => {
  console.log("input - ", input);
  return input
    .split(":")[1]
    .trim()
    .split(" ")
    .map((i) => Number(i));
};

const mapToDestination = (sourceNumber: number, mapData: MapData[]) => {
  const isInRange = mapData.find(
    (row) =>
      sourceNumber >= row.sourceRangeStart &&
      sourceNumber < row.sourceRangeStart + row.rangeLength
  );
  if (isInRange) {
    return (
      isInRange.destinationStart - isInRange.sourceRangeStart + sourceNumber
    );
  } else {
    return sourceNumber;
  }
};

export const solvePartOne = (input: string[]) => {
  const seeds = getSeedData(input[0]);
  const soilData = input;
  soilData.shift();
  const soilDataMap = convertToSoilMap(soilData);
  const seedsToLocation = seeds
    .map((seed) => mapToDestination(seed, soilDataMap["seed-to-soil"]))
    .map((soil) => mapToDestination(soil, soilDataMap["soil-to-fertilizer"]))
    .map((fert) => mapToDestination(fert, soilDataMap["fertilizer-to-water"]))
    .map((water) => mapToDestination(water, soilDataMap["water-to-light"]))
    .map((light) =>
      mapToDestination(light, soilDataMap["light-to-temperature"])
    )
    .map((temp) =>
      mapToDestination(temp, soilDataMap["temperature-to-humidity"])
    )
    .map((hum) => mapToDestination(hum, soilDataMap["humidity-to-location"]));
  return String(Math.min(...seedsToLocation));
};

export const solvePartTwo = (input: string[]) => {
  const seedsAndRanges = getSeedData(input[0]);
  const soilData = input;
  soilData.shift();
  const soilDataMap = convertToSoilMap(soilData);
  let minimumLocation: number | undefined;
  for (let index = 0; index < seedsAndRanges.length; index++) {
    // For Each Pair Of Seeds
    const startingSeed = seedsAndRanges[index];
    const rangeOfSeeds = seedsAndRanges[index + 1];
    console.log("pair of seeds - ", startingSeed, rangeOfSeeds);
    for (let j = 0; j <= rangeOfSeeds; j++) {
      const seed = startingSeed + j;
      const soil = mapToDestination(seed, soilDataMap["seed-to-soil"]);
      const fert = mapToDestination(soil, soilDataMap["soil-to-fertilizer"]);
      const water = mapToDestination(fert, soilDataMap["fertilizer-to-water"]);
      const light = mapToDestination(water, soilDataMap["water-to-light"]);
      const temp = mapToDestination(light, soilDataMap["light-to-temperature"]);
      const hum = mapToDestination(
        temp,
        soilDataMap["temperature-to-humidity"]
      );
      const location = mapToDestination(
        hum,
        soilDataMap["humidity-to-location"]
      );
      console.log("location - ", location);
      if (!minimumLocation || minimumLocation > location) {
        minimumLocation = location;
      }
    }
    index++;
  }
  return String(minimumLocation);
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
