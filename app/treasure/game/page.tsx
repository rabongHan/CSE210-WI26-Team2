"use client";


import "@/app/treasure/treasure.css";

import { NavButton } from "@/app/treasure/components/treasure-buttons";
import { TreasureHeader } from "@/app/treasure//components/treasure-header";
import { Hearts } from "@/app/treasure/components/treasure-hearts";
import { GameBadges } from "@/app/treasure/components/treasure-badges";
import { TreasureGameProvider, useTreasureGame } from "@/app/treasure/lib/treasure-context";


const ruleInfo = {
    2: { title: "Divisible by 2", desc: "If number ends in 0 or is even (= number is divisible by 2)" },
    3: { title: "Divisible by 3", desc: "If the sum of digits is divisible by 3" },
    4: { title: "Divisible by 4", desc: "If the last two digits form a number divisible by 4" },
    5: { title: "Divisible by 5", desc: "If number ends in 0 or 5" },
    6: { title: "Divisible by 6", desc: "If number is divisible by both 2 and 3" },
    7: { title: "Divisible by 7", desc: "Double the last digit and subtract it from the rest of the number. The result must be divisible by 0 or 7" },
    8: { title: "Divisible by 8", desc: "If last 3 digits form a number divisible by 8" },
    9: { title: "Divisible by 9", desc: "If sum of digits is divisible by 9" },
};

export default function TreasureGamePage() {
    return (
        <TreasureGameProvider>
        <TreasureGameContent />
        </TreasureGameProvider>
    );
}

function TreasureGameContent() {
  const game = useTreasureGame();

  return (
    <main className={"bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen"}>
      <div className="mx-auto p-6">
        {/* Header */}
        <TreasureHeader />

        <div className="flex items-center gap-4 justify-center mb-4">
          <Hearts lives={game.state.lives} />
          <GameBadges label="Score" input={game.state.score} />
          <GameBadges label="Level" input={game.state.level} />
        </div>

        {/* Display Current Number */}
        <div className="flex flex-col items-center gap-2">
          <div className="number-box">
            <div className="font-bold text-4xl md:text-5xl">{game.state.currentNumber}</div>
          </div>
        </div>

        {/* Display Rule Options */}
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 py-3 place-items-center">
            {game.state.ruleOptions.map((rule) => (
              <div
                key={rule}
                className={`primary-box w-full min-h-[130px] text-center flex flex-col justify-center border-4 
                  ${game.state.selectedRules.includes(rule) ? "" : "border-transparent"}`}
                onClick={() => game.toggleRule(rule)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="font-bold">{ruleInfo[rule].title}</h3>
                <p className="mt-1">{ruleInfo[rule].desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex mt-6 justify-center gap-4">
          <button
            type="button"
            onClick={game.submitAnswer}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={game.nextRound}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Next
          </button>
          <NavButton href="/treasure/guideline">Back</NavButton>
        </div>
      </div>
    </main>
  );
}
