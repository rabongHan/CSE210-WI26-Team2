// import get Treasure saved result 
import { getTreasureResult } from "../treasure/lib/treasure-progress";
import {loadStorage} from "@/app/bubble/lib/bubble-context";

// Check which games are unlocked.
// Returns all 3 game states
export function getUnlockState() {

    // check if user won treasure game
    const treasureWon = getTreasureResult()?.status === "won";
    // check if user won bubble game
    const bubbleStorage = loadStorage();
    const bubbleWon = bubbleStorage.status === "won";

    // Return statuses for each game. Treasure starts unlocked.
    return {
        treasureUnlocked: true,
        bubbleUnlocked: treasureWon,
        primeUnlocked: bubbleWon, // TODO: replace with bubble won status
    }
}