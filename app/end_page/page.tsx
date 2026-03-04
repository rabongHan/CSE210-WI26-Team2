// an ending page for after we complete all the games

"use client";

import { Target } from "lucide-react";
import {NavButton} from "@/app/bubble/components/bubble-buttons";
import { loadStorage } from "@/app/bubble/lib/bubble-context";
import { getTreasureResult } from "@/app/treasure/lib/treasure-progress";
import { loadGameState } from "@/app/prime/lib/save";

// maybe replace this separate imports from each game's save library
// actually, we aren't going to do this because we're going to have separate files for save functions in each game
/* import { loadBubbleGameData, loadPrimeEndGame } from "./save"; */

export default function Page() {
  /*const bubbleCompleted = loadBubbleGameData().status === 'won';
  const treasureCompleted = true; // replace with actual game data
  const primeCompleted = loadPrimeEndGame();*/
  const bubbleCompleted = loadStorage() && (loadStorage().status === 'won');
  const treasureCompleted = getTreasureResult() && (getTreasureResult().status === 'won');
  const primeCompleted = loadGameState() === 'won';

  return (
    <main style={{ fontFamily: "system-ui", padding: 24, textAlign: "center" }}>
      <p style={{ fontFamily: "impact", fontSize: 48 }}>Congratulations!</p>
      {/* Tests: Various things the page could say if certain sets of games are completed */}
      {!bubbleCompleted && !treasureCompleted && !primeCompleted && (
        <p>No games completed! Better luck next time!</p>
      )}
      {bubbleCompleted && !treasureCompleted && !primeCompleted && (
        <p>Bubble game completed! On to the treasure chest game!</p>
      )}
      {bubbleCompleted && treasureCompleted && !primeCompleted && (
        <p>Bubble and treasure games completed! On to the prime game!</p>
      )}
      {/* Need to make this part of the page only appear when all three games are done */}
      {bubbleCompleted && treasureCompleted && primeCompleted && (
        <p>All games completed! You win!</p>
      )}
    </main>
  );
}
