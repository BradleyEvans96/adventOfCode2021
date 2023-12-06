import { writeFile, mkdirSync, existsSync } from "fs";
import { dayNumber, typescriptTemplate, yearNumber } from "./shared/constants";
import { getPuzzleInput } from "./shared/getAdventOfCodeData";

const createFiles = async () => {
  console.log(
    `Creating File Templates for Day: ${dayNumber} Year: ${yearNumber}`
  );
  const dataPath = `data/${yearNumber}/day${dayNumber}`;
  if (!existsSync(dataPath)) {
    console.log("Data directory did not exist - creating...");
    mkdirSync(dataPath, { recursive: true });
  }
  const solutionsPath = `src/${yearNumber}/Day${dayNumber}`;
  if (!existsSync(solutionsPath)) {
    console.log("Solutions directory did not exist - creating...");
    mkdirSync(solutionsPath, { recursive: true });
  }
  console.log("Creating file templates");
  const puzzleInputText = await getPuzzleInput(yearNumber, dayNumber);

  writeFile(
    `${solutionsPath}/Day${dayNumber}.ts`,
    typescriptTemplate,
    (err) => {
      if (err) {
        console.log("error - ", err);
      } else {
        console.log(`Solution File for Day${dayNumber} created.`);
      }
    }
  );

  writeFile(`${dataPath}/test.txt`, puzzleInputText, (err) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log(`AOC Test Input File for Day${dayNumber} created.`);
    }
  });
};

// Run the code
createFiles();
