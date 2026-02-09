"use client";

import { NavButton } from "@/app/treasure/components/treasure-buttons";
import "@/app/treasure/treasure.css";

export default function TreasureGuidelinesPage() {

  return (
    <main className="bg-[url('app/treasure/assets/background1.png')] bg-cover bg-center min-h-screen">
        <div className="mx-auto px-4 pb-16">
            {/* Header */}
            <div className="text-center py-5">
                <h1 className="text-3xl font-extrabold">
                    <a href="/treasure" className="hover:text-black/80">Treasure Game</a>
                </h1>
                <p className="text-black-600">Guidelines - Study these rules</p>
            </div>
            
            {/* Rule display */}
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        2
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 2</h3>
                        <p className="mt-1 text-sm">If number ends in 0 or is even (= number is divisible by 2)</p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        3
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 3</h3>
                        <p className="mt-1 text-sm">If the sum of digits is divisible by 3</p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        4
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 4</h3>
                        <p className="mt-1 text-sm">If the last two digits form a number divisible by 4</p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        5
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 5</h3>
                        <p className="mt-1 text-sm">If number ends in 0 or 5</p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        6
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 6</h3>
                        <p className="mt-1 text-sm">If number is divisible by both 2 and 3</p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        7
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 7</h3>
                        <p className="mt-1 text-sm">Double the last digit and subtract it from the rest of the number. The result must be divisible by 0 or 7</p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        8
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 8</h3>
                        <p className="mt-1 text-sm">If last 3 digits form a number divisible by 8</p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl shadow-lg max-w-md mx-auto p-3 my-2 bg-white/20 backdrop-blur">
                <div className="flex gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold">
                        9
                    </div>
                    <div>
                        <h3 className="font-bold">Divisible by 9</h3>
                        <p className="mt-1 text-sm">If sum of digits is divisible by 9</p>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex mt-6 justify-center gap-4">
                <NavButton href="/treasure/start">Next</NavButton>
                <NavButton href="/treasure/how-to-play">Back</NavButton>
            </div>
        </div>
    </main>
  );
}
