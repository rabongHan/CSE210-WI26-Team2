// 'use client';
// import { useEffect, useState } from "react";
import { NavButton } from "@/app/treasure/components/treasure-buttons";
import "@/app/treasure/treasure.css";
import { TreasureHeader } from "../components/treasure-header"

export default function TreasureHowToPlay() {
    return (
        <main className="min-h-screen p-6 bg-cover bg-center bg-fixed bg-[url('@/app/treasure/assets/background1.png')]">
            <div className="">
                <TreasureHeader subtitle = "How To Play"/>
                <div className="list-decimal pl-6 space-y-3 max-w-xl mx-auto text-slate-800">
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-extrabold leading-none">1.</span>
                        <span className="text-base font-semibold">Find all applicable divisibility rules for a number.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-extrabold leading-none">2.</span>
                        <span className="text-base font-semibold">If you get any wrong, you lose a life.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-extrabold leading-none">3.</span>
                        <span className="text-base font-semibold">You will get a total of 3 lives.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-extrabold leading-none">4.</span>
                        <span className="text-base font-semibold">You can get partial points for getting some correct answers.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-extrabold leading-none">5.</span>
                        <span className="text-base font-semibold">Score 350 points to open the chest!</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <NavButton href="/treasure/guideline">Next</NavButton>
                <NavButton href="/treasure/">Back</NavButton>
            </div>
        </main>
    );
}