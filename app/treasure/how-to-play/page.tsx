// 'use client';
// import { useEffect, useState } from "react";
import { NavButton } from "@/app/treasure/components/treasure-buttons";
import "@/app/treasure/treasure.css";

export default function TreasureHowToPlay() {
    return (
        <main className="min-h-screen p-6 bg-cover bg-center bg-fixed bg-[url('@/app/treasure/assets/background1.png')]">
            <div className="">
                <h2 className="text-2xl font-bold mt-4">How To Play</h2>     
                <ol className="ml-5 list-decimal">
                    <li className="ml-4">Find all applicable Divisibility rules for a number</li>
                    <li className="ml-4">If you get any wrong, you lose a life.</li>
                    <li className="ml-4">You will get a total of 3 lives.</li>
                    <li className="ml-4">You can get partial points for getting some correct answers.</li>
                    <li className="ml-4">Score 350 points to open the chest!</li>
                </ol>
            </div>

            <div className="mt-6 text-center">
                <NavButton href="/treasure/guideline">Next</NavButton>
                <NavButton href="/treasure/">Back</NavButton>
            </div>
        </main>
    );
}