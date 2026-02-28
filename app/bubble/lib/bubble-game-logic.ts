const NUM_BUBBLES : number = 8;
const stage_ranges = {
  1: [10, 50],
}
// BUBBLE GAME LOGIC 
//
// Currently hard-coded for a single round with factor 8.


/**
 * Generate the target factor for a round.
 * TODO: Replace with random generation logic.
 */
export function generateComposite(): number {
  // Range of numbers the user can be tested on
  const numberRange = [10, 50]
  const [min, max] = numberRange
  let num: number
  // Math.random() returns a floating point number between 0 and 1
  // We multiply this by the range (max - min) to get a number
  // within range (0, range), then add by the min to get the
  // number within (min, max). Math.floor() because we need an int
  // Skip primes (no factors) and prime squares like 25=5², 49=7²
  // (their only factor pair is (√n, √n) — same number twice, so the
  //  player gets stuck after clicking it once)
  do {
    num = Math.floor((Math.random() * (max - min + 1)) + min)
  } while (isPrime(num) || !hasDistinctFactorPair(num))

  return num; // hard-coded
}

/**
 * Generate the array of bubble numbers for a round.
 * Should include some correct answers (factors/multiples) and some wrong ones.
 * TODO: Replace with dynamic generation based on the factor.
 */
function generateFactors(n:number): Set<number> {
  // use set to have unique bubbles
  const bubbles = new Set<number>();

  // Always include the prime factors so the game is solvable.
  // E.g. 24 = 2 × 2 × 2 × 3  →  primes {2, 3} are guaranteed to be in bubbles.
  let temp = n;
  for (let p = 2; p <= temp; p++) {
    while (temp % p === 0) {
      bubbles.add(p);
      temp = Math.floor(temp / p);
    }
  }

  // Also add composite factor pairs for variety (e.g. 4, 6, 8, 12 for n=24)
  let upperBound: number = Math.floor(Math.sqrt(n))
  for (let i = 2; i <= upperBound; i += 1) {
    if (n % i === 0) {
      bubbles.add(i)
      bubbles.add(n / i)
    }
  }
  return bubbles
}

export function generateBubbles(n: number): number[] {
  // First generate correct factors
  const bubbles = generateFactors(n);

  // Use a wide enough range so even small numbers (like 5) get plenty of wrong answers.
  // Range: [2, max(n*2, 20)] — guarantees at least 18 possible values to pick from.
  const wrongMax = n;
  // add random wrong answers (numbers that are NOT factors of n)
  let attempts = 0;

  while (bubbles.size < NUM_BUBBLES && attempts < 200) {
    const rand = Math.floor(Math.random() * (wrongMax - 2)) + 2;
    // only add if it's NOT a correct factor (so it's a wrong answer)
    if (n % rand !== 0) {
      bubbles.add(rand);
    }
    attempts++;
  }
  // Fisher-Yates shuffle
  const arr = Array.from(bubbles);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr;
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

/*
  Returns true if n has at least one factor pair (a, b) where a ≠ b
  and a * b = n (with 1 < a < b < n).
  E.g. 12 → true (2×6, 3×4), 25 → false (only 5×5), 49 → false (only 7×7).
*/
export function hasDistinctFactorPair(n: number): boolean {
  // strict < so we skip i = √n (where i and n/i are the same)
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) return true;
  }
  return false;
}

/*
  Check if number is prime.
 */
export function isPrime(n: number){
  if (n <= 2) return false
  if (n % 2 === 0) return false
  // Quick prime check. Only check up to sqrt of n b/c any
  // greater factor 'a' has corresponding factor 'b' < sqrt(n)
  // where a * b == n
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false
  }
  return true
}

/**
 * How many lives the player starts with.
 */
export const STARTING_LIVES = 3;
export const NUM_ROUNDS = 5;
