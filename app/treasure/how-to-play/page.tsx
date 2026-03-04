// 'use client';
// import { useEffect, useState } from "react";
import { NavButton } from "@/app/treasure/components/treasure-buttons";
import "@/app/treasure/treasure.css";
import { TreasureHeader } from "../components/treasure-header"
import { HomeButton } from "@/app/shared_components/home-button";

export default function TreasureHowToPlay() {
    return (
        <main className="bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen">
            <HomeButton />
            <div className="mx-auto p-6">
                <TreasureHeader subtitle = "How To Play"/>

                {/* Steps */}
                <div className="list-decimal space-y-3 max-w-xl mx-auto">
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-semibold leading-none w-8 shrink-0">1.</span>
                        <span className="text-base">Find all applicable divisibility rules for a number.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-semibold leading-none w-8 shrink-0">2.</span>
                        <span className="text-base">Select every rule box that applies; if none apply, submit with no boxes selected.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-semibold leading-none w-8 shrink-0">3.</span>
                        <span className="text-base">If you get any wrong, you lose a life.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-semibold leading-none w-8 shrink-0">4.</span>
                        <span className="text-base">You will get a total of 3 lives.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-semibold leading-none w-8 shrink-0">5.</span>
                        <span className="text-base">You can get partial points for getting some correct answers.</span>
                    </div>
                    <div className="primary-box flex items-start gap-3 px-4 py-3">
                        <span className="text-2xl font-semibold leading-none w-8 shrink-0">6.</span>
                        <span className="text-base">Score 350 points to open the chest!</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex mt-6 justify-center gap-4">
                    <NavButton href="/treasure/guideline">Next</NavButton>
                    <NavButton href="/treasure/">Back</NavButton>
                </div>
            </div>
        </main>
    );
}
