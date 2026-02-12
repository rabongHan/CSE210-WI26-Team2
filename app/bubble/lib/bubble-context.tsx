"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  generateFactor,
  generateBubbles,
  isCorrectAnswer,
  getNextFactor,
  hasCorrectAnswersLeft,
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
  const factor = generateFactor()
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
      if (game.status !== "playing") return;

      if (isCorrectAnswer(num, game.factor)) {
        // Correct — remove the bubble
        const remaining = game.bubbles.filter((b) => b !== num);
        // Update factor for next step
        const nextFactor = getNextFactor(prev.factor, num);

        // Check if all correct answers have been popped
        const won = !hasCorrectAnswersLeft(remaining, nextFactor)
        return {
          ...prev,
          factor: nextFactor,
          bubbles: remaining,
          status: won? "won" : prev.status
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
