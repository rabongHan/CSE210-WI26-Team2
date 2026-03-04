// Save the game information in local storage after every round
import { GameData } from "./types";

const LS_WIN_STATUS_KEY = 'primeWon';
const LS_KEY = 'primeGameData';

export function saveEndGame(wonGame: boolean) {
    // whether or not the player won the prime testing game
    localStorage.setItem(LS_WIN_STATUS_KEY, btoa(wonGame.toString()));
}

export function saveGameData(gameData: GameData) {
    // save the game data in local storage, encoding it as a string
    localStorage.setItem(LS_KEY, btoa(JSON.stringify(gameData)));
}

export function loadEndGame() {
    // load whether or not the player won the prime testing game from local storage, decoding it from a string
    try {
        const data = localStorage.getItem(LS_WIN_STATUS_KEY);
        if (data) {
            return JSON.parse(atob(data));
        }
    } catch (e) {
        return null;
    }
}

export function loadGameData() {
    // load the game data from local storage, decoding it from a string
    try {
        const data = localStorage.getItem(LS_KEY);
        if (data) {
            return JSON.parse(atob(data));
        }
    } catch (e) {
        return null; // probably means game data hasn't been saved yet, so just return null
    }
}