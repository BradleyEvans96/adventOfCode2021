import { Day } from "../../shared/day";

function getMostFrequent(arr: string[]): string {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}
function findRating(input: any[], isMostCommon: boolean): number {
  let arrayToFilter = input;
  let ratingFound = false;
  let bitPosition = 0;
  while (!ratingFound) {
    const transposedArray = arrayToFilter[0].map((_: any, colIndex: number) =>
      arrayToFilter.map((row) => row[colIndex])
    );
    const mostFrequentValue = getMostFrequent(transposedArray[bitPosition]);
    if (isMostCommon) {
      arrayToFilter = arrayToFilter.filter(function (arrayToFilter) {
        return arrayToFilter[bitPosition] == mostFrequentValue;
      });
    } else {
      arrayToFilter = arrayToFilter.filter(function (arrayToFilter) {
        return arrayToFilter[bitPosition] != mostFrequentValue;
      });
    }

    if (arrayToFilter.length == 1 || bitPosition >= transposedArray.length) {
      ratingFound = true;
    }
    bitPosition += 1;
  }
  return parseInt(arrayToFilter[0].join(""), 2);
}

function getOxygenGeneratorRating(input: any): number {
  console.log("Oxygen Rating: " + findRating(input, true));
  return findRating(input, true);
}

function getCO2ScrubberRating(input: any): number {
  console.log("Co2 Rating: " + findRating(input, false));
  return findRating(input, false);
}
export default {
  solvePartOne: (input: string[]): string => {
    let splittedArray = [];
    for (let i = 0; i < input.length; i++) {
      splittedArray.push(input[i].split(""));
    }
    const transposedArray = splittedArray[0].map((_: any, colIndex: number) =>
      splittedArray.map((row) => row[colIndex])
    );
    let gammaRate = [];
    let epsilonRate = [];
    for (let i = 0; i < transposedArray.length; i++) {
      gammaRate.push(getMostFrequent(transposedArray[i]));
      if (getMostFrequent(transposedArray[i]) == "0") {
        epsilonRate.push("1");
      } else {
        epsilonRate.push("0");
      }
    }
    const gammaRateBinary = gammaRate.join("");
    const gammaRateNumber = parseInt(gammaRateBinary, 2);

    const epsilonRateBinary = epsilonRate.join("");
    const epsilonRateNumber = parseInt(epsilonRateBinary, 2);
    const powerConsumption = gammaRateNumber * epsilonRateNumber;
    return String(powerConsumption);
  },
  solvePartTwo: (input: string[]): string => {
    let splittedArray = [];
    for (let i = 0; i < input.length; i++) {
      splittedArray.push(input[i].split(""));
    }
    const lifeSupportRating =
      getOxygenGeneratorRating(splittedArray) *
      getCO2ScrubberRating(splittedArray);
    return String(lifeSupportRating);
  },
} as Day;
