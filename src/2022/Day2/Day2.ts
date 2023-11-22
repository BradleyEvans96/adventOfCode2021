import { Day } from "../../shared/day";
import { sumArrayOfNumbers } from "../Day1/Day1";

const points = {
  loss: 0,
  draw: 3,
  win: 6,
};

const enum OPPONENT_MOVES {
  ROCK = "A",
  PAPER = "B",
  SCISSOR = "C",
}

const enum MY_MOVES {
  ROCK = "X",
  PAPER = "Y",
  SCISSORS = "Z",
}

const enum GAME_RESULT {
  WIN = "win",
  DRAW = "draw",
  LOSS = "loss",
}

const moveScore = {
  [MY_MOVES.ROCK]: 1,
  [MY_MOVES.PAPER]: 2,
  [MY_MOVES.SCISSORS]: 3,
};

const determineResult = (
  opponentMove: OPPONENT_MOVES,
  myMove: MY_MOVES
): "win" | "draw" | "loss" => {
  switch (opponentMove) {
    case OPPONENT_MOVES.ROCK: {
      switch (myMove) {
        case MY_MOVES.PAPER:
          return "win";
        case MY_MOVES.SCISSORS:
          return "loss";
        case MY_MOVES.ROCK:
          return "draw";
      }
    }
    case OPPONENT_MOVES.SCISSOR:
      switch (myMove) {
        case MY_MOVES.PAPER:
          return "loss";
        case MY_MOVES.SCISSORS:
          return "draw";
        case MY_MOVES.ROCK:
          return "win";
      }
    case OPPONENT_MOVES.PAPER:
      switch (myMove) {
        case MY_MOVES.PAPER:
          return "draw";
        case MY_MOVES.SCISSORS:
          return "win";
        case MY_MOVES.ROCK:
          return "loss";
      }
  }
};

const determineMyMove = (
  opponentMove: OPPONENT_MOVES,
  result: GAME_RESULT
): MY_MOVES => {
  switch (opponentMove) {
    case OPPONENT_MOVES.ROCK: {
      switch (result) {
        case GAME_RESULT.WIN:
          return MY_MOVES.PAPER;
        case GAME_RESULT.DRAW:
          return MY_MOVES.ROCK;
        case GAME_RESULT.LOSS:
          return MY_MOVES.SCISSORS;
      }
    }
    case OPPONENT_MOVES.PAPER: {
      switch (result) {
        case GAME_RESULT.WIN:
          return MY_MOVES.SCISSORS;
        case GAME_RESULT.DRAW:
          return MY_MOVES.PAPER;
        case GAME_RESULT.LOSS:
          return MY_MOVES.ROCK;
      }
    }
    case OPPONENT_MOVES.SCISSOR: {
      switch (result) {
        case GAME_RESULT.WIN:
          return MY_MOVES.ROCK;
        case GAME_RESULT.DRAW:
          return MY_MOVES.SCISSORS;
        case GAME_RESULT.LOSS:
          return MY_MOVES.PAPER;
      }
    }
  }
};

const getGameInfo = (game: string) => {
  const data = game.split(" ");
  return {
    opponentMove: data[0] as OPPONENT_MOVES,
    myMove: data[1] as MY_MOVES,
  };
};

const gameResult = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

const getNewGameInfo = (game: string) => {
  const data = game.split(" ");
  return {
    opponentMove: data[0] as OPPONENT_MOVES,
    gameResult: gameResult[data[1]] as GAME_RESULT,
  };
};

type Result = {
  result: "win" | "draw" | "loss";
  myMove: MY_MOVES;
};

const convertToScore = ({ myMove, result }: Result) =>
  moveScore[myMove] + points[result];

const calculateScore = (results: Result[]) =>
  results.map(convertToScore).reduce(sumArrayOfNumbers, 0);

const calculateMyTotalScore = (games: string[]) => {
  const gameInformation = games.map(getGameInfo);
  const results = gameInformation.map(({ myMove, opponentMove }) => ({
    result: determineResult(opponentMove, myMove),
    myMove,
  }));
  const score = calculateScore(results);
  return String(score);
};

const calculateMyScoreByNewRules = (games: string[]) => {
  const gameInformation = games.map(getNewGameInfo);
  const results = gameInformation.map(({ opponentMove, gameResult }) => ({
    result: gameResult,
    myMove: determineMyMove(opponentMove, gameResult),
  }));
  const score = calculateScore(results as Result[]);
  return String(score);
};

export default {
  solvePartOne: (input: string[]): string => calculateMyTotalScore(input),
  solvePartTwo: (input: string[]): string => calculateMyScoreByNewRules(input),
} as Day;
