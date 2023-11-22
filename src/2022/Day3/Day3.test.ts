import { compartmentiseOurRucksacks } from "./Day3";

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
  it("should identify any duplicates in those compartments", () => {});
});
