"use client";

import { NavButton } from "@/app/treasure/components/treasure-buttons";
import { TreasureHeader } from "@/app/treasure/components/treasure-header";
import "@/app/treasure/treasure.css";
import { HomeButton } from "@/app/shared_components/home-button";

export default function TreasureBeginningPage() {

  return (
    <main className="bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen">
        <HomeButton />
        <div className="mx-auto p-6">
            {/* Header */}
            <TreasureHeader />
            

            {/* Buttons */}
            <div className="mt-6 text-center">
            <NavButton href="/treasure/how-to-play">Start Game</NavButton>
            <NavButton href="/">Back</NavButton>
            </div>
        </div>
    </main>
  );
}
