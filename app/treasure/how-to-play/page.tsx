"use client";

import { useEffect, useState } from "react";

export default function TreasureHowToPlayPage() {
  const [now, setNow] = useState("");

  useEffect(() => {
    setNow(new Date().toISOString());
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Treasure Chest — How to Play</h1>
      <p>✅ This is /treasure/how-to-play</p>
      <p>Time: {now}</p>

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <a href="/treasure/guidelines">Start Game →</a>
        <a href="/select">Back to Games →</a>
      </div>
    </main>
  );
}
