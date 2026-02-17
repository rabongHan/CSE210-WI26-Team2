"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  generateComposite,
  generateBubbles,
  isCorrectAnswer,
  getNextFactor,
  STARTING_LIVES,
} from "./bubble-game-logic";

// Game Status
type GameStatus = "playing" | "won" | "lost";

type BubbleGameState = {
  factor: number;
  bubbles: number[];
  lives: number;
  status: GameStatus;
  handleBubbleClick: (num: number) => void;
  resetGame: () => void;
};

// Initial values come from game-logic functions
// Thinking of deleting these because they freeze the initial factor
// at whatever it was when the page loaded, meaning a user will always
// start with the same factor.
// export const INITIAL_FACTOR = generateFactor();
// export const INITIAL_BUBBLES = generateBubbles();

export const INITIAL_LIVES = STARTING_LIVES;

// Context
const BubbleGameContext = createContext<BubbleGameState | null>(null);

function generateNewGame() {
  const factor = generateComposite()
  return{
    factor,
    bubbles: generateBubbles(factor),
    lives: STARTING_LIVES,
    status: "playing" as GameStatus
  };
}
export function BubbleGameProvider({ children }: { children: ReactNode }) {
  // Lazy initialization to get random factor every time module loads
  // const [factor, setFactor] = useState(() => generateFactor());
  // const [bubbles, setBubbles] = useState(() => generateBubbles(factor)) ;
  // const [lives, setLives] = useState(INITIAL_LIVES);
  // const [status, setStatus] = useState<GameStatus>("playing");
  const[game, setGame] = useState(() => generateNewGame());

  function handleBubbleClick(num: number) {
    setGame((prev) => {
      if (prev.status !== "playing") return prev;

      if (isCorrectAnswer(num, prev.factor)) {
        // Correct — divide the factor
        const nextFactor = getNextFactor(prev.factor, num);

        // Player wins when factor is fully reduced to 1
        if (nextFactor <= 1) {
          return { ...prev, factor: nextFactor, bubbles: [], status: "won" };
        }

        // Generate fresh bubbles for the new factor so the player
        // always has valid options (no more stuck states)
        const newBubbles = generateBubbles(nextFactor);
        return {
          ...prev,
          factor: nextFactor,
          bubbles: newBubbles,
        };
      }

      // Wrong — lose a life
      const newLives = prev.lives - 1;

      return {
        ...prev,
        lives: newLives,
        status: newLives <= 0 ? "lost" : prev.status
      };
    });
  }

  function resetGame() {
    setGame(generateNewGame);
  }

  return (
    <BubbleGameContext.Provider
      value={{
        factor: game.factor,
        bubbles: game.bubbles,
        lives: game.lives,
        status: game.status,
        handleBubbleClick,
        resetGame }}
    >
      {children}
    </BubbleGameContext.Provider>
  );
}

export function useBubbleGame() {
  const context = useContext(BubbleGameContext);
  return context;
}
