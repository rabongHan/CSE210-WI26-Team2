"use client";

import { useRouter } from "next/navigation";
import "@/app/treasure/treasure.css";
import { getTreasureResult } from "@/app/treasure/lib/treasure-progress";

export default function TreasureEndPage() {
    const router = useRouter();

    // call localStorage for result, not from URL parameters
    const saved = getTreasureResult();

    // "won" or "lost"
    // if not exists, default to 0
    const status = saved?.status ?? "lost";
    const score = saved?.curr_score ?? 0;
    const lives = saved?.total_lives ?? 0;
    const largestNumber = saved?.largest_number ?? 0;
    const level = saved?.level ?? 0;

    // Use as condition to update the text
    const isWin = status === "won";

    return (
        <main className={"bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen flex items-center justify-center p-6"}>
            <div className="flex flex-col items-center w-full max-w-2xl -mt-8">

                {/* Summary Box */}
                <div className="primary-box w-full max-w-2xl px-10 py-9 text-center">

                    <h1 className="text-3xl font-bold mb-3">
                        {isWin ? "You Win!" : "Game Over"}
                    </h1>

                    <p className="text-lg font-bold mb-1">{isWin ? "You managed to get a score of 500!" : "You lost all lives before reaching 500..."}</p>
                    <p className="text-lg mb-1">Score: {score}</p>
                    <p className="text-lg mb-6">Level Reached: {level}</p>
                </div>

                {/* Buttons */}
                <div className="flex mt-6 justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.push("/treasure/guideline")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                        Retry
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                        Return to Home
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => router.push("/bubble/menu")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                        Start the Next Game! 
                    </button>
                </div>
            </div>
        </main>
    );
}
