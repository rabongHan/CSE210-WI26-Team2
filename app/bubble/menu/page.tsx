"use client";

import { useRouter } from "next/navigation";
import { NavButton, StageButton } from "@/app/bubble/components/bubble-buttons";
import TargetCursor from "@/app/bubble/components/TargetCursor";
import { useBubbleGame } from "@/app/bubble/lib/bubble-context";
import { STAGE_CONFIG, StageKey } from "@/app/bubble/lib/bubble-game-logic";

const STAGE_DESCRIPTIONS: Record<StageKey, string> = {
  1: "Numbers 10–50",
  2: "Numbers 51–200",
  3: "Numbers 201–500",
};

export default function MenuPage() {
  const { unlockedStages, selectStage } = useBubbleGame();
  const router = useRouter();

  function handleStageClick(stage: StageKey) {
    selectStage(stage);
    router.push("/bubble/game");
  }

  return (
    <main className="page-ocean justify-center text-center">
      <TargetCursor />

      <h1 className="text-6xl font-black text-white drop-shadow-lg mb-2">
        SELECT STAGE
      </h1>
      <p className="text-[#8899AA] text-lg mb-12">
        Complete a stage to unlock the next one
      </p>

      <div className="flex flex-col gap-5">
        {([1, 2, 3] as StageKey[]).map((stage) => {
          const unlocked = unlockedStages.includes(stage);

          return (
            <StageButton
              key={stage}
              label={STAGE_CONFIG[stage].label}
              description={STAGE_DESCRIPTIONS[stage]}
              unlocked={unlocked}
              onClick={() => handleStageClick(stage)}
            />
          );
        })}
      </div>

      <div className="mt-10">
        <NavButton href="/bubble">BACK</NavButton>
      </div>
    </main>
  );
}