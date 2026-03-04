import { getUnlockState } from "../unlock-logic";
import { getTreasureResult } from "../../treasure/lib/treasure-progress";

// mock the localStorage behavior
jest.mock("../../treasure/lib/treasure-progress", () => ({
    getTreasureResult: jest.fn(),
}));

// Testing For just Treasure Won status
describe("getUnlockState (treasure-only version)", () => {
    const mockGetTreasureResult = getTreasureResult as jest.MockedFunction<typeof getTreasureResult>;

    beforeEach(() => {
        mockGetTreasureResult.mockReset();
    });

    test("always keeps treasure unlocked", () => {
        mockGetTreasureResult.mockReturnValue(null);

        const state = getUnlockState();

        expect(state.treasureUnlocked).toBe(true);
    });

    test("unlocks bubble when treasure status is won", () => {
        // mock a localStorage retrieval status
        mockGetTreasureResult.mockReturnValue({
            status: "won",
            curr_score: 500,
            total_lives: 2,
            largest_number: 1237,
            level: 10,
        });

        const state = getUnlockState();

        // assert bubble unlocked, prime still locked
        expect(state).toEqual({
            treasureUnlocked: true,
            bubbleUnlocked: true,
            primeUnlocked: false,
        });
    });

    test("keeps bubble locked when treasure status is lost", () => {
        mockGetTreasureResult.mockReturnValue({
            status: "lost",
            curr_score: 200,
            total_lives: 0,
            largest_number: 999,
            level: 4,
        });

        const state = getUnlockState();

        // both games still locked
        expect(state).toEqual({
            treasureUnlocked: true,
            bubbleUnlocked: false,
            primeUnlocked: false,
        });
    });

    test("keeps bubble locked when treasure result is missing", () => {
        mockGetTreasureResult.mockReturnValue(null);

        const state = getUnlockState();

        expect(state).toEqual({
            treasureUnlocked: true,
            bubbleUnlocked: false,
            primeUnlocked: false,
        });
    });

    test("calls getTreasureResult exactly once", () => {
        mockGetTreasureResult.mockReturnValue(null);

        getUnlockState();

        expect(mockGetTreasureResult).toHaveBeenCalledTimes(1);
    });

    test("returns stable object shape for UI consumption", () => {
        mockGetTreasureResult.mockReturnValue(null);

        const state = getUnlockState();

        expect(state).toHaveProperty("treasureUnlocked");
        expect(state).toHaveProperty("bubbleUnlocked");
        expect(state).toHaveProperty("primeUnlocked");
        expect(typeof state.treasureUnlocked).toBe("boolean");
        expect(typeof state.bubbleUnlocked).toBe("boolean");
        expect(typeof state.primeUnlocked).toBe("boolean");
    });
});
