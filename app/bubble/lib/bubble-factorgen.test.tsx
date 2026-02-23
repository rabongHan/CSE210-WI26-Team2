import {generateBubbles, generateComposite} from "@/app/bubble/lib/bubble-game-logic";

const NUM_BUBBLES = 8;

describe("generateBubbles", () => {
    test("returns an array of the correct length", () => {
        const n = 20;
        const bubbles = generateBubbles(n);

        expect(bubbles).toHaveLength(NUM_BUBBLES);
    });
    test("only contains numbers >= 2", () => {
        const n = 25;
        const bubbles = generateBubbles(n);

        bubbles.forEach((b) => {
            expect(b).toBeGreaterThanOrEqual(2);
        });
    });
      test("contains no duplicate values", () => {
    const n = 36;
    const bubbles = generateBubbles(n);

    const unique = new Set(bubbles);
    expect(unique.size).toBe(bubbles.length);
  });

  test("contains at least one correct factor of n", () => {
    const n = 28; // factors: 2, 4, 7, 14
    const bubbles = generateBubbles(n);

    const hasFactor = bubbles.some((b) => n % b === 0);
    expect(hasFactor).toBe(true);
  });

  test("does not include 1 or n itself", () => {
    const n = 40;
    const bubbles = generateBubbles(n);

    expect(bubbles).not.toContain(1);
    expect(bubbles).not.toContain(n);
  });

  test("can handle repeated calls", () => {
    const n = 47;
    const results = new Set<string>();

    for (let i = 0; i < 10; i++) {
      results.add(generateBubbles(n).join(","));
    }

    expect(results.size).toBeGreaterThan(1);
  });
  test("Number with 8 factors has same bubbles every run", () => {
    const n = 48; // factors: 2,3,4,6,8,12,16,24
    const results = new Set<string>();

    for (let i = 0; i < 10; i++) {
      let result = generateBubbles(n).sort()
      results.add(result.join(","));
    }

    expect(results.size).toBe(1);
  });
});

describe("generateComposite", () => {
    test("Composite is an integer", () => {
    const composite = generateComposite();

    expect(typeof composite).toBe('number');
  });
    test("Factor is inbetween 10 and 50", () => {
    const composite = generateComposite();

    // TODO: remove magic numbers, assign range according to level
    expect(composite).toBeGreaterThanOrEqual(10);
    expect(composite).toBeLessThanOrEqual(50);
  });
    test("Factor is not prime", () => {
    const composite = generateComposite();
    const factors: number[] = [];
    for (let i: number = 2; i <= Math.sqrt(composite); i++){
        if (composite % i === 0) {
            factors.push(i);
        }
    }
    expect(factors.length).toBeGreaterThan(0);
  });
});