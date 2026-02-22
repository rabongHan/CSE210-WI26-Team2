// number generator with balancing logic to ensure a good mix of primes and composites with various factors

/**
 * A "test" represents a category we want to balance:
 *  - a prime factor like 2, 3, 5, 7
 *  - or the special category "prime"
 */
export type Test = number | "prime";

export interface GeneratorOptions {
  /** Number of random samples for large ranges */
  sampleCount?: number;
  /** If candidate count <= this, scan exhaustively */
  exhaustiveThreshold?: number;
  /** Prefer odd numbers when target test is odd or prime */
  preferOddForOddTests?: boolean;
  /** Custom RNG for testing (default Math.random) */
  rng?: () => number;
}

export interface GeneratorResult {
  numbers: number[];
  testCount: Record<string, number>;
}

/* ---------- basic functions ---------- */

function clampInt(x: number): number {
  if (!Number.isFinite(x)) throw new Error("Expected a finite number");
  return Math.trunc(x);
}

/** Simple primality test using trial division up to sqrt(n) */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let d = 3; d * d <= n; d += 2) {
    if (n % d === 0) return false;
  }
  return true;
}

/** Precompute all primes in [min, max] */
function primesInRange(min: number, max: number): number[] {
  const out: number[] = [];
  for (let x = min; x <= max; x++) {
    if (isPrime(x)) out.push(x);
  }
  return out;
}

/** Default tests: all primes up to sqrt(max) plus "prime" */
function defaultTestsFromMax(max: number): Test[] {
  const limit = Math.floor(Math.sqrt(Math.max(0, max)));
  const tests: Test[] = [];

  for (let p = 2; p <= limit; p++) {
    if (isPrime(p)) tests.push(p);
  }

  tests.push("prime");
  return tests;
}

/**
 * Return the set of tests triggered by n.
 * - prime -> {"prime"}
 * - composite -> its divisible tests (from the provided test list)
 */
function testsOf(n: number, tests: Test[]): Test[] {
  if (n < 2) return [];
  if (isPrime(n)) return ["prime"];

  const tags: Test[] = [];
  for (const t of tests) {
    if (t === "prime") continue;
    if (n % t === 0) tags.push(t);
  }
  return tags;
}

function testKey(t: Test): string {
  return typeof t === "number" ? String(t) : t;
}

function pickRandomInt(rng: () => number, lo: number, hi: number): number {
  return lo + Math.floor(rng() * (hi - lo + 1));
}

function pickRandom<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

/* ---------- candidate generation helpers ---------- */

/** Count how many multiples of d are in [min, max] */
function countMultiplesInRange(min: number, max: number, d: number): number {
  const first = Math.ceil(min / d) * d;
  if (first > max) return 0;
  return Math.floor((max - first) / d) + 1;
}

/** Uniformly sample a multiple of d in [min, max] */
function randomMultipleInRange(
  min: number,
  max: number,
  d: number,
  rng: () => number
): number | null {
  const first = Math.ceil(min / d) * d;
  if (first > max) return null;
  const count = Math.floor((max - first) / d) + 1;
  const i = pickRandomInt(rng, 0, count - 1);
  return first + i * d;
}

/* ---------- balancing logic ---------- */

function initTestCount(tests: Test[]): Record<string, number> {
  const obj: Record<string, number> = {};
  for (const t of tests) obj[testKey(t)] = 0;
  return obj;
}

/** Return all tests whose count is currently minimal */
function getMinCountTests(
  tests: Test[],
  testCount: Record<string, number>
): Test[] {
  let best = Infinity;
  const out: Test[] = [];
  for (const t of tests) {
    const c = testCount[testKey(t)] ?? 0;
    if (c < best) {
      best = c;
      out.length = 0;
      out.push(t);
    } else if (c === best) {
      out.push(t);
    }
  }
  return out;
}

/**
 * Hotness penalty:
 * sum of counts of all other tests triggered by n
 * (excluding the target test)
 */
function hotnessPenalty(
  n: number,
  target: Test,
  tests: Test[],
  testCount: Record<string, number>
): number {
  const tags = testsOf(n, tests);
  let p = 0;
  for (const tag of tags) {
    if (tag === target) continue;
    p += testCount[testKey(tag)] ?? 0;
  }
  return p;
}

/* ---------- main generator ---------- */

