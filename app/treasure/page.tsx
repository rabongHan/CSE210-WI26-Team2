"use client";

import { NavButton } from "@/app/treasure/components/treasure-buttons";
import "@/app/treasure/treasure.css";

export default function TreasureBeginningPage() {

  return (
    <main className="bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen">
        <div className="mx-auto px-4 pb-16">
            {/* Header */}
            <div className="text-center py-5">
                <h1 className="text-3xl font-extrabold">
                    <a href="/treasure" className="hover:text-black/80">Treasure Game</a>
                </h1>
                <p className="text-black-600">Hello!</p>
            </div>
            

            {/* Buttons */}
            <div className="mt-6 text-center">
            <NavButton href="/treasure/how-to-play">Start Game</NavButton>
            <NavButton href="/">Back</NavButton>
            </div>
        </div>
    </main>
  );
}
