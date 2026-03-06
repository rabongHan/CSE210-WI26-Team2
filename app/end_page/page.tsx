// an ending page for after we complete all the games

"use client";

import { useState, useEffect } from "react";
import { Target } from "lucide-react";
import {NavButton} from "@/app/bubble/components/bubble-buttons";
import { loadStorage } from "@/app/bubble/lib/bubble-context";
import { getTreasureResult } from "@/app/treasure/lib/treasure-progress";
import { loadGameState, loadGameData } from "@/app/prime/lib/save";

// maybe replace this separate imports from each game's save library
// actually, we aren't going to do this because we're going to have separate files for save functions in each game
/* import { loadBubbleGameData, loadPrimeEndGame } from "./save"; */

export default function Page() {
  const [bubbleData, setBubbleData] = useState<any>(null);
  const [treasureData, setTreasureData] = useState<any>(null);
  const [primeData, setPrimeData] = useState<any>(null);
  const [primeGameState, setPrimeGameState] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load data from localStorage only on client side
    setBubbleData(loadStorage());
    setTreasureData(getTreasureResult());
    setPrimeData(loadGameData());
    setPrimeGameState(loadGameState());
    setIsLoaded(true);
  }, []);

  const bubbleCompleted = bubbleData && (bubbleData.status === 'won');
  const treasureCompleted = treasureData && (treasureData.status === 'won');
  const primeCompleted = primeGameState === 'won';

  // Prevent hydration mismatch by not rendering game status until client-side data is loaded
  if (!isLoaded) {
    return (
      <main style={{ fontFamily: "system-ui", padding: 24, textAlign: "center" }} className="min-h-screen h-screen overflow-auto bg-[url('app/end_page/background.png')] bg-cover bg-[center_70%] bg-no-repeat">
        <p style={{ fontFamily: "impact", fontSize: 48 }}>Congratulations!</p>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "system-ui", padding: 24, textAlign: "center" }} className="min-h-screen h-screen overflow-auto bg-[url('app/end_page/background.png')] bg-cover bg-[center_70%] bg-no-repeat">
      <div className="max-w-[40%] mt-[5vh] mx-auto mb-[1vh] py-[1.5vh] px-[3vw] bg-gray-100/70 border-[5px] border-black rounded-xl text-center">
        <p style={{ fontFamily: "impact", fontSize: 48 }}>Congratulations!</p>
        {/* Need to make this part of the page only appear when all three games are done */}
        {/* Why isn't this showing up? */}
        {bubbleCompleted && treasureCompleted && primeCompleted && (
            <p>All games completed! You win!</p>
        )}
        <h1 style={{ fontSize: 36 }}>Statistics:</h1>
        <h2 style={{ fontSize: 24 }}>Treasure game</h2>
            {treasureData && (
                <div>
                <p>Current or latest score: {treasureData.curr_score}</p>
                <p>Total lives: {treasureData.total_lives}</p>
                <p>Largest number solved: {treasureData.largest_number}</p>
                <p>Last level completed: {treasureData.level}</p>
                </div>
            )}
            {!treasureData && <p>Not played yet.</p>}
        <h2 style={{ fontSize: 24 }}>Bubble game</h2>
            {bubbleData && <p>Unlocked stages: {bubbleData.unlocked_stages.join(", ")}</p>}
            {!bubbleData && <p>Not played yet.</p>}
        <h2 style={{ fontSize: 24 }}>Prime game</h2>
            {primeData && (
                <div>
                  <p>Incorrect guesses: {primeData.incorrectGuessCount}</p>
                  <p>Maximum number guessed: {primeData.maxNumberGuessed}</p>
                  <p>Final user health: {primeData.userHealth}</p>
                  <p>Final boss health: {primeData.bossHealth}</p>
                </div>
            )}
            {!primeData && <p>Not played yet.</p>}
      </div>
      <div className="flex justify-center mt-[2vh]">
        <NavButton href={'/'}>
          Home
        </NavButton>
      </div>
    </main>
  );
}
