// import divisiility rule interface
import type { RuleId } from "@/app/treasure/lib/types";

// set up array of rules for each divisibility 2-9
export const ALL_RULES: RuleId[] = [2, 3, 4, 5, 6, 7, 8, 9];

// for a given number, return all divisible numbers
export function getCorrectRules(n: number): RuleId[] {
    // initialize list for numbers
    const result: RuleId[] = [];
    // for each divisibility rule, check if each applies to number
    for (const rule of ALL_RULES) {
        if (n % rule === 0) {
            // append to list
            result.push(rule);
        }
    }
    return result;
}

// Check between answer key and user selections
export function isSelectionCorrect(
    selectedRules: RuleId[],
    correctRules: RuleId[]
): boolean {
    // sort and check whether answer key and user selection matches
    const a = [...new Set(selectedRules)].sort((x, y) => x - y);
    const b = [...new Set(correctRules)].sort((x, y) => x - y);

    // length matches and every element matches
    return a.length === b.length && a.every((v, i) => v === b[i]);
}

// Create round with generated number
export function generateRound(): {
    currentNumber: number;
    correctRules: RuleId[];
    ruleOptions: RuleId[];
} {
    let currentNumber = 0;
    let correctRules: RuleId[] = [];

    // generate any current number from 10 to 209.
    // TODO: will update with progressively difficult levels.
    // Incorporate more difficult prime number rules (6, 7, 8, 9) with higher level
    currentNumber = Math.floor(Math.random() * 200) + 10;
    correctRules = getCorrectRules(currentNumber);

    // generate 6 divisibility rules for each box option
    const ruleOptions = generateRuleOptions(correctRules);

    return { currentNumber, correctRules, ruleOptions };
}

// Create answer option boxes for the round.
// Guarantees no duplicates answers, fixed range of 0 - 4 correct rules for a number
export function generateRuleOptions(
    correctRules: RuleId[],
): RuleId[] {
    // initialize unique correct divisible rules for the number
    const uniqueCorrect = [...new Set(correctRules)];

    // options that will show 
    const options = new Set<RuleId>();

    // shuffle numbers for correct numbers
    const shuffled = [...uniqueCorrect].sort(() => Math.random() - 0.5);
    // add all correct answers first. Show a max of 4 rules
    for (const rule of shuffled.slice(0, 4)) {
        options.add(rule);
    }

    // keep adding random rule answers until we get to 6 boxes
    while (options.size < 6) {
        // once all correct rules are in, fill the rest with the other rules
        const randomRule = ALL_RULES[Math.floor(Math.random() * ALL_RULES.length)];
        options.add(randomRule);
    }

    // return array of all unique answers
    return [...options];
}

// Returns updated selectedRules array
export function toggleRuleOptionsSelection(selectedRules: RuleId[], rule: RuleId): RuleId[] {
    const set = new Set(selectedRules); // Create a Set from the current array
    if (set.has(rule)) {
        set.delete(rule); // Remove if already selected
    } else {
        set.add(rule);    // Add if not selected
    }
    return Array.from(set); // Convert back to array to update Statee
}