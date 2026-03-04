// Make StageKey its own type to avoid errors with unexpected values at runtime
const NUM_BUBBLES : number = 8;

export type StageKey = 1 | 2 | 3;

export const STAGE_CONFIG: Record<StageKey, { label: string; range: [number, number]; numBubbles: number }> =
    {
  1: { label: "Stage 1", range: [10,  50],  numBubbles: 8  },
  2: { label: "Stage 2", range: [51,  200], numBubbles: 10 },
  3: { label: "Stage 3", range: [201, 500], numBubbles: 12 },
};


/**
 * Generate the target dividend for a round.
 */
export function generateDividend(stage: StageKey): number {
  // Range of numbers the user can be tested on
  const [min, max] = STAGE_CONFIG[stage].range;
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

export function generateBubbles(n: number, stage: StageKey): number[] {
  // First generate correct factors
  const { numBubbles } = STAGE_CONFIG[stage];


  const maxCorrect = Math.floor(numBubbles / 2);
  const bubbles = new Set<number>();
  const factors = generateFactors(n);
  for (const f of factors) {
    if (bubbles.size >= maxCorrect) break;
    bubbles.add(f);
  }

  // add random wrong answers (numbers that are NOT factors of n)
  const wrongMax = Math.floor(n/2);
  let attempts = 0;


  while (bubbles.size < numBubbles && attempts < 1000) {
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
 */
export function isCorrectAnswer(num: number, factor: number): boolean {
  return factor % num === 0; // is num a factor of the big number?
}

/**
 * After a correct answer, compute the new factor.
 */
export function getNextFactor(factor: number, num: number): number {
  return Math.floor(factor / num); // hard-coded 
}

/**
 * Check if there are any correct answers left in the remaining bubbles.
 * Used to determine if the player has won the round.
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
export const NUM_STAGES   = 3;