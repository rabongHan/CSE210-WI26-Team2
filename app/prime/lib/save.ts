// Save the game information in local storage
import { GameState, GameData } from "./types";

const LS_STATE_KEY = 'primeGameState';
const LS_KEY = 'primeGameData';

// Save game state to localStorage
export function saveGameState(gameState: GameState): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_STATE_KEY, gameState);
}

// Save game data to localStorage
export function saveGameData(gameData: GameData): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_KEY, JSON.stringify(gameData));
}

// Load game state from localStorage
export function loadGameState(): GameState | null {
    if (typeof window === "undefined") return null;
    
    try {
        const data = localStorage.getItem(LS_STATE_KEY);
        if (data) {
            return data as GameState;
        }
    } catch {
        return null;
    }
    return null;
}

// Load game data from localStorage
export function loadGameData(): GameData | null {
    if (typeof window === "undefined") return null;
    
    try {
        const data = localStorage.getItem(LS_KEY);
        if (data) {
            return JSON.parse(data) as GameData;
        }
    } catch {
        return null;
    }
    return null;
}

// Clear all saved game data from localStorage
export function clearGameData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(LS_STATE_KEY);
    localStorage.removeItem(LS_KEY);
}