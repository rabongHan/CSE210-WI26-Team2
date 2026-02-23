import { isPrime, generateBalancedNumbers } from '../numberGenerator';

/* ========================================
   PART 1: isPrime Function Tests
   ======================================== */
describe('isPrime', () => {
  // ===== 1.1 Boundary & Invalid Cases =====
  test('[1.1.1] returns false for numbers less than 2', () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(-5)).toBe(false);
  });

  // ===== 1.2 Special Cases =====
  test('[1.2.1] returns true for 2 (only even prime)', () => {
    expect(isPrime(2)).toBe(true);
  });

  test('[1.2.2] returns false for even numbers greater than 2', () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(100)).toBe(false);
    expect(isPrime(256)).toBe(false);
  });

  // ===== 1.3 Small Numbers (2-100) =====
  test('[1.3.1] returns true for small prime numbers', () => {
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(11)).toBe(true);
    expect(isPrime(13)).toBe(true);
  });

  test('[1.3.2] returns false for small composite numbers', () => {
    expect(isPrime(9)).toBe(false);
    expect(isPrime(15)).toBe(false);
    expect(isPrime(21)).toBe(false);
    expect(isPrime(25)).toBe(false);
  });

  // ===== 1.4 Large Numbers =====
  test('[1.4.1] works for larger prime numbers', () => {
    expect(isPrime(97)).toBe(true);
    expect(isPrime(101)).toBe(true);
    expect(isPrime(997)).toBe(true);
  });

  test('[1.4.2] works for larger composite numbers', () => {
    expect(isPrime(100)).toBe(false);
    expect(isPrime(1000)).toBe(false);
    expect(isPrime(121)).toBe(false);
  });
});

/* ========================================
   PART 2: generateBalancedNumbers Function Tests
   ======================================== */
describe('generateBalancedNumbers', () => {
  // ===== 2.1 Basic Functionality =====
  test('[2.1.1] returns empty array when k is 0 or negative', () => {
    const result = generateBalancedNumbers(1, 100, 0);
    expect(result.numbers).toEqual([]);
    expect(result.numbers.length).toBe(0);

    const negResult = generateBalancedNumbers(1, 100, -5);
    expect(negResult.numbers).toEqual([]);
  });

  test('[2.1.2] generates correct number of values', () => {
    const k = 10;
    const result = generateBalancedNumbers(1, 100, k);
    expect(result.numbers.length).toBe(k);
  });

  // ===== 2.2 Range Validation =====
  test('[2.2.1] all generated numbers are within specified range (normal, reversed, and small ranges)', () => {
    // Test normal range
    const result1 = generateBalancedNumbers(10, 50, 20);
    result1.numbers.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(10);
      expect(num).toBeLessThanOrEqual(50);
    });

    // Test reversed min/max
    const result2 = generateBalancedNumbers(100, 1, 10);
    expect(result2.numbers.length).toBe(10);
    result2.numbers.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(100);
    });

    // Test small range
    const result3 = generateBalancedNumbers(2, 5, 3);
    expect(result3.numbers.length).toBe(3);
    result3.numbers.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(2);
      expect(num).toBeLessThanOrEqual(5);
    });
  });

  test('[2.2.2] handles k larger than range size', () => {
    const result = generateBalancedNumbers(1, 10, 100);
    expect(result.numbers.length).toBeLessThanOrEqual(10);
  });

  // ===== 2.3 Uniqueness =====
  test('[2.3.1] all generated numbers are unique', () => {
    const result = generateBalancedNumbers(1, 100, 20);
    const uniqueNumbers = new Set(result.numbers);
    expect(uniqueNumbers.size).toBe(result.numbers.length);
  });

  // ===== 2.4 Distribution & Balance Verification =====
  test('[2.4.1] testCount correctly tracks all test categories', () => {
    const result = generateBalancedNumbers(2, 100, 50);
    
    // Verify each test category count matches actual occurrences
    const primeCount = result.numbers.filter(n => isPrime(n)).length;
    expect(result.testCount['prime']).toBe(primeCount);
    
    // Verify factor test counts
    for (const [testKey, count] of Object.entries(result.testCount)) {
      if (testKey === 'prime') continue;
      const factor = parseInt(testKey);
      const actualCount = result.numbers.filter(n => !isPrime(n) && n % factor === 0).length;
      expect(count).toBe(actualCount);
    }
  });

  test('[2.4.2] distribution follows target frequency ratios', () => {
    const result = generateBalancedNumbers(2, 200, 60);

    const counts = Object.values(result.testCount);
    expect(counts.length).toBeGreaterThan(1);

    const total = counts.reduce((a, b) => a + b, 0);
    const primeCount = result.testCount['prime'] ?? 0;
    const primeRatio = total > 0 ? primeCount / total : 0;

    // Prime target frequency is ~50%
    expect(primeRatio).toBeGreaterThan(0.4);
    expect(primeRatio).toBeLessThan(0.6);

    const compositeKeys = Object.keys(result.testCount).filter((k) => k !== 'prime');
    const compositeTotal = total - primeCount;
    const compositeAvg = compositeKeys.length > 0 ? compositeTotal / compositeKeys.length : 0;

    for (const key of compositeKeys) {
      const count = result.testCount[key] ?? 0;
      // Allow some variance in composite distribution
      expect(count).toBeGreaterThan(compositeAvg * 0.5);
      expect(count).toBeLessThan(compositeAvg * 1.5);
    }
  });

  // ===== 2.5 Options & Configuration =====
  test('[2.5.1] uses custom RNG when provided', () => {
    let callCount = 0;
    const mockRng = () => {
      callCount++;
      return Math.random();
    };

    generateBalancedNumbers(1, 100, 10, { rng: mockRng });
    expect(callCount).toBeGreaterThan(0);
  });

  test('[2.5.2] respects sampleCount option', () => {
    const result1 = generateBalancedNumbers(1, 1000, 20, { sampleCount: 10 });
    const result2 = generateBalancedNumbers(1, 1000, 20, { sampleCount: 50 });

    expect(result1.numbers.length).toBe(20);
    expect(result2.numbers.length).toBe(20);
  });

  test('[2.5.3] balancing works consistently with fixed seed', () => {
    let seed = 12345;
    const mockRng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const result1 = generateBalancedNumbers(2, 100, 40, { rng: mockRng });
    
    seed = 12345;
    const result2 = generateBalancedNumbers(2, 100, 40, { rng: mockRng });

    expect(result1.numbers).toEqual(result2.numbers);
    expect(result1.testCount).toEqual(result2.testCount);
  });
});
