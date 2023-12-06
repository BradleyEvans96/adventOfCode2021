import { Cubes, isGamePossible } from "./Day2";

describe("Day2", () => {
  describe("isGamePossible", () => {
    const bagInfo: Cubes = {
      red: 12,
      green: 13,
      blue: 14,
    };
    const testingData = [
      {
        sets: [
          {
            blue: 10,
            red: 5,
            green: 11,
          },
        ] as Cubes[],
        expected: true,
      },
      {
        sets: [
          {
            blue: 10,
            red: 5,
            green: 11,
          },
          {
            blue: 15,
            red: 5,
            green: 11,
          },
        ] as Cubes[],
        expected: false,
      },
      {
        sets: [
          {
            blue: 6,
            red: 3,
            green: 1,
          },
          {
            red: 6,
            green: 3,
          },
          {
            blue: 15,
            red: 14,
            green: 3,
          },
        ] as Cubes[],
        expected: false,
      },
    ];
    it.each(testingData)(
      "should return a boolean if all colours have less than the bag",
      ({ sets, expected }) => {
        expect(isGamePossible(bagInfo, sets)).toStrictEqual(expected);
      }
    );
  });
});
