// Save and retrieve data about each game to local storage

// copied from bubble/lib/bubble-context.tsx
import { StageKey } from "@/app/bubble/lib/bubble-game-logic";

type GameStatus = "playing" | "won" | "lost";
type BubbleStorage = {
  unlocked_stages: StageKey[];
  status: GameStatus;
}

// save bubble game data, using LS_KEY as given in bubble/lib/bubble-context.tsx
const LS_KEY = "bubble.status";
export function saveBubbleGameData(data /* : Partial<BubbleStorage> */) {
  try {
    const current = loadBubbleGameData();
    localStorage.setItem(LS_KEY, JSON.stringify({...current, ...data}));
  }catch{}
}

export function loadBubbleGameData() {
  try{
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as BubbleStorage;
  } catch {}
  return {unlocked_stages: [1], status: "playing"};
}

export function savePrimeEndGame(wonGame: boolean) {
    // whether or not the player won the prime testing game
    localStorage.setItem('primeWon', btoa(wonGame.toString()));
}

export function savePrimeGameData(gameData) {
    // save the game data in local storage, encoding it as a string
    localStorage.setItem('primeGameData', btoa(JSON.stringify(gameData)));
}

export function loadPrimeEndGame() {
    // load whether or not the player won the prime testing game from local storage, decoding it from a string
    const data = localStorage.getItem('primeWon');
    if (data) {
        return JSON.parse(atob(data));
    }
    return null;
}

export function loadPrimeGameData() {
    // load the game data from local storage, decoding it from a string
    const data = localStorage.getItem('primeGameData');
    if (data) {
        return JSON.parse(atob(data));
    }
    return null;
}