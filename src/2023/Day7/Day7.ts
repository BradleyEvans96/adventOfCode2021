import { writeFile } from "fs";
import { sumArrayOfNumbers } from "../../helpers/reducers";
import { Day } from "../../shared/day";

const CamelCardsValue = {
  J: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

const enum HANDTYPE {
  FIVE_OF_A_KIND = "five-of-a-kind",
  FOUR_OF_A_KIND = "four-of-a-kind",
  FULL_HOUSE = "full-house",
  THREE_OF_A_KIND = "three-of-a-kind",
  TWO_PAIRS = "two-pair",
  ONE_PAIR = "one-pair",
  HIGH_CARD = "high-card",
}

type HandData = {
  cards: string[];
  bid: number;
};

export const getHandData = (input: string): HandData => {
  const cardsAndBid = input.split(" ");
  return {
    cards: cardsAndBid[0].split(""),
    bid: Number(cardsAndBid[1]),
  };
};

export const determineHandType = (input: string[]) => {
  const occurences = {};
  for (const card of input) {
    occurences[card] = occurences[card] ? occurences[card] + 1 : 1;
  }
  const numOfOccurences = Object.values(occurences);
  if (numOfOccurences.includes(5)) {
    return HANDTYPE.FIVE_OF_A_KIND;
  } else if (numOfOccurences.every((v) => v === 1)) {
    return HANDTYPE.HIGH_CARD;
  } else if (numOfOccurences.includes(4)) {
    return HANDTYPE.FOUR_OF_A_KIND;
  } else if (numOfOccurences.includes(3)) {
    if (numOfOccurences.includes(2)) {
      return HANDTYPE.FULL_HOUSE;
    } else {
      return HANDTYPE.THREE_OF_A_KIND;
    }
  } else if (numOfOccurences.filter((v) => v === 2).length === 2) {
    return HANDTYPE.TWO_PAIRS;
  } else {
    return HANDTYPE.ONE_PAIR;
  }
};

export const determineHandTypeWithJoker = (input: string[]) => {
  const justJokers = input.filter((i) => i === "J");
  if (justJokers.length === 0) {
    const occurences = {};
    for (const card of input) {
      occurences[card] = occurences[card] ? occurences[card] + 1 : 1;
    }
    const numOfOccurences = Object.values(occurences);
    if (numOfOccurences.includes(5)) {
      return HANDTYPE.FIVE_OF_A_KIND;
    } else if (numOfOccurences.every((v) => v === 1)) {
      return HANDTYPE.HIGH_CARD;
    } else if (numOfOccurences.includes(4)) {
      return HANDTYPE.FOUR_OF_A_KIND;
    } else if (numOfOccurences.includes(3)) {
      if (numOfOccurences.includes(2)) {
        return HANDTYPE.FULL_HOUSE;
      } else {
        return HANDTYPE.THREE_OF_A_KIND;
      }
    } else if (numOfOccurences.filter((v) => v === 2).length === 2) {
      return HANDTYPE.TWO_PAIRS;
    } else {
      return HANDTYPE.ONE_PAIR;
    }
  } else {
    // Jokers exists so must take into consideration new array
    const occurences = {};
    const noJokers = input.filter((i) => i !== "J");
    for (const card of noJokers) {
      occurences[card] = occurences[card] ? occurences[card] + 1 : 1;
    }
    const numOfOccurences = Object.values(occurences);
    // if 4 or 5 jokers Straight to 5 of a kind
    if (justJokers.length >= 4) {
      return HANDTYPE.FIVE_OF_A_KIND;
    }
    if (justJokers.length === 3) {
      if (numOfOccurences.includes(2)) {
        return HANDTYPE.FIVE_OF_A_KIND;
      } else {
        return HANDTYPE.FOUR_OF_A_KIND;
      }
    }
    if (justJokers.length === 2) {
      if (numOfOccurences.includes(3)) {
        return HANDTYPE.FIVE_OF_A_KIND;
      } else if (numOfOccurences.includes(2)) {
        return HANDTYPE.FOUR_OF_A_KIND;
      } else {
        return HANDTYPE.THREE_OF_A_KIND;
      }
    }
    if (justJokers.length === 1) {
      if (numOfOccurences.includes(4)) {
        return HANDTYPE.FIVE_OF_A_KIND;
      } else if (numOfOccurences.includes(3)) {
        return HANDTYPE.FOUR_OF_A_KIND;
      } else if (numOfOccurences.every((v) => v === 1)) {
        return HANDTYPE.ONE_PAIR;
      } else if (
        numOfOccurences.includes(2) &&
        numOfOccurences.filter((v) => v === 2).length === 2
      ) {
        return HANDTYPE.FULL_HOUSE;
      } else {
        return HANDTYPE.THREE_OF_A_KIND;
      }
    }
  }
};

const sortCard = (cards: string[], cards2: string[]) => {
  const indexToCompare = cards.findIndex(
    (card, index) =>
      CamelCardsValue[card] - CamelCardsValue[cards2[index]] !== 0
  );
  return (
    CamelCardsValue[cards[indexToCompare]] -
    CamelCardsValue[cards2[indexToCompare]]
  );
};

type CardsInHandTypes = Record<string, HandData[]>;

const sortAllCardTypes = (unsortedCards: CardsInHandTypes) => {
  const sortedArrays: CardsInHandTypes = {};
  if (unsortedCards[HANDTYPE.FIVE_OF_A_KIND]) {
    const sortedArray = unsortedCards[HANDTYPE.FIVE_OF_A_KIND].sort((a, b) =>
      sortCard(a.cards, b.cards)
    );
    sortedArrays[HANDTYPE.FIVE_OF_A_KIND] = [...sortedArray];
  }
  if (unsortedCards[HANDTYPE.FOUR_OF_A_KIND]) {
    const sortedArray = unsortedCards[HANDTYPE.FOUR_OF_A_KIND].sort((a, b) =>
      sortCard(a.cards, b.cards)
    );
    sortedArrays[HANDTYPE.FOUR_OF_A_KIND] = [...sortedArray];
  }
  if (unsortedCards[HANDTYPE.THREE_OF_A_KIND]) {
    const sortedArray = unsortedCards[HANDTYPE.THREE_OF_A_KIND].sort((a, b) =>
      sortCard(a.cards, b.cards)
    );
    sortedArrays[HANDTYPE.THREE_OF_A_KIND] = [...sortedArray];
  }
  if (unsortedCards[HANDTYPE.FULL_HOUSE]) {
    const sortedArray = unsortedCards[HANDTYPE.FULL_HOUSE].sort((a, b) =>
      sortCard(a.cards, b.cards)
    );
    sortedArrays[HANDTYPE.FULL_HOUSE] = [...sortedArray];
  }
  if (unsortedCards[HANDTYPE.TWO_PAIRS]) {
    const sortedArray = unsortedCards[HANDTYPE.TWO_PAIRS].sort((a, b) =>
      sortCard(a.cards, b.cards)
    );
    sortedArrays[HANDTYPE.TWO_PAIRS] = [...sortedArray];
  }
  if (unsortedCards[HANDTYPE.ONE_PAIR]) {
    const sortedArray = unsortedCards[HANDTYPE.ONE_PAIR].sort((a, b) =>
      sortCard(a.cards, b.cards)
    );
    sortedArrays[HANDTYPE.ONE_PAIR] = [...sortedArray];
  }
  if (unsortedCards[HANDTYPE.HIGH_CARD]) {
    const sortedArray = unsortedCards[HANDTYPE.HIGH_CARD].sort((a, b) =>
      sortCard(a.cards, b.cards)
    );
    sortedArrays[HANDTYPE.HIGH_CARD] = [...sortedArray];
  }
  return sortedArrays;
};

export const solvePartOne = (input: string[]) => {
  const handData = input.map((line) => getHandData(line));
  const handTypes: CardsInHandTypes = {};
  handData.forEach((line) => {
    const handType = determineHandType(line.cards);
    const itemToAdd = handTypes[handType]
      ? [...handTypes[handType], line]
      : [line];
    handTypes[handType] = itemToAdd;
  });
  const sortedCardTypes = sortAllCardTypes(handTypes);
  const sortedList = [
    ...(sortedCardTypes[HANDTYPE.HIGH_CARD] || []),
    ...(sortedCardTypes[HANDTYPE.ONE_PAIR] || []),
    ...(sortedCardTypes[HANDTYPE.TWO_PAIRS] || []),
    ...(sortedCardTypes[HANDTYPE.THREE_OF_A_KIND] || []),
    ...(sortedCardTypes[HANDTYPE.FULL_HOUSE] || []),
    ...(sortedCardTypes[HANDTYPE.FOUR_OF_A_KIND] || []),
    ...(sortedCardTypes[HANDTYPE.FIVE_OF_A_KIND] || []),
  ];
  const winnings = sortedList
    .filter((v) => v.cards.length > 0)
    .map((v, index) => ({
      bid: v.bid,
      ranking: index + 1,
    }));
  const win = winnings.map(({ bid, ranking }) => bid * ranking);
  return String(
    winnings
      .map(({ bid, ranking }) => bid * ranking)
      .reduce(sumArrayOfNumbers, 0)
  );
};

export const solvePartTwo = (input: string[]) => {
  const handData = input.map((line) => getHandData(line));
  const handTypes: CardsInHandTypes = {};
  handData.forEach((line) => {
    const handType = determineHandTypeWithJoker(line.cards);
    const itemToAdd = handTypes[handType]
      ? [...handTypes[handType], line]
      : [line];
    handTypes[handType] = itemToAdd;
  });
  const sortedCardTypes = sortAllCardTypes(handTypes);
  const sortedList = [
    ...(sortedCardTypes[HANDTYPE.HIGH_CARD] || []),
    ...(sortedCardTypes[HANDTYPE.ONE_PAIR] || []),
    ...(sortedCardTypes[HANDTYPE.TWO_PAIRS] || []),
    ...(sortedCardTypes[HANDTYPE.THREE_OF_A_KIND] || []),
    ...(sortedCardTypes[HANDTYPE.FULL_HOUSE] || []),
    ...(sortedCardTypes[HANDTYPE.FOUR_OF_A_KIND] || []),
    ...(sortedCardTypes[HANDTYPE.FIVE_OF_A_KIND] || []),
  ];
  const winnings = sortedList
    .filter((v) => v.cards.length > 0)
    .map((v, index) => ({
      bid: v.bid,
      ranking: index + 1,
    }));
  const win = winnings.map(({ bid, ranking }) => bid * ranking);
  return String(
    winnings
      .map(({ bid, ranking }) => bid * ranking)
      .reduce(sumArrayOfNumbers, 0)
  );
};

export default {
  solvePartOne: (input: string[]): string => String(solvePartOne(input)),
  solvePartTwo: (input: string[]): string => String(solvePartTwo(input)),
} as Day;
