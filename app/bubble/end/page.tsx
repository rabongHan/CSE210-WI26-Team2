"use client";

import { NavButton } from "@/app/bubble/components/bubble-buttons";
import TargetCursor from "@/app/bubble/components/TargetCursor";
import { useBubbleGame } from "@/app/bubble/lib/bubble-context";

export default function Page() {
  const { status } = useBubbleGame();
  const won = status === "won";

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
        <NavButton href="/bubble/menu">MENU</NavButton>
      </div>
    </main>
  );
}
