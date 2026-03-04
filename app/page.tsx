"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import {NavButton} from "@/app/bubble/components/bubble-buttons";
import { loadBubbleGameData, loadPrimeEndGame } from "./save";

export default function Page() {
  const [now, setNow] = useState("");

  useEffect(() => setNow(new Date().toISOString()), []);

  const bubbleCompleted = loadBubbleGameData().status === 'won';
  const treasureCompleted = true; // replace with actual game data
  const primeCompleted = loadPrimeEndGame();

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Target />
        <h1 style={{ margin: 0 }}>✅ Menu</h1>
          <NavButton href={'/bubble/menu'}>
              Bubble
          </NavButton>
          <NavButton href={'/treasure'}>
              Treasure
          </NavButton>
          <NavButton href={'/prime'}>
              Prime
          </NavButton>
      </div>
      <p>Time: {now}</p>
      {/* Tests: Various things the page could say if certain sets of games are completed */}
      {bubbleCompleted && !treasureCompleted && !primeCompleted && (
        <p>Bubble game completed! On to the treasure chest game!</p>
      )}
      {/* Need to make this part of the page only appear when all three games are done */}
      {bubbleCompleted && treasureCompleted && primeCompleted && (
        <p>All games completed!</p>
      )}
    </main>
  );
}
