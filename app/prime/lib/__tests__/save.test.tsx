import {
  saveGameState,
  saveGameData,
  loadGameState,
  loadGameData,
  clearGameData,
} from "../save";
import { GameState, GameData } from "../types";

describe("prime game localStorage integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("saveGameState", () => {
    test("saves game state to localStorage", () => {
      saveGameState("won");

      const raw = localStorage.getItem("primeGameState");
      expect(raw).toBe("won");
    });

    test("saves different game states correctly", () => {
      const states: GameState[] = ["welcome", "playing", "won", "lost"];

      states.forEach((state) => {
        saveGameState(state);
        expect(localStorage.getItem("primeGameState")).toBe(state);
      });
    });
  });

  describe("saveGameData", () => {
    test("saves game data as JSON to localStorage", () => {
      const gameData: GameData = {
        currNum: 123,
        numList: [100, 123, 150],
        currNumIndex: 1,
        userHealth: 5,
        bossHealth: 10,
        timeLeft: 8,
        buttonsDisabled: false,
      };

      saveGameData(gameData);

      const raw = localStorage.getItem("primeGameData");
      expect(raw).not.toBeNull();
      expect(JSON.parse(raw as string)).toEqual(gameData);
    });

    test("handles complete game data structure", () => {
      const gameData: GameData = {
        currNum: 257,
        numList: [101, 157, 199, 257],
        currNumIndex: 3,
        userHealth: 2,
        bossHealth: 15,
        timeLeft: 5,
        buttonsDisabled: true,
      };

      saveGameData(gameData);
      const loaded = JSON.parse(localStorage.getItem("primeGameData") as string);
      
      expect(loaded.currNum).toBe(257);
      expect(loaded.userHealth).toBe(2);
      expect(loaded.buttonsDisabled).toBe(true);
    });
  });

  describe("loadGameState", () => {
    test("returns game state when data exists", () => {
      localStorage.setItem("primeGameState", "won");
      
      expect(loadGameState()).toBe("won");
    });

    test("returns null when localStorage is empty", () => {
      expect(loadGameState()).toBeNull();
    });

    test("loads all valid game states correctly", () => {
      const states: GameState[] = ["welcome", "playing", "won", "lost"];

      states.forEach((state) => {
        localStorage.setItem("primeGameState", state);
        expect(loadGameState()).toBe(state);
      });
    });
  });

  describe("loadGameData", () => {
    test("returns parsed GameData when data exists", () => {
      const gameData: GameData = {
        currNum: 181,
        numList: [100, 150, 181, 200],
        currNumIndex: 2,
        userHealth: 4,
        bossHealth: 12,
        timeLeft: 7,
        buttonsDisabled: false,
      };

      localStorage.setItem("primeGameData", JSON.stringify(gameData));

      expect(loadGameData()).toEqual(gameData);
    });

    test("returns null when localStorage is empty", () => {
      expect(loadGameData()).toBeNull();
    });

    test("returns null for invalid JSON", () => {
      localStorage.setItem("primeGameData", "{not-valid-json");
      
      expect(loadGameData()).toBeNull();
    });

    test("returns null for corrupted data", () => {
      localStorage.setItem("primeGameData", "just a string, not JSON");
      
      expect(loadGameData()).toBeNull();
    });
  });

  describe("clearGameData", () => {
    test("removes both game state and game data", () => {
      localStorage.setItem("primeGameState", "playing");
      localStorage.setItem("primeGameData", JSON.stringify({
        currNum: 123,
        numList: [123],
        currNumIndex: 0,
        userHealth: 5,
        bossHealth: 20,
        timeLeft: 10,
        buttonsDisabled: false,
      }));

      clearGameData();

      expect(localStorage.getItem("primeGameState")).toBeNull();
      expect(localStorage.getItem("primeGameData")).toBeNull();
      expect(loadGameState()).toBeNull();
      expect(loadGameData()).toBeNull();
    });

    test("works even when storage is already empty", () => {
      expect(() => clearGameData()).not.toThrow();
      
      expect(localStorage.getItem("primeGameState")).toBeNull();
      expect(localStorage.getItem("primeGameData")).toBeNull();
    });
  });

  describe("integration tests", () => {
    test("save and load cycle works correctly", () => {
      const gameData: GameData = {
        currNum: 211,
        numList: [101, 131, 167, 211, 233],
        currNumIndex: 3,
        userHealth: 3,
        bossHealth: 8,
        timeLeft: 6,
        buttonsDisabled: true,
      };

      saveGameState("playing");
      saveGameData(gameData);

      expect(loadGameState()).toBe("playing");
      expect(loadGameData()).toEqual(gameData);
    });

    test("can update saved data", () => {
      const initialData: GameData = {
        currNum: 101,
        numList: [101, 103],
        currNumIndex: 0,
        userHealth: 5,
        bossHealth: 20,
        timeLeft: 10,
        buttonsDisabled: false,
      };

      const updatedData: GameData = {
        ...initialData,
        currNumIndex: 1,
        currNum: 103,
        userHealth: 4,
        timeLeft: 8,
      };

      saveGameData(initialData);
      expect(loadGameData()?.currNumIndex).toBe(0);

      saveGameData(updatedData);
      expect(loadGameData()?.currNumIndex).toBe(1);
      expect(loadGameData()?.userHealth).toBe(4);
    });

    test("clear removes all data and allows fresh start", () => {
      saveGameState("lost");
      saveGameData({
        currNum: 123,
        numList: [123],
        currNumIndex: 0,
        userHealth: 0,
        bossHealth: 15,
        timeLeft: 0,
        buttonsDisabled: true,
      });

      clearGameData();

      expect(loadGameState()).toBeNull();
      expect(loadGameData()).toBeNull();

      // Can save fresh data after clear
      saveGameState("welcome");
      expect(loadGameState()).toBe("welcome");
    });
  });
});
