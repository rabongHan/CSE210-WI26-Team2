// Define our treasure game JSON end state object
export type TreasureResult = {
    status: "won" | "lost"; // whether player won/lost treasure game
    curr_score: number; // Final score when the game finished
    total_lives: number; // how many lives left before user finished
    largest_number: number; // Largest number solved by the user
};

// localStorage key for treasure result data
const TREASURE_PROGRESS_KEY = "progress.treasure";

// Save treasure result to localStorage
// localStorage only stores strings, so call JSON.stringify the object
export function saveTreasureResult(result: TreasureResult): void {
    // if we aren't running browser, exit function. Handles ReferenceError when using Jest.
    if (typeof window === "undefined") return;

    // stores into localStorage as JSON (treasure key: value as result) 
    localStorage.setItem(TREASURE_PROGRESS_KEY, JSON.stringify(result));
}

// Read treasure result from localStorage
// Useful for summary information but also loading the save state.
export function getTreasureResult(): TreasureResult | null {
    // if we aren't running browser, exit function.
    if (typeof window === "undefined") return null;

    // retrieve data corresponding to TREASURE_PROGRESS_KEY
    const raw = localStorage.getItem(TREASURE_PROGRESS_KEY);

    // Nothing stored yet.
    if (!raw) return null;

    try {
        // Parse stored JSON string back into object.
        return JSON.parse(raw) as TreasureResult;
    } catch {
        // If value is corrupted/non-JSON, fail safely.
        return null;
    }
}

// in case we want the option to restart the treasure game after passing
export function clearTreasureResult(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TREASURE_PROGRESS_KEY);
}
