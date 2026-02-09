
// BUBBLE GAME LOGIC 
//
// Currently hard-coded for a single round with factor 8.


/**
 * Generate the target factor for a round.
 * TODO: Replace with random generation logic.
 */
export function generateFactor(): number {
  return 8; // hard-coded 
}

/**
 * Generate the array of bubble numbers for a round.
 * Should include some correct answers (factors/multiples) and some wrong ones.
 * TODO: Replace with dynamic generation based on the factor.
 */
export function generateBubbles(): number[] {
  return [20, 2, 14, 4, 9, 10, 12]; // hard-coded 
}

/**
 * Check if clicking `num` is a correct answer given the current `factor`.
 * TODO: Replace with the real factorization check.
 */
export function isCorrectAnswer(num: number, factor: number): boolean {
  return factor % num === 0; // is num a factor of the big number?
}

/**
 * After a correct answer, compute the new factor.
 * TODO: Replace with real logic (e.g. factor / num, or next sub-problem).
 */
export function getNextFactor(factor: number, num: number): number {
  return Math.floor(factor / num); // hard-coded 
}

/**
 * Check if there are any correct answers left in the remaining bubbles.
 * Used to determine if the player has won the round.
 * TODO: Update if the definition of "correct" changes.
 */
export function hasCorrectAnswersLeft(
  bubbles: number[],
  factor: number
): boolean {
  return bubbles.some((b) => isCorrectAnswer(b, factor));
}

/**
 * How many lives the player starts with.
 */
export const STARTING_LIVES = 3;
