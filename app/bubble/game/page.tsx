"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Hearts } from "@/app/bubble/components/bubble-hearts";
import { BubbleCircle } from "@/app/bubble/components/bubble-circle";
import { NavButton } from "@/app/bubble/components/bubble-buttons";
import { useBubbleGame } from "@/app/bubble/lib/bubble-context";
import {NUM_ROUNDS} from "@/app/bubble/lib/bubble-game-logic";
import TargetCursor from "@/app/bubble/components/TargetCursor";

export default function Page() {
  const { factor, bubbles, lives, status, round, stage, wrongBubble, handleBubbleClick, handleSkip, resetGame } =
    useBubbleGame();
  const router = useRouter();
  const gameStarted = useRef(false);
  // Needed so game resets state on mount
  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (status !== "playing") {
      if (!gameStarted.current) {
        resetGame();
      } else {
        router.push("/bubble/end");
      }
    } else {
      gameStarted.current = true;
    }
  }, [status, router, resetGame]);

  return (
    <main className="page-ocean relative">
      <TargetCursor />

      <Hearts lives={lives} />

      <div className="absolute top-4 left-4 text-white text-base font-bold">
        Stage {stage} &nbsp;·&nbsp; Round {round}/{NUM_ROUNDS}
      </div>

      <div className="mt-16 mb-16">
        {/*<p className="text-[#8899AA] text-xl m-0">Factor:</p>*/}
        <h1 className="text-white text-8xl font-black m-0">{factor}</h1>
      </div>

      <div className="grid grid-rows-2 grid-flow-col justify-center gap-5  mt-auto mb-12">
        {bubbles.map((num, i) => (
          <BubbleCircle
            key={i}
            number={num}
            isWrong={wrongBubble === num}
            onClick={() => handleBubbleClick(num)}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <NavButton href={"/bubble/menu"}>BACK</NavButton>
        <button className="cursor-target btn-pink text-3xl py-3 px-12 tracking-wide" onClick={handleSkip}>SKIP</button>
      </div>
    </main>
  );
}