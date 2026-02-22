"use client";

import { NavButton } from "@/app/treasure/components/treasure-buttons";
import "@/app/treasure/treasure.css";
import { TreasureHeader } from "../components/treasure-header";
import { Hearts } from "../components/treasure-hearts";
import { GameBadges } from "../components/treasure-badges";
import { TreasureGameAPI, GameState, SubmitResult, RuleId } from "@/app/treasure/lib/types";
import { useState } from "react";

const initialMockState: GameState = {
  currentNumber: 78,
  ruleOptions: [2, 3, 4, 6, 7, 8],
  selectedRules: [],
  level: 1,
  score: 150,
  lives: 2,
  status: "playing",
};

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
    const [gameState, setGameState] = useState<GameState>(initialMockState);
    
    return (
        <main className={"bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen"}>
            <div className="mx-auto p-6">
                {/* Header */}
                <TreasureHeader/> 

                <div className="flex items-center gap-4 justify-center mb-4">
                    <Hearts lives={gameState.lives} />
                    <GameBadges label="Score" input={gameState.score} />
                    <GameBadges label="Level" input={gameState.level} />
                </div>


                {/* Display Current Number */}
                <div className="flex flex-col items-center gap-2">
                    <div className="number-box">
                        <div className="font-bold text-4xl md:text-5xl">{gameState.currentNumber}</div>
                    </div>
                </div>

                {/* Display Rule Options */}
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 py-3 place-items-center">
                        {gameState.ruleOptions.map(rule => (
                            <div key={rule} className="primary-box w-full min-h-[120px] text-center flex flex-col justify-center">
                                <h3 className="font-bold">{ruleInfo[rule]?.title}</h3>
                                <p className="mt-1">{ruleInfo[rule]?.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                
                {/* Buttons */}
                <div className="flex mt-6 justify-center gap-4">
                    <NavButton href="/treasure/game">Submit</NavButton>
                    <NavButton href="/treasure/guideline">Back</NavButton>
                </div>
            </div>
        </main>
    );
}
