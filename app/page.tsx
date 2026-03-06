"use client";

import { useEffect, useState } from "react";
import { Gem, Droplets, Flame, Cog } from "lucide-react";

import { getUnlockState } from "@/app/lib/unlock-logic";
import { GameInfo } from "@/app/lib/types";
import { GameCard } from "@/app/shared_components/game-card";
import { Connector } from "@/app/shared_components/connector";

export default function MainPage() {
    const [unlockState, setUnlockState] = useState({
        // initially only treasure game is unlocked
        treasureUnlocked: true,
        bubbleUnlocked: false,
        primeUnlocked: false,
    });

    /*
    getUnlockState() reads localStorage to check which games the player has unlocked
    setUnlockState - setter from useState hook 
    It updates unlockState (line 13) with real unlock status from localStorage
        <Some Insights>
        -- getUnlockState() calls localStorage which is only available in browser not during SSR (server-side rendering)
        -- useEffect makes it only runs client-side after initial render
    */
    useEffect(() => {
        setUnlockState(getUnlockState());
    }, []); // to unlock everything, make this line27-29 as comment out (and set all unlocked to true above)

    const games: GameInfo[] = [
        {
            name: "Treasure Chest",
            subtitle: "Crack the chest's secret code using divisibility rules!",
            href: "/treasure",
            icon: Gem,
            unlocked: unlockState.treasureUnlocked,
            gradient: "from-amber-500/70 to-yellow-700/70",
            glow: "rgba(245,158,11,0.25)",
            iconBg: "bg-amber-400/20",
            step: 1,
        },
        {
            name: "Bubble Atlantis",
            subtitle: "Pop the right factor bubbles before they float away!",
            href: "/bubble",
            icon: Droplets,
            unlocked: unlockState.bubbleUnlocked,
            gradient: "from-cyan-500/70 to-blue-600/70",
            glow: "rgba(6,182,212,0.25)",
            iconBg: "bg-cyan-400/20",
            step: 2,
        },
        {
            name: "Prime Dragon",
            subtitle: "Defeat the dragon with the power of prime numbers!",
            href: "/prime",
            icon: Flame,
            unlocked: unlockState.primeUnlocked,
            gradient: "from-red-500/70 to-orange-600/70",
            glow: "rgba(239,68,68,0.25)",
            iconBg: "bg-red-400/20",
            step: 3,
        },
    ];

    return (
        <main className="page-main">
            {/* Gradient overlay */}
            <div className="page-main-overlay" />

            {/* ====================== MainContent ====================== */}
            <div className="page-main-content">
                {/* --- Title --- */}
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                    {/* - Main Title - */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Decorative gears - Prime "Factory"
                            - Cog: gear icon
                            - animate-spin: makes cog spin (duration: 25s or 18s)
                        */}
                        <Cog className="w-8 h-8 sm:w-12 sm:h-12 text-amber-300/80 animate-spin"
                            style={{ animationDuration: "8s" }} />
                        <h1 className="main-title">Prime Factory</h1>
                        <Cog className="w-6 h-6 sm:w-9 sm:h-9 text-amber-300/80 animate-spin"
                            style={{ animationDuration: "6s", animationDirection: "reverse" }} />
                    </div>
                    {/* - Main Subtitle - */}
                    <p className="main-subtitle">
                        Master the prime
                        {/* responsive: hide on small screens, show on medium screens (or vice versa) */}
                        <span className="hidden sm:inline"> — one game at a time</span>
                        <span className="block sm:hidden text-xs mt-1">— one game at a time —</span>
                    </p>
                </div>

                {/* --- Section divider --- */}
                <div className="flex items-center gap-2">
                    <div className="main-divider-line bg-gradient-to-r from-transparent to-white/30" />
                    <span className="main-divider-label">Select a Game</span>
                    <div className="main-divider-line bg-gradient-to-l from-transparent to-white/30" />
                </div>

                {/* --- Game cards row --- */}
                <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
                    {/* from gameInfo[] array, map each game to GameCard component */}
                    {games.map((game, i) => (
                        <div key={game.name} className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
                            {/* key needed for React to identify each game card */}
                            <GameCard game={game} />
                            {/* connector between games; renders for index 0 and 1 (not after the last card) */}
                            {i < games.length - 1 && <Connector />}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
