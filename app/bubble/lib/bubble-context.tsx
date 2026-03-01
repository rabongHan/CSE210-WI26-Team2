"use client";

import { createContext, useContext, useState, ReactNode, useEffect} from "react";
import {
  generateDividend,
  generateBubbles,
  isCorrectAnswer,
  getNextFactor,
  STARTING_LIVES,
  NUM_ROUNDS,
  STAGE_CONFIG,
  StageKey,
} from "./bubble-game-logic";

// Game Status
type GameStatus = "playing" | "won" | "lost";

type BubbleGameState = {
  factor: number;
  bubbles: number[];
  lives: number;
  round: number;
  stage: StageKey;
  status: GameStatus;
  wrongBubble: number | null;
  unlockedStages: StageKey[];
  handleBubbleClick: (num: number) => void;
  selectStage: (stage: StageKey) => void;
  resetGame: () => void;
};

export const INITIAL_LIVES = STARTING_LIVES;

// Context
const BubbleGameContext = createContext<BubbleGameState | null>(null);

function loadUnlocked(): StageKey[] {
  return [1];
}

function generateNewGame(stage: StageKey) {
  const factor = generateDividend(stage);
  return {
    factor,
    bubbles: generateBubbles(factor, stage),
    lives: INITIAL_LIVES,
    round: 1,
    status: "playing" as GameStatus,
  };
}

export function BubbleGameProvider({ children }: { children: ReactNode }) {
  const [selectedStage, setSelectedStage] = useState<StageKey>(3);
  const [unlockedStages, setUnlockedStages] = useState<StageKey[]>([1]);
  const [game, setGame] = useState(() => generateNewGame(selectedStage));
  const [wrongBubble, setWrongBubble] = useState<number | null>(null);

  // Hydrate unlocked stages
  useEffect(() => {
    setUnlockedStages(loadUnlocked());
  }, []);

  function handleBubbleClick(num: number) {
    setGame((prev) => {
      if (prev.status !== "playing") return prev;

      if (isCorrectAnswer(num, prev.factor)) {
        // Correct — divide the factor
        const nextFactor = getNextFactor(prev.factor, num);

        // Player wins when factor is fully reduced to 1
        if (nextFactor <= 1) {
          if (prev.round >= NUM_ROUNDS) {
            return { ...prev, factor: nextFactor, bubbles: [], status: "won" };
          } else {
            const factor = generateDividend(selectedStage);
            const newBubbles = generateBubbles(factor, selectedStage);
            return { ...prev, factor: factor, bubbles: newBubbles, round: prev.round + 1 };
          }
        }


        // Generate fresh bubbles for the new factor so the player
        // always has valid options (no more stuck states)
        const newBubbles = generateBubbles(nextFactor, selectedStage);
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

  function selectStage(stage: StageKey) {
    setSelectedStage(stage);
    setGame(generateNewGame(stage));
    setWrongBubble(null);
  }

  function resetGame() {
    setGame(generateNewGame(selectedStage));
  }

  return (
    <BubbleGameContext.Provider
      value={{
        factor: game.factor,
        bubbles: game.bubbles,
        lives: game.lives,
        status: game.status,
        round: game.round,
        stage: selectedStage,
        wrongBubble,
        unlockedStages,
        handleBubbleClick,
        selectStage,
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
