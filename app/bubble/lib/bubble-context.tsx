"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  generateComposite,
  generateBubbles,
  isCorrectAnswer,
  getNextFactor,
  STARTING_LIVES,
  NUM_ROUNDS,
} from "./bubble-game-logic";

// Game Status
type GameStatus = "playing" | "won" | "lost";

type BubbleGameState = {
  factor: number;
  bubbles: number[];
  lives: number;
  round: number;
  status: GameStatus;
  wrongBubble: number | null;
  handleBubbleClick: (num: number) => void;
  resetGame: () => void;
};

export const INITIAL_LIVES = STARTING_LIVES;

// Context
const BubbleGameContext = createContext<BubbleGameState | null>(null);

function generateNewGame() {
  const factor = generateComposite();
  return {
    factor,
    bubbles: generateBubbles(factor),
    lives: STARTING_LIVES,
    round: 1,
    status: "playing" as GameStatus,
  };
}

export function BubbleGameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState(() => generateNewGame());
  const [wrongBubble, setWrongBubble] = useState<number | null>(null);

  function handleBubbleClick(num: number) {
    setGame((prev) => {
      if (prev.status !== "playing") return prev;

      if (isCorrectAnswer(num, prev.factor)) {
        const nextFactor = getNextFactor(prev.factor, num);

        if (nextFactor <= 1) {
          if (prev.round >= NUM_ROUNDS) {
            return { ...prev, factor: nextFactor, bubbles: [], status: "won" };
          } else {
            const factor = generateComposite();
            const newBubbles = generateBubbles(factor);
            return { ...prev, factor: factor, bubbles: newBubbles, round: prev.round + 1 };
          }
        }

        const newBubbles = generateBubbles(nextFactor);
        return {
          ...prev,
          factor: nextFactor,
          bubbles: newBubbles,
        };
      }

      // Wrong — lose a life
      const newLives = prev.lives - 1;
      setWrongBubble(num);
      setTimeout(() => setWrongBubble(null), 500);

      return {
        ...prev,
        lives: newLives,
        status: newLives <= 0 ? "lost" : prev.status,
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
        round: game.round,
        wrongBubble,
        handleBubbleClick,
        resetGame,
      }}
    >
      {children}
    </BubbleGameContext.Provider>
  );
}

export function useBubbleGame() {
  const context = useContext(BubbleGameContext);
  return context;
}