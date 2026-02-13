const NUM_BUBBLES : number = 8;
// BUBBLE GAME LOGIC 
//
// Currently hard-coded for a single round with factor 8.


/**
 * Generate the target factor for a round.
 * TODO: Replace with random generation logic.
 */
export function generateFactor(): number {
  // Range of numbers the user can be tested on
  const numberRange = [10, 50]
  const [min, max] = numberRange
  let num: number
  // Math.random() returns a floating point number between 0 and 1
  // We multiply this by the range (max - min) to get a number
  // within range (0, range), then add by the min to get the
  // number within (min, max). Math.floor() because we need an int
  do {
    num = Math.floor((Math.random() * (max - min + 1)) + min)
  } while (isPrime(num))

  return num; // hard-coded
}

/**
 * Generate the array of bubble numbers for a round.
 * Should include some correct answers (factors/multiples) and some wrong ones.
 * TODO: Replace with dynamic generation based on the factor.
 */
export function generateBubbles(n: number): number[] {
  // use set to have unique bubbles
  const bubbles = new Set<number>();
  // calculate sqrt once
  let upperBound: number = Math.floor(Math.sqrt(n))
  // add every factor and it's corresponding factor as a bubble.
  for (let i = 2; i <= upperBound; i += 1) {
    if (n % i === 0) {
      bubbles.add(i)
      bubbles.add(n / i)
    }
  }

  // n/2 is smallest possible factor
  const wrongBound = Math.floor(n / 2)
  // add random wrong answers
  while (bubbles.size < NUM_BUBBLES && bubbles.size < wrongBound - 1) {
    const rand = Math.floor(Math.random() * wrongBound) + 2;
    bubbles.add(rand);
  }
  // sort array from lowest to highest so factors are not always first
  return Array.from(bubbles).sort((a,b) => a - b); // hard-coded
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
