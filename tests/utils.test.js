const { getDifferenceString } = require("../services/util");

const COMMON_STRINGS = {
  ERROR: "XXXXX",
  NO_LETTER_MATCH: "BBBBB",
};

const TEST_CASES = [
  {
    wordOfTheDay: "CLOTH",
    attemptedData: [
      {
        attemptedWord: "AUDIO",
        expectedDiffString: "BBBBY",
      },
      {
        attemptedWord: "ORANG",
        expectedDiffString: "YBBBB",
      },
      {
        attemptedWord: "STOPE",
        expectedDiffString: "BYGBB",
      },
      {
        attemptedWord: "THOWL",
        expectedDiffString: "YYGBY",
      },
      {
        attemptedWord: "CLOTH",
        expectedDiffString: "GGGGG",
      },
    ],
  },
];

describe("Tests for getDifferenceString utility function", () => {
  test("Returns error string if word of the day's length is not five", () => {
    expect(getDifferenceString("A", "ABCDE")).toBe(COMMON_STRINGS.ERROR);
  });

  test("Returns error string if attempted word's length is not five", () => {
    expect(getDifferenceString("ABCDE", "A")).toBe(COMMON_STRINGS.ERROR);
  });

  test("Returns all black string if no letter matches", () => {
    expect(getDifferenceString("ABCDE", "FGHIJ")).toBe(
      COMMON_STRINGS.NO_LETTER_MATCH
    );
  });

  test("Passes all test cases", () => {
    TEST_CASES.forEach(({ wordOfTheDay, attemptedData }) => {
      attemptedData.forEach(({ attemptedWord, expectedDiffString }) => {
        expect(getDifferenceString(wordOfTheDay, attemptedWord)).toBe(
          expectedDiffString
        );
      });
    });
  });
});
