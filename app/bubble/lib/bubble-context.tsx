// TODO: add skip button

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
import {Property} from "csstype";
import PaddingRight = Property.PaddingRight;

const LS_KEY = "bubble.status";
type BubbleStorage = {
  unlocked_stages: StageKey[];
  status: "won" | "lost";
  largest_number: number;
  total_lives: number;
}
// Game Status
type GameStatus = "playing" | "won" | "lost";

type BubbleGameState = {
  factor: number;
  bubbles: number[];
  lives: number;
  round: number;
  original_dividend: number;
  stage: StageKey;
  status: GameStatus;
  wrongBubble: number | null;
  unlockedStages: StageKey[];
  handleBubbleClick: (num: number) => void;
  handleSkip: () => void;
  selectStage: (stage: StageKey) => void;
  resetGame: () => void;
};

export const INITIAL_LIVES = STARTING_LIVES;

// Context
const BubbleGameContext = createContext<BubbleGameState | null>(null);

export function loadStorage(): BubbleStorage {
  try{
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as BubbleStorage;
  } catch {}
  return {unlocked_stages: [1], status: "lost", largest_number: 0, total_lives: 0};
}

function saveStorage(data: Partial<BubbleStorage>){
  try {
    const current = loadStorage();
    localStorage.setItem(LS_KEY, JSON.stringify({...current, ...data}));
  }catch{}
}



function generateNewGame(stage: StageKey) {
  const factor = generateDividend(stage);
  return {
    factor,
    bubbles: generateBubbles(factor, stage),
    lives: INITIAL_LIVES,
    round: 1,
    original_dividend: factor,
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
    const stored = loadStorage();
    setUnlockedStages(stored.unlocked_stages);
  }, []);

  function unlockNextStage(current: StageKey) {
    const next = (current + 1) as StageKey;
    if (next in STAGE_CONFIG) {
      setUnlockedStages((prev) => {
        if (prev.includes(next)) return prev;
        const updated = [...prev, next];
        saveStorage({ unlocked_stages: updated });
        return updated;
      });
    }
    else{
      saveStorage({status: 'won'});
    }
  }

  function saveHighest() {
    const stored = loadStorage();
    const highest_so_far = stored.largest_number;
    const true_highest = Math.max(highest_so_far, game.original_dividend);
    saveStorage({largest_number: true_highest});
  }

  function handleBubbleClick(num: number) {
    setGame((prev) => {
      if (prev.status !== "playing") return prev;

      if (isCorrectAnswer(num, prev.factor)) {
        // Correct — divide the factor
        const nextFactor = getNextFactor(prev.factor, num);

        // Player wins when factor is fully reduced to 1
        if (nextFactor <= 1) {
          saveHighest();
          if (prev.round >= NUM_ROUNDS) {
            unlockNextStage(selectedStage);
            return { ...prev, factor: nextFactor, bubbles: [], status: "won" };
          } else {
            const factor = generateDividend(selectedStage);
            const newBubbles = generateBubbles(factor, selectedStage);
            return { ...prev, factor: factor, bubbles: newBubbles, round: prev.round + 1, original_dividend: factor };
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

  function handleSkip() {
    setGame((prev) => {
      const factor = generateDividend(selectedStage);
      const newBubbles = generateBubbles(factor, selectedStage);
      return { ...prev, factor: factor, bubbles: newBubbles, original_dividend: factor };
    });
  }

  function selectStage(stage: StageKey) {
    setSelectedStage(stage);
    setGame(generateNewGame(stage));
    setWrongBubble(null);
  }

  // Depreciated
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
        original_dividend: game.original_dividend,
        stage: selectedStage,
        wrongBubble,
        unlockedStages,
        handleBubbleClick,
        handleSkip,
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
