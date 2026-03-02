"use client";


import "@/app/treasure/treasure.css";

import { NavButton } from "@/app/treasure/components/treasure-buttons";
import { TreasureHeader } from "@/app/treasure//components/treasure-header";
import { Hearts } from "@/app/treasure/components/treasure-hearts";
import { GameBadges } from "@/app/treasure/components/treasure-badges";
import { TreasureGameProvider, useTreasureGame } from "@/app/treasure/lib/treasure-context";
import { useRouter } from "next/navigation";
import { HomeButton } from "@/app/shared_components/home-button";

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
  const router = useRouter();

  // Hide description at level 10
  const HIDE_DESC_LEVEL = 10;
  const showDescriptions = game.state.level < HIDE_DESC_LEVEL;

  let numberBoxGlow = "";
  let resultText = "";

  if (game.feedback?.show && game.feedback.result) {
    const { result, selectedRules } = game.feedback;
    const hasCorrectSelection = selectedRules.some((r) =>
      result.correctRules.includes(r),
    );

    if (result.isCorrect) {
      numberBoxGlow = "!shadow-[0_0_15px_rgba(52,211,153,0.7),0_0_45px_rgba(52,211,153,0.3)]";  // emerald-400
      resultText = "Correct!";
    } else if (hasCorrectSelection) {
        numberBoxGlow = "!shadow-[0_0_15px_rgba(103,232,249,0.7),0_0_45px_rgba(103,232,249,0.3)]";  // cyan-300
        resultText = "Partially Correct!";
    } else {
        numberBoxGlow = "!shadow-[0_0_15px_rgba(251,113,133,0.7),0_0_45px_rgba(251,113,133,0.3)]";  // rose-400
        resultText = "Wrong!";
    }
  }
  return (
    <main className={"bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen"}>
      <HomeButton />
      <div className="mx-auto p-6">
        {/* Header */}
        <TreasureHeader />

        <div className="flex items-center gap-4 justify-center mb-4">
          <Hearts lives={game.state.lives} />
          {game.feedback?.show ? (
              <div className="primary-box">
                  <div className="font-bold">
                      Score: {game.feedback.previousScore}
                      <span className={game.feedback.scoreDelta > 0 ? "text-emerald-600 font-extrabold" : "text-rose-300 font-extrabold"}>
                          {" "}(+{game.feedback.scoreDelta})
                      </span>
                  </div>
              </div>
          ) : (
              <GameBadges label="Score" input={game.state.score} />
          )}
          <GameBadges label="Level" input={game.state.level} />
        </div>

        {/* Display Current Number */}
        <div className="flex flex-col items-center gap-2">
          {resultText && (
            <div className={`w-full max-w-md mx-auto text-center py-3 px-6 rounded-xl font-bold text-xl tracking-wide animate-bounce-in ${
              resultText === "Correct!"
              ? "bg-emerald-500/40 text-emerald-100 border border-emerald-300/70"
              : resultText === "Partially Correct!"
                ? "bg-cyan-500/40 text-cyan-100 border border-cyan-300/70"
                : "bg-rose-500/40 text-rose-100 border border-rose-300/70"
            }`}>
              {resultText}
            </div>
          )}
          <div className={`number-box ${numberBoxGlow}`}>
            <div className="font-bold text-4xl md:text-5xl">{game.state.currentNumber}</div>
          </div>
        </div>

        {/* Display Rule Options */}
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 py-3 place-items-center">
            {game.state.ruleOptions.map((rule) => {
              let borderColor = "border-transparent";
              let bgClass = ""; 

              if (game.feedback && game.feedback.show && game.feedback.result) {
                if (game.feedback.result.correctRules.includes(rule)) {
                  borderColor = "border-emerald-400";       // emerald-400 for correct
                } else if (game.feedback.result.incorrectRules.includes(rule)) {
                    borderColor = "border-rose-400";        // coral for incorrect
                }

                if (game.feedback.selectedRules?.includes(rule)) {
                  if (game.feedback.result.correctRules.includes(rule)) {
                    bgClass = "!bg-emerald-400/30";       // emerald-400 tint — "I picked this and it was right"
                  } else {
                    bgClass = "!bg-rose-400/40";          // coral tint — "I picked this and it was wrong"
                  }
                }
              } else if (game.state.selectedRules.includes(rule)) {
                borderColor = "border-cyan-300";         // bright cyan = active selection
              }
              return (
                <div
                  key={rule}
                  className={`primary-box w-full min-h-[130px] text-center flex flex-col justify-center border-4 ${borderColor} ${bgClass}`}
                  onClick={() => !(game.feedback && game.feedback.show) && game.toggleRule(rule)}
                  style={{ cursor: game.feedback && game.feedback.show ? "default" : "pointer" }}
                >
                  <h3 className="font-bold">{ruleInfo[rule].title}</h3>
                  {showDescriptions && <p className="mt-1">{ruleInfo[rule].desc}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex mt-6 justify-center gap-4">
          {!(game.feedback && game.feedback.show) ? (
            <button
              type="button"
              onClick={game.submitAnswer}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Submit
            </button>
          ) : game.state.status === "lost" || game.state.status === "won" ? (
            <button
              type="button"
              onClick={() => router.push(
                `/treasure/end`
              )}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={game.nextRound}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Next Round
            </button>
          )}
          <NavButton href="/treasure/guideline">Back</NavButton>
        </div>
      </div>
    </main>
  );
}
