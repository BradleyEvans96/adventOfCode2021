import {
  compartmentiseOurRucksacks,
  getCharacterPriority,
  highlightDuplicateItems,
} from "./Day3";

describe("Day 3", () => {
  it("should split the rucksack into two compartments", () => {
    const input = ["1234", "123456", "12345678"];
    const expected = [
      { compartment1: ["1", "2"], compartment2: ["3", "4"] },
      { compartment1: ["1", "2", "3"], compartment2: ["4", "5", "6"] },
      {
        compartment1: ["1", "2", "3", "4"],
        compartment2: ["5", "6", "7", "8"],
      },
    ];
    expect(compartmentiseOurRucksacks(input)).toStrictEqual(expected);
  });
  it("should identify any duplicates in those compartments", () => {
    const listOne = ["1", "2", "3"];
    const listTwo = ["1", "3", "5", "6"];
    const expected = ["1", "3"];
    expect(highlightDuplicateItems(listOne, listTwo)).toStrictEqual(expected);

    const listFour = ["p", "l", "a", "n", "N"];
    const listFive = ["P", "L", "A", "N"];
    const expectedTwo = ["N"];
    expect(highlightDuplicateItems(listFour, listFive)).toStrictEqual(["N"]);
  });

  it("should return the correct value priority for a given character", () => {
    const charOne = "a";
    const charTwo = "A";
    const charThree = "e";
    const chatFour = "z";
    expect(getCharacterPriority(charOne)).toStrictEqual(1);
    expect(getCharacterPriority(charTwo)).toStrictEqual(27);
    expect(getCharacterPriority(charThree)).toStrictEqual(5);
    expect(getCharacterPriority(chatFour)).toStrictEqual(26);
  });
});