export function generateBalancedNumbers(
  minIn: number,
  maxIn: number,
  kIn: number,
  options: GeneratorOptions = {}
): GeneratorResult {
  //check and clamp inputs
  let min = clampInt(minIn); 
  let max = clampInt(maxIn);
  let k = clampInt(kIn);

  if (max < min) [min, max] = [max, min];
  if (k <= 0) return { numbers: [], testCount: {} };

  // Extract options with defaults
  const rng = options.rng ?? Math.random; // RNG function
  const tests = defaultTestsFromMax(max); // tests to balance
  const sampleCount = options.sampleCount ?? 30; // number of samples for random sampling
  const exhaustiveThreshold = options.exhaustiveThreshold ?? 200; // threshold for exhaustive search
  const preferOddForOddTests = options.preferOddForOddTests ?? true; // preference for odd numbers for odd tests

  const rangeSize = max - min + 1;
  k = Math.min(k, rangeSize);

  const used = new Set<number>(); // track used numbers
  const testCount = initTestCount(tests); // track counts for each test

  // Precompute primes
  const wantsPrime = tests.includes("prime");
  const primes = wantsPrime ? primesInRange(min, max) : [];

  function generateCandidateForTest(t: Test): number | null {
    if (t === "prime") {
      if (primes.length === 0) return null;
      return pickRandom(rng, primes);
    }
    return randomMultipleInRange(min, max, t, rng);
  }

  function candidateCountForTest(t: Test): number {
    if (t === "prime") return primes.length;
    return countMultiplesInRange(min, max, t);
  }

  function enumerateCandidatesForTest(t: Test): number[] {
    if (t === "prime") return primes.slice();
    const d = t;
    const first = Math.ceil(min / d) * d;
    if (first > max) return [];
    const out: number[] = [];
    for (let x = first; x <= max; x += d) out.push(x);
    return out;
  }

  function updateCountsWithNumber(n: number) {
    const tags = testsOf(n, tests);
    for (const tag of tags) {
      const key = testKey(tag);
      testCount[key] = (testCount[key] ?? 0) + 1;
    }
  }

  function chooseNumberForTest(target: Test): number | null {
    const totalCandidates = candidateCountForTest(target);
    if (totalCandidates <= 0) return null;
    // Determine if we should prefer odd numbers for this test
    const preferOdd =
      preferOddForOddTests &&
      (target === "prime" || (typeof target === "number" && target % 2 === 1));

    let best: number | null = null;
    let bestPenalty = Infinity;

    // Exhaustive scan for small candidate sets
    if (totalCandidates <= exhaustiveThreshold) {
      const all = enumerateCandidatesForTest(target);
      // Randomize the order so that we don't always pick the same "best" candidate in ties
      for (let i = all.length - 1; i > 0; i--) {
        const j = pickRandomInt(rng, 0, i);
        [all[i], all[j]] = [all[j], all[i]];
      }

      for (const n of all) {
        if (n < 2 || used.has(n)) continue;
        if (preferOdd && n % 2 === 0) continue; // Skip even numbers if we prefer odd

        // Calculate hotness penalty and find the best candidate
        const p = hotnessPenalty(n, target, tests, testCount);
        if (p < bestPenalty) {
          bestPenalty = p;
          best = n;
          if (bestPenalty === 0) break;
        }
      }

      // Relax odd preference if nothing found
      if (best === null && preferOdd) {
        for (const n of all) {
          if (n < 2 || used.has(n)) continue;
          if (n % 2 === 1) continue; // Only consider even candidates that were skipped previously
          const p = hotnessPenalty(n, target, tests, testCount);
          if (p < bestPenalty) {
            bestPenalty = p;
            best = n;
            if (bestPenalty === 0) break;
          }
        }
      }
      if (target === "prime") {
        console.log("Prime ", best, " was picked");
      }
      return best;
    }

    // Random sampling for large ranges
    const tries = Math.max(10, sampleCount);
    for (let i = 0; i < tries; i++) {
      const cand = generateCandidateForTest(target);
      if (cand === null || cand < 2 || used.has(cand)) continue;
      if (preferOdd && cand % 2 === 0) continue;

      const p = hotnessPenalty(cand, target, tests, testCount);
      if (p < bestPenalty) {
        bestPenalty = p;
        best = cand;
        if (bestPenalty === 0) break;
      }
    }

    // Relax odd preference
    if (best === null && preferOdd) {
      for (let i = 0; i < tries; i++) {
        const cand = generateCandidateForTest(target);
        if (cand === null || cand < 2 || used.has(cand)) continue;

        const p = hotnessPenalty(cand, target, tests, testCount);
        if (p < bestPenalty) {
          bestPenalty = p;
          best = cand;
          if (bestPenalty === 0) break;
        }
      }
    }

    return best;
  }

  /* ---------- main loop ---------- */

  const numbers: number[] = [];

  for (let step = 0; step < k; step++) {
    // Pick the least-used test
    const minTests = getMinCountTests(tests, testCount);
    // Randomly pick one of the least-used tests as the target
    let target = pickRandom(rng, minTests);

    // Try this test first, then others if needed
    let chosen = chooseNumberForTest(target);
    if (chosen === null) {
      const sorted = tests
        .slice()
        .sort(
          (a, b) =>
            (testCount[testKey(a)] ?? 0) -
            (testCount[testKey(b)] ?? 0)
        );
      for (const t of sorted) {
        chosen = chooseNumberForTest(t);
        if (chosen !== null) {
          target = t;
          break;
        }
      }
    }

    // Final fallback: random unused number
    if (chosen === null) {
      let found: number | null = null;
      for (let i = 0; i < 200; i++) {
        const cand = pickRandomInt(rng, min, max);
        if (cand >= 2 && !used.has(cand)) {
          found = cand;
          break;
        }
      }
      if (found === null) break;
      chosen = found;
    }

    // Record and update state
    used.add(chosen);
    numbers.push(chosen);
    updateCountsWithNumber(chosen);
  }

  return { numbers, testCount };
}
