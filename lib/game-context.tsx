"use client";

import React, { createContext, useContext, useMemo } from "react";

type GameContextValue = {
  resetTreasure: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<GameContextValue>(
    () => ({
      resetTreasure: () => {
        // for now: just a stub to prove wiring works
        // later: reset lives/score/etc in state or localStorage
        console.log("[game] resetTreasure()");
      },
    }),
    []
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within <GameProvider />");
  return ctx;
}
