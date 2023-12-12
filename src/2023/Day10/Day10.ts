import { splitLinesIntoChars } from "../../helpers";
import { Day } from "../../shared/day";

const Pipes = {
  "|": ["north", "south"],
  "-": ["east", "west"],
  L: ["north", "east"],
  J: ["north", "west"],
  "7": ["south", "west"],
  F: ["south", "east"],
  ".": [],
};
const Connectors = {
  north: "south",
  south: "north",
  east: "west",
  west: "east",
};

type Coordinate = {
  x: number;
  y: number;
};

// The starting point will always only have 2 connecting pipes

export const identifyStartingLocation = (input: string[][]) => {
  let coordinates;
  input.find((line, i) => {
    if (line.find((c) => c === "S")) {
      coordinates = { x: line.findIndex((char) => char === "S"), y: i };
      return true;
    } else {
      return false;
    }
  });
  return coordinates;
};

type PipeDetails = {
  coordinate: Coordinate;
  from: string;
};

export const identifyConnectingPipes = (
  input: string[][],
  { x, y }: Coordinate
) => {
  let connectedPipes: PipeDetails[] = [];
  // North of pipe needs to have south in it;
  const northOfStart = { x: x, y: y - 1 };
  if (Pipes[input[northOfStart.y][northOfStart.x]].includes("south")) {
    connectedPipes.push({ coordinate: northOfStart, from: "north" });
  }
  const southOfStart = { x, y: y + 1 };
  if (Pipes[input[southOfStart.y][southOfStart.x]].includes("north")) {
    connectedPipes.push({ coordinate: southOfStart, from: "south" });
  }
  const eastOfStart = { x: x + 1, y };
  if (Pipes[input[eastOfStart.y][eastOfStart.x]].includes("west")) {
    connectedPipes.push({ coordinate: eastOfStart, from: "east" });
  }
  const westOfStart = { x: x - 1, y };
  if (Pipes[input[westOfStart.y][westOfStart.x]].includes("east")) {
    connectedPipes.push({ coordinate: westOfStart, from: "west" });
  }
  return connectedPipes;
};

const getNextCoordinate = ({ x, y }: Coordinate, from: string): PipeDetails => {
  if (from === "north") {
    return {
      coordinate: { x, y: y - 1 },
      from,
    };
  } else if (from === "south") {
    return {
      coordinate: { x, y: y + 1 },
      from,
    };
  } else if (from === "east") {
    return {
      coordinate: { x: x + 1, y },
      from,
    };
  } else {
    return {
      coordinate: { x: x - 1, y },
      from,
    };
  }
  // check this coordinate
  // find out direction of pipe and pass onto the next coordinate
};

const getLengthOfPath = (pipeMap: string[][], startingPipe: PipeDetails) => {
  let firstStart = startingPipe;
  let lengthOfRoute = 1;
  while (pipeMap[firstStart.coordinate.y][firstStart.coordinate.x] !== "S") {
    const pipe = pipeMap[firstStart.coordinate.y][firstStart.coordinate.x];
    const newDirection = Pipes[pipe].filter(
      (p) => p !== Connectors[firstStart.from]
    )[0];
    lengthOfRoute++;
    firstStart = getNextCoordinate(firstStart.coordinate, newDirection);
  }
  return lengthOfRoute;
};

const getPathAsCoordinates = (
  pipeMap: string[][],
  startingPipe: PipeDetails
) => {
  let firstStart = startingPipe;
  const coordinates: Coordinate[] = [];
  while (pipeMap[firstStart.coordinate.y][firstStart.coordinate.x] !== "S") {
    const pipe = pipeMap[firstStart.coordinate.y][firstStart.coordinate.x];
    const newDirection = Pipes[pipe].filter(
      (p) => p !== Connectors[firstStart.from]
    )[0];
    coordinates.push(firstStart.coordinate);
    firstStart = getNextCoordinate(firstStart.coordinate, newDirection);
  }
  // Push last coordinate in -
  coordinates.push(firstStart.coordinate);
  return coordinates;
};

const isPointInPolygon = (
  point: Coordinate,
  polygonAsCoordinates: Coordinate[]
) => {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
  let inside = false;
  for (
    var i = 0, j = polygonAsCoordinates.length - 1;
    i < polygonAsCoordinates.length;
    j = i++
  ) {
    const xi = polygonAsCoordinates[i].x,
      yi = polygonAsCoordinates[i].y;
    const xj = polygonAsCoordinates[j].x,
      yj = polygonAsCoordinates[j].y;

    var intersect =
      yi > point.y != yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

export const solvePartOne = (input: string[]) => {
  const inputSplit = input.map((l) => splitLinesIntoChars(l));
  const startingPosition = identifyStartingLocation(inputSplit);
  const connectedPipes = identifyConnectingPipes(inputSplit, startingPosition);
  const firstStart = connectedPipes[0];
  const lengthFromFirst = getLengthOfPath(inputSplit, firstStart);
  const secondStart = connectedPipes[1];
  const lengthFromSecond = getLengthOfPath(inputSplit, secondStart);
  return String(Math.max(lengthFromFirst / 2, lengthFromSecond / 2));
};

function calcPolygonArea(vertices) {
  var total = 0;

  for (var i = 0, l = vertices.length; i < l; i++) {
    var addX = vertices[i].x;
    var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
    var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
    var subY = vertices[i].y;

    total += addX * addY * 0.5;
    total -= subX * subY * 0.5;
  }

  return Math.abs(total);
}

export const solvePartTwo = (input: string[]) => {
  const inputSplit = input.map((l) => splitLinesIntoChars(l));
  const startingPosition = identifyStartingLocation(inputSplit);
  const connectedPipes = identifyConnectingPipes(inputSplit, startingPosition);
  const firstStart = connectedPipes[0];
  const pathInCoordinates = getPathAsCoordinates(inputSplit, firstStart);
  const area = calcPolygonArea(pathInCoordinates);
  const lengthFromFirst = getLengthOfPath(inputSplit, firstStart);
  const emptySpotsInPolygon = [];
  inputSplit.forEach((line, y) => {
    line.forEach((char, x) => {
      if (
        isPointInPolygon({ x, y }, pathInCoordinates) &&
        !pathInCoordinates.find((v) => v.x === x && v.y === y)
      ) {
        emptySpotsInPolygon.push(char);
      }
    });
  });
  return String(emptySpotsInPolygon.length);
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
