// import divisiility rule interface
import type { RuleId } from "@/app/treasure/lib/types";

// set up array of rules for each divisibility 2-9
export const ALL_RULES: RuleId[] = [2, 3, 4, 5, 6, 7, 8, 9];

// gets random roll, weighted by the provided weights
function weightedPick(rules: RuleId[], weights: Record<RuleId, number>): RuleId {
    let total = 0;
    for (const r of rules) total += weights[r];

    let roll = Math.random() * total;
    for (const r of rules) {
        roll -= weights[r];
        if (roll <= 0) return r;
    }
    return rules[rules.length - 1];
}

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
// based on level, so progressively more difficult
export function generateRound(level: number): {
    currentNumber: number;
    correctRules: RuleId[];
    ruleOptions: RuleId[];
} {
    let currentNumber = 0;
    let correctRules: RuleId[] = [];

    // Incorporate larger numbers as levels increase
    const L = Math.max(0, Math.floor(level));
    const digits =
    L < 3 ? 2 :    // levels 0-2 are 2 digits
    L < 10 ? 3 : // levels 3-9 are 3 digits
    4 + Math.floor((L - 10) / 10); // 10-19 are 4 digits, and so on.

    // range we will randomly sample our number from
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;

    // Incorporate more difficult prime number rules (6, 7, 8, 9) with higher level
    const weights: Record<RuleId, number> = {
        2: Math.max(0.1, 1.0 - level * 0.05), // gets less common
        3: Math.max(0.3, 0.9 - level * 0.04), // gets less common
        4: Math.min(0.6, 0.2 + level * 0.04), // gets more common
        5: Math.max(0.1, 0.9 - level * 0.05), // gets less common
        6: Math.min(0.9, 0.2 + level * 0.04), // gets more common (more)
        7: Math.min(1.0, 0.02 + level * 0.05), // gets more common (most)
        8: Math.min(0.9, 0.05 + level * 0.04), // gets more common (more)
        9: Math.min(0.5, 0.1 + level * 0.04), // gets more common
    };

    // The following implements selecting a random number based on divisibility weights.
    // Full process to look for a number that matches the chosen divisibility rule
    const MAX_TRIES = 60;
    let tries = 0;

    while (tries < MAX_TRIES) {
        tries++;
        const targetRule = weightedPick(ALL_RULES, weights);
        const candidate = Math.floor(Math.random() * (max - min + 1)) + min;

    if (candidate % targetRule === 0) {
        currentNumber = candidate;
        break;
        }
    }

    // fallback if no weighted hit
    if (currentNumber === 0) {
        currentNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    correctRules = getCorrectRules(currentNumber);

    // generate 6 divisibility rules for each box option
    const ruleOptions = generateRuleOptions(correctRules, weights);

    return { currentNumber, correctRules, ruleOptions };
}

// Create answer option boxes for the round.
// Guarantees no duplicates answers, fixed range of 0 - 4 correct rules for a number
export function generateRuleOptions(
    correctRules: RuleId[],
    weights?: Record<RuleId, number>
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
        const randomRule = weights
            ? weightedPick(ALL_RULES, weights)
            : ALL_RULES[Math.floor(Math.random() * ALL_RULES.length)];
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
