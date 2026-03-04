// import get Treasure saved result 
import { getTreasureResult } from "../treasure/lib/treasure-progress";

// Check which games are unlocked.
// Returns all 3 game states
export function getUnlockState() {

    // check if user won treasure game
    const treasureWon = getTreasureResult()?.status === "won";
    // TODO: check if user won bubble game

    // Return statuses for each game. Treasure starts unlocked.
    return {
        treasureUnlocked: true,
        bubbleUnlocked: treasureWon,
        primeUnlocked: false, // TODO: replace with bubble won status
    }
}