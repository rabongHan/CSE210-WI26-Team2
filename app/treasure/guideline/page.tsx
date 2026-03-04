"use client";

import { NavButton } from "@/app/treasure/components/treasure-buttons";
import "@/app/treasure/treasure.css";
import { TreasureHeader } from "../components/treasure-header";
import { HomeButton } from "@/app/shared_components/home-button";

const rules = [
    { id: 2, title: "Divisible by 2", desc: "If number ends in 0 or is even (= number is divisible by 2)" },
    { id: 3, title: "Divisible by 3", desc: "If the sum of digits is divisible by 3" },
    { id: 4, title: "Divisible by 4", desc: "If the last two digits form a number divisible by 4" },
    { id: 5, title: "Divisible by 5", desc: "If number ends in 0 or 5" },
    { id: 6, title: "Divisible by 6", desc: "If number is divisible by both 2 and 3" },
    { id: 7, title: "Divisible by 7", desc: "Double the last digit and subtract it from the rest of the number. The result must be divisible by 0 or 7" },
    { id: 8, title: "Divisible by 8", desc: "If last 3 digits form a number divisible by 8" },
    { id: 9, title: "Divisible by 9", desc: "If sum of digits is divisible by 9" },
];

export default function TreasureGuidelinesPage() {

  return (
    <main className="bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center bg-fixed min-h-screen">
        <HomeButton />
        <div className="mx-auto p-6">
            <TreasureHeader subtitle="Guidelines - Study these rules"/>

            {/* Rules */}
            <div className="container mx-auto max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 py-3 place-items-stretch">
                    {rules.map((rule) => (
                        <div
                            key={rule.id}
                            className="primary-box w-full min-h-[130px] flex items-start gap-2 border-4 border-transparent"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-bold">
                                {rule.id}
                            </div>
                            <div>
                                <h3 className="font-bold">{rule.title}</h3>
                                <p className="mt-1">{rule.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex mt-6 justify-center gap-4">
                <NavButton href="/treasure/game">Play Game</NavButton>
                <NavButton href="/treasure/how-to-play">Back</NavButton>
            </div>
        </div>
    </main>
  );
}
