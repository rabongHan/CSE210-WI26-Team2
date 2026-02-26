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
    const round = generateRound(0);
    expect(round.correctRules).toEqual(getCorrectRules(round.currentNumber));
  });

  it("returns exactly 6 unique rule options from ALL_RULES", () => {
    const round = generateRound(0);
    expect(round.ruleOptions).toHaveLength(6);
    expect(new Set(round.ruleOptions).size).toBe(6);
    expect(round.ruleOptions.every((rule) => ALL_RULES.includes(rule))).toBe(
      true
    );
  });

  // update with what numbers we want later
  // it("uses 2-digit numbers for levels 0-2", () => {
  //   for (const level of [0, 1, 2]) {
  //     for (let i = 0; i < 20; i++) {
  //       const { currentNumber } = generateRound(level);
  //       expect(currentNumber).toBeGreaterThanOrEqual(10);
  //       expect(currentNumber).toBeLessThanOrEqual(99);
  //     }
  //   }
  // });

  // it("uses 3-digit numbers for levels 3-9", () => {
  //   for (const level of [3, 5, 9]) {
  //     for (let i = 0; i < 20; i++) {
  //       const { currentNumber } = generateRound(level);
  //       expect(currentNumber).toBeGreaterThanOrEqual(100);
  //       expect(currentNumber).toBeLessThanOrEqual(999);
  //     }
  //   }
  // });

  // it("uses 4-digit numbers for levels 10-19", () => {
  //   for (const level of [10, 14, 19]) {
  //     for (let i = 0; i < 20; i++) {
  //       const { currentNumber } = generateRound(level);
  //       expect(currentNumber).toBeGreaterThanOrEqual(1000);
  //       expect(currentNumber).toBeLessThanOrEqual(9999);
  //     }
  //   }
  // });

  // it("uses 5-digit numbers for levels 20-29", () => {
  //   for (const level of [20, 25, 29]) {
  //     for (let i = 0; i < 20; i++) {
  //       const { currentNumber } = generateRound(level);
  //       expect(currentNumber).toBeGreaterThanOrEqual(10000);
  //       expect(currentNumber).toBeLessThanOrEqual(99999);
  //     }
  //   }
  // });

  // it("uses 6-digit numbers for levels 30-39", () => {
  //   for (const level of [30, 35, 39]) {
  //     for (let i = 0; i < 20; i++) {
  //       const { currentNumber } = generateRound(level);
  //       expect(currentNumber).toBeGreaterThanOrEqual(100000);
  //       expect(currentNumber).toBeLessThanOrEqual(999999);
  //     }
  //   }
  // });

  it("increases hard-rule rate (7/8/9) at higher levels among eligible rounds", () => {
      const lowLevel = 0;
      const highLevel = 25;
      const rounds = 500;

      // We only compare rounds that had at least one correct rule.
      // If a round has no correct rules, it is not eligible for this specific metric.
      let lowEligible = 0;
      let highEligible = 0;

      // Count rounds where hard rules (7,8,9) appear.
      let lowHard = 0;
      let highHard = 0;

      for (let i = 0; i < rounds; i++) {
          const low = generateRound(lowLevel);
          const high = generateRound(highLevel);

          // LOW LEVEL
          if (low.correctRules.length > 0) {
              lowEligible += 1;

              const hasHardRule =
                  low.correctRules.includes(7) ||
                  low.correctRules.includes(8) ||
                  low.correctRules.includes(9);

              if (hasHardRule) {
                  lowHard += 1;
              }
          }

          // HIGH LEVEL
          if (high.correctRules.length > 0) {
              highEligible += 1;

              const hasHardRule =
                  high.correctRules.includes(7) ||
                  high.correctRules.includes(8) ||
                  high.correctRules.includes(9);

              if (hasHardRule) {
                  highHard += 1;
              }
          }
      }

      // Safety checks so we never divide by zero.
      expect(lowEligible).toBeGreaterThan(0);
      expect(highEligible).toBeGreaterThan(0);

      // Compare rates, not raw counts.
      // This avoids false failures when high levels have more no-rule rounds.
      const lowHardRate = lowHard / lowEligible;
      const highHardRate = highHard / highEligible;

      expect(highHardRate).toBeGreaterThan(lowHardRate);
  });

  it("increases no-rule rounds at higher levels", () => {
      const lowLevel = 0;
      const highLevel = 25;
      const rounds = 500;

      // Count rounds where no divisibility rule (2..9) applies.
      let lowNoRuleRounds = 0;
      let highNoRuleRounds = 0;

      for (let i = 0; i < rounds; i++) {
          const low = generateRound(lowLevel);
          const high = generateRound(highLevel);

          if (low.correctRules.length === 0) {
              lowNoRuleRounds += 1;
          }

          if (high.correctRules.length === 0) {
              highNoRuleRounds += 1;
          }
      }

      // With noRuleChance increasing by level,
      // high level should produce more no-rule rounds.
      expect(highNoRuleRounds).toBeGreaterThan(lowNoRuleRounds);
  });

});
