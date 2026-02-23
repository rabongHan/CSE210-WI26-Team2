import {
  ALL_RULES,
  generateRound,
  generateRuleOptions,
  getCorrectRules,
  isSelectionCorrect,
} from "@/app/treasure/lib/treasure-game-logic";

// check if the getCorrectRules function correctly returns all divisible numbers for a number
describe("getCorrectRules", () => {
  it("returns divisibility rules for 24", () => {
    expect(getCorrectRules(24)).toEqual([2, 3, 4, 6, 8]);
  });

  it("returns empty when none of 2..9 divide", () => {
    expect(getCorrectRules(11)).toEqual([]);
  });

  it("returns only 5 for 25", () => {
    expect(getCorrectRules(25)).toEqual([5]);
  });
});

// Simulate user's choices and compare with answer key. Assert they give proper false/true.
describe("isSelectionCorrect", () => {
  it("returns true for same set with different order and duplicates", () => {
    expect(isSelectionCorrect([3, 2, 2, 4], [4, 3, 2])).toBe(true);
  });

  it("returns false when user selection is missing a correct rule", () => {
    expect(isSelectionCorrect([2, 3], [2, 3, 4])).toBe(false);
  });

  it("returns true when both sets are empty", () => {
    expect(isSelectionCorrect([], [])).toBe(true);
  });
});

// check generateRuleOptions function to correctly give length 6
describe("generateRuleOptions", () => {
  it("returns exactly 6 unique rule options", () => {
    // check for greater than 7 divisible rules
    const options = generateRuleOptions([2, 4, 6, 7, 8, 9, 3]);
    expect(options).toHaveLength(6);
    expect(new Set(options).size).toBe(6);
    expect(options.every((r) => ALL_RULES.includes(r))).toBe(true);
  });
  it("returns exactly 6 unique rule options", () => {
    const options = generateRuleOptions([7]); 
    expect(options).toHaveLength(6);
    expect(new Set(options).size).toBe(6);
    expect(options.every((r) => ALL_RULES.includes(r))).toBe(true);
  });

  it("still returns 6 options when there are no correct rules (prime number)", () => {
    const options = generateRuleOptions([]);
    expect(options).toHaveLength(6);
  });

  it("includes only values from ALL_RULES", () => {
    const options = generateRuleOptions([2, 3, 4]);
    expect(options.every((rule) => ALL_RULES.includes(rule))).toBe(true);
  });
});

// test generate round function
describe("generateRound", () => {
  it("returns correctRules that match the generated number", () => {
    const round = generateRound();
    expect(round.correctRules).toEqual(getCorrectRules(round.currentNumber));
  });

  it("returns exactly 6 unique rule options from ALL_RULES", () => {
    const round = generateRound();
    expect(round.ruleOptions).toHaveLength(6);
    expect(new Set(round.ruleOptions).size).toBe(6);
    expect(round.ruleOptions.every((rule) => ALL_RULES.includes(rule))).toBe(
      true
    );
  });
});

