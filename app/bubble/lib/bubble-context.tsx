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
export const INITIAL_FACTOR = generateFactor();
export const INITIAL_LIVES = STARTING_LIVES;
export const INITIAL_BUBBLES = generateBubbles();

// Context
const BubbleGameContext = createContext<BubbleGameState | null>(null);

export function BubbleGameProvider({ children }: { children: ReactNode }) {
  const [factor, setFactor] = useState(INITIAL_FACTOR);
  const [bubbles, setBubbles] = useState(INITIAL_BUBBLES);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [status, setStatus] = useState<GameStatus>("playing");

  function handleBubbleClick(num: number) {
    if (status !== "playing") return;

    if (isCorrectAnswer(num, factor)) {
      // Correct — remove the bubble
      const remaining = bubbles.filter((b) => b !== num);
      setBubbles(remaining);

      // Update factor for next step
      const nextFactor = getNextFactor(factor, num);
      setFactor(nextFactor);

      // Check if all correct answers have been popped
      if (!hasCorrectAnswersLeft(remaining, nextFactor)) {
        setStatus("won");
      }
    } else {
      // Wrong — lose a life
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setStatus("lost");
      }
    }
  }

  function resetGame() {
    setBubbles(generateBubbles());
    setLives(STARTING_LIVES);
    setStatus("playing");
    setFactor(generateFactor());
  }

  return (
    <BubbleGameContext.Provider
      value={{ factor, bubbles, lives, status, handleBubbleClick, resetGame }}
    >
      {children}
    </BubbleGameContext.Provider>
  );
}

export function useBubbleGame() {
  const context = useContext(BubbleGameContext);
  return context;
}
