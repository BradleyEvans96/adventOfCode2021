import fs = require("fs");

export function readFile(fileName: string): string[] {
  return fs.readFileSync(fileName, "utf8").toString().split("\n");
}

export function readFileForDay(dayNumber: number, year: number): string[] {
  return readFile(`data/${year}/day${dayNumber}/test.txt`);
}

export function readTestFileForDay(dayNumber: number, year: number): string[] {
  return readFile(`data/${year}/day${dayNumber}/example.txt`);
}
