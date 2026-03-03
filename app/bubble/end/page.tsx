"use client";

import { useRouter } from "next/navigation";
import {NavButton, StageButton} from "@/app/bubble/components/bubble-buttons";
import TargetCursor from "@/app/bubble/components/TargetCursor";
import { useBubbleGame } from "@/app/bubble/lib/bubble-context";
import {StageKey, STAGE_CONFIG} from "@/app/bubble/lib/bubble-game-logic";

export default function Page() {
  const { status, stage, selectStage } = useBubbleGame();
  const won = status === "won";
  const router = useRouter();
  const isFinalStage = stage === 3;

  function handleNextStage() {
    const next = (stage + 1) as StageKey;
    selectStage(next);
    router.push("/bubble/game");
  }
  return (
    <main className="page-ocean justify-center text-center">
      <TargetCursor />

      <h1
        className={`text-7xl font-black leading-tight drop-shadow-lg ${
          won ? "text-[#81E979]" : "text-[#FF6B6B]"
        }`}
      >
        {won ? "You Win!" : "Game Over"}
      </h1>

      <p className="text-white text-2xl mt-4 mb-12">
        {won
          ? "You factored the number! Great job!"
          : "You ran out of lives. Try again!"}
      </p>

      <div className="flex flex-col gap-4">
        <NavButton href="/bubble/game">PLAY AGAIN</NavButton>

          {won && (
              isFinalStage
              ? <NavButton href="/prime">Next Game</NavButton>
              : <button onClick={handleNextStage} className="cursor-target btn-pink text-3xl py-3 px-12 tracking-wide">
                Next Stage ({stage + 1})
              </button>
          )}

        <NavButton href="/bubble/menu">MENU</NavButton>
      </div>
    </main>
  );
}
